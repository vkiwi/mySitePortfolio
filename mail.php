<?php 

require_once('phpmailer/PHPMailerAutoload.php');

// ваш секретный ключ
$secret = '6LcsdecUAAAAAPGTpV_3cXHbNZKqjsFVNNszZiUK';
// однократное включение файла autoload.php (клиентская библиотека reCAPTCHA PHP)
require_once (dirname(__FILE__).'/recaptcha/autoload.php');
// если в массиве $_POST существует ключ g-recaptcha-response, то...
if (isset($_POST['g-recaptcha-response'])) {
  // создать экземпляр службы recaptcha, используя секретный ключ
  $recaptcha = new \ReCaptcha\ReCaptcha($secret);
  // получить результат проверки кода recaptcha
  $resp = $recaptcha->verify($_POST['g-recaptcha-response'], $_SERVER['REMOTE_ADDR']);
  // если результат положительный, то...
  if ($resp->isSuccess()){
    // действия, если код captcha прошёл проверку
    //...

    $mail = new PHPMailer;
    $mail->CharSet = 'utf-8';
    
    $name = $_POST['user_name'];
    $phone = $_POST['user_phone'];
    $message = $_POST['user_message'];
    
    //$mail->SMTPDebug = 3;                               // Enable verbose debug output
    
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.mail.ru';  																							// Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'kv.92@mail.ru'; // Ваш логин от почты с которой будут отправляться письма
    $mail->Password = 'RBDBgfhjkm1550Mail'; // Ваш пароль от почты с которой будут отправляться письма
    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров
    
    $mail->setFrom('kv.92@mail.ru'); // от кого будет уходить письмо?
    $mail->addAddress('viktor.kochegarov@gmail.com');     // Кому будет уходить письмо 
    //$mail->addAddress('ellen@example.com');               // Name is optional
    //$mail->addReplyTo('info@example.com', 'Information');
    //$mail->addCC('cc@example.com');
    //$mail->addBCC('bcc@example.com');
    //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
    $mail->isHTML(true);                                  // Set email format to HTML
    
    $mail->Subject = 'Заявка с моего сайта-портфолио';
    $mail->Body    = '' .$name . ' оставил заявку, его телефон ' .$phone. '<br>Сообщение: ' .$message;
    $mail->AltBody = '';
    
    if(!$mail->send()) {
        echo 'Error';
    } else {
        header('location: thank-you.html');
    }


  } else {
    // иначе передать ошибку
    $errors = $resp->getErrorCodes();
    $data['error-captcha']=$errors;
    $data['msg']='Код капчи не прошёл проверку на сервере';
    $data['result']='error';
    header('location: error.html');
  }
 
} else {
  //ошибка, не существует ассоциативный массив $_POST["send-message"]
  $data['result']='error';
  header('location: error.html');
}


?>