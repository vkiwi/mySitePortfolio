//плавный переход 
$(document).ready(function(){
	$("#menu").on("click","a", function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();
		//забираем идентификатор блока с атрибутом href
		var id  = $(this).attr('href'),
		//узнаем высоту от начала страницы до блока на который ссылается якорь
		top = $(id).offset().top;
		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({scrollTop: top}, 1500);
	});
});

/**
 * Скрипт скроллинга: кнопка наверх
 * css class кнопки: scrollTop
 */

window.top = {};
var sc = window.top;

sc.time = 12; // время прокручивания

sc.goTop = function (time, acceleration) {
	acceleration = acceleration || 0.1;
	time = time || sc.time;

	var dx = 0;
	var dy = 0;
	var bx = 0;
	var by = 0;
	var wx = 0;
	var wy = 0;

	if (document.documentElement) {
		dx = document.documentElement.scrollLeft || 0;
		dy = document.documentElement.scrollTop || 0;
	}
	if (document.body) {
		bx = document.body.scrollLeft || 0;
		by = document.body.scrollTop || 0;
	}
	var wx = window.scrollX || 0;
	var wy = window.scrollY || 0;

	var x = Math.max(wx, Math.max(bx, dx));
	var y = Math.max(wy, Math.max(by, dy));

	var speed = 1 + acceleration;
	window.scrollTo(Math.floor(x / speed), Math.floor(y / speed));
	if(x > 0 || y > 0) {
		var invokeFunction = "window.top.goTop("+ time +")"
		window.setTimeout(invokeFunction, time);
	}
	return false;
}

sc.showHide = function (){
	var a = document.getElementById('gotop');

	if( ! a ){
		// если нет элемента добавляем его
		var a = document.createElement('a');
		a.id = "gotop";
		a.className = "scrollTop";
		a.href = "#";
		a.style.display = "none";
		a.style.position = "fixed";
		a.style.zIndex = "9999";
		a.onclick = function(e){ e.preventDefault(); window.top.goTop(); }
		document.body.appendChild(a);
	}

	var stop = (document.body.scrollTop || document.documentElement.scrollTop);
	if( stop > 300 ){
		a.style.display = 'block';
		sc.smoothopaque(a, 'show', 30, false);
	} else {
		sc.smoothopaque(a, 'hide', 30, function(){a.style.display = 'none';});
	}

	return false;
}

// Плавная смена прозрачности
sc.smoothopaque = function (el, todo, speed, endFunc){
	var 
	startop = Math.round( el.style.opacity * 100 ),
	op = startop,
	endop = (todo == 'show') ? 100 : 0;

	clearTimeout( window['top'].timeout );

	window['top'].timeout = setTimeout(slowopacity, 30);

	function slowopacity(){
		if( startop < endop ){
			op += 5;
			if( op < endop )
				window['top'].timeout = setTimeout(slowopacity, speed);
			else
				(endFunc) && endFunc();
		}
		else {
			op -= 5;
			if( op > endop ){
				window['top'].timeout = setTimeout(slowopacity, speed);
			}
			else
				(endFunc) && endFunc();
		}

		// установка opacity
		el.style.opacity = (op/100);
		el.style.filter = 'alpha(opacity=' + op + ')';
	}
}

if (window.addEventListener){
	window.addEventListener("scroll", sc.showHide, false);
	window.addEventListener("load", sc.showHide, false);
}
else if (window.attachEvent){
	window.attachEvent("onscroll", sc.showHide);
	window.attachEvent("onload", sc.showHide);
}

// Работа с виджетом recaptcha
// 1. Получить ответ гугл капчи
var captcha = grecaptcha.getResponse();
 
// 2. Если ответ пустой, то выводим сообщение о том, что пользователь не прошёл тест.
// Такую форму не будем отправлять на сервер.
if (!captcha.length) {
  // Выводим сообщение об ошибке
  $('#recaptchaError').text('* Вы не прошли проверку "Я не робот"');
} else {
  // получаем элемент, содержащий капчу
  $('#recaptchaError').text('');
}
 
// 3. Если форма валидна и длина капчи не равно пустой строке, то отправляем форму на сервер (AJAX)
if ((formValid) && (captcha.length)) {
  ...
  // добавить в formData значение 'g-recaptcha-response'=значение_recaptcha
  formData.append('g-recaptcha-response', captcha);
  ...
}  
  
// 4. Если сервер вернул ответ error, то делаем следующее...
// Сбрасываем виджет reCaptcha
grecaptcha.reset();
// Если существует свойство msg у объекта $data, то...
if ($data.msg) {
  // вывести её в элемент у которого id=recaptchaError
  $('#recaptchaError').text($data.msg);
}
