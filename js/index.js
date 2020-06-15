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
//Slide.scale(".main-wrap", ".banner", onComplete);
//Slide.scale(".main-wrap2", ".banner", onComplete);


/******************* 슬라이드 객체형 ********************/
/*
var slide = new Slide(".main-wrap", ".banner", "scale", onComplete);
function onComplete(prevSlide, nextSlide, container) {
	$(prevSlide).find(".slogan").css({"opacity": 0, "transform": "scale(0.5)"});
	$(prevSlide).find(".writer").css({"opacity": 0, "transform": "translateY(5vw)"});
	$(nextSlide).find(".slogan").css({"opacity": 1, "transform": "scale(1)"});
	$(nextSlide).find(".writer").css({"opacity": 1, "transform": "translateY(0)"});
}
*/

/******************* 슬라이드 직접코딩 ********************/
var mainNow = 0;
var mainSlide = $(".main-wrap > .banner");
var mainLast = mainSlide.length - 1;
var mainTitles = [
	"There's nothing sweeter<br>than a cup of bitter coffee.",
	"Coffee should be black as hell,<br>strong as death and sweet as love.",
	"What goes best with a cup of coffee?<br>Another cup!"
];
var mainWriters = ["Rian Aditia", "Turkish Proverb", "Henry Rollins"];
$(".main-wrap").find(".slogan").html(mainTitles[mainNow]);
$(".main-wrap").find(".writer > span").html(mainWriters[mainNow]);
mainInit();

function mainInit() {
	// 1. 화면의 모든 슬라이드(.banner)를 지운다.
	// 2. 현재 나타나야 되는 슬라이드(.banner.eq(mainNow))를 붙인다.
	$(".main-wrap > .banner").remove();
	$(mainSlide[mainNow]).appendTo(".main-wrap");
}
function mainAni() {
	// 1. 바뀐 mainNow번째 그림을 scale(1.3), opacity: 0 인 상태로 화면에 붙일것
	// 2. 붙인 그림을 animation시킬것(css값 변경)
	// 3. 애니메이션이 완료되면 mainInit()을 실행하여 원상태로 만들것
	// 4. 글씨들이 사라지는 애니메이션이 되고, 사라지자마자 내용을 바꿔서 나타나는 애니메이션이 된다.
	var slide = $(mainSlide[mainNow]).appendTo(".main-wrap").css({"transform": "scale(1.3)", "opacity": 0});
	setTimeout(function(){
		slide.css({"transform": "scale(1)", "opacity": 1});
	}, 0);
	setTimeout(mainInit, 500);
	$(".main-wrap").find(".slogan").css({"transform": "scale(0.8)", "opacity": 0});
	$(".main-wrap").find(".writer").css({"transform": "translateY(50px)", "opacity": 0});
	setTimeout(function(){
		$(".main-wrap").find(".slogan").html(mainTitles[mainNow]);
		$(".main-wrap").find(".writer > span").html(mainWriters[mainNow]);
		$(".main-wrap").find(".slogan").css({"transform": "scale(1)", "opacity": 1});
		$(".main-wrap").find(".writer").css({"transform": "translateY(0)", "opacity": 1});
	}, 1000);
}

function onMainPrev() {
	// 1. 나타날 슬라이드의 번호(mainNow)를 찾아낸다.
	mainNow = (mainNow == 0) ? mainLast : mainNow - 1;
	mainAni();
}
function onMainNext() {
	// 1. 나타날 슬라이드의 번호(mainNow)를 찾아낸다.
	mainNow = (mainNow == mainLast) ? 0 : mainNow + 1;
	mainAni();
}
$(".main-wrap > .bt-prev").click(onMainPrev);
$(".main-wrap > .bt-next").click(onMainNext);



/******************* 사용자 함수 ********************/



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