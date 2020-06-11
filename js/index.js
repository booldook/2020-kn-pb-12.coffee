/******************* 사전지식 ********************/
/*
function a() {

}
function b() {
	return "B";
}
var fnA = a();
var fnB = b();
console.log(fnA, fnB);

var css = {"position": "absolute", "top": "50%", "transform": "translateY(-50%)", "font-size": "5rem", "z-index": 900, "color": "#fff"};
var $btLeft = $('<i class="bt-lt fa fa-angle-left"></i>').appendTo(".main-wrap").css(css);
var $btRight = $('<i class="bt-rt fa fa-angle-right"></i>').appendTo(".main-wrap").css(css);
$btLeft.css("left", "2rem");
$btRight.css("right", "2rem");
*/

/******************* 전역설정 ********************/
mainSlide(".main-wrap");



/******************* 사용자 함수 ********************/
function mainSlide(container) {
	var now = 0;
	var $container = $(container).addClass("slide-wrap");
	var $slide = $container.children("*").addClass("slide").css("transition", "0.5s");
	var $btPrev = $('<div class="bt bt-prev"></div>').appendTo($container).click(onPrev);
	var $btNext = $('<div class="bt bt-next"></div>').appendTo($container).click(onNext);
	// console.log($slide);
	var last = $slide.length - 1;

	function init() {
		$btPrev.show();
		$btNext.show();
		$container.children(".slide").remove();
		$($slide[now]).appendTo($container);
	}
	function ani() {
		$($slide[now]).appendTo($container).css({"opacity": 0, "transform": "scale(1.2)"});
		setTimeout(function(){
			$container.children(".slide").eq(0).css({"opacity": 0, "transform": "scale(0.7)"});
			$container.children(".slide").eq(1).css({"opacity": 1, "transform": "scale(1)"});
			setTimeout(init, 500);
		}, 0);
	}
	function onPrev() {
		$(this).hide();
		now = (now == 0) ? now = last : now - 1;
		ani();
	}
	function onNext() {
		$(this).hide();
		now = (now == 2) ? now = 0 : now + 1;
		ani();
	}
	init();
}



/******************* 이벤트 함수 ********************/
function onResize() {
	this.wid = $(this).innerWidth();
	this.hei = $(this).innerHeight();
}

function onScroll() {
	this.scTop = $(this).scrollTop();
	if(scTop > hei) {
		$(".header").css({"top": 0, "bottom": "auto", "position": "fixed"});
	}
	else {
		$(".header").css({"top": "auto", "bottom": 0, "position": "absolute"});
	}
}

/******************* 이벤트 설정 ********************/
$(window).resize(onResize).trigger("resize");
$(window).scroll(onScroll).trigger("scroll");