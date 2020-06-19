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
var KAKAO_KEY = '32029a7749fd11da301a43a23f4cf61b';


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


/******************* 슬라이드 직접코딩2 ********************/
var prdNow = 0,  prdSize = 6, prdLast, prdLeft, prdTar;
var prds = [], prdArr = [];
$(".prd-wrapper > .bt-left").click(onPrdLeft);
$(".prd-wrapper > .bt-right").click(onPrdRight);

$.get("../json/prds.json", onPrdLoad);
function onPrdLoad(r) {
	prdLast = r.prds.length - 1;
	var html = '';
	for(var i in r.prds) {
		html  = '<li class="prd">';
		html += '	<div class="prd-img"><img src="'+r.prds[i].src+'" class="img"></div>';
		html += '	<div class="prd-title">'+r.prds[i].title+'</div>';
		html += '	<div class="prd-price">'+r.prds[i].price+'</div>';
		html += '</li>';
		prds.push($(html));		
	}
	prdInit();
}

function prdInit() {
	prdArr = [];
	prdArr[1] = prdNow;
	prdArr[0] = (prdNow == 0) ? prdLast : prdNow - 1;
	for(var i=2; i<prdSize; i++) prdArr[i] = (prdArr[i-1] == prdLast) ? 0 : prdArr[i-1] + 1;
	for(var i=0; i<prdArr.length; i++) $(prds[prdArr[i]]).clone().appendTo(".prd-wrap");
}

function onPrdLeft() {
	prdTar = 0;
	prdNow = (prdNow == 0) ? prdLast : prdNow - 1;
	prdAni();
}

function onPrdRight() {
	prdTar = prdLeft * 2 + "%";
	prdNow = (prdNow == prdLast) ? 0 : prdNow + 1;
	prdAni();
}

function prdAni() {
	$(".prd-wrap").stop().animate({"left": prdTar}, 500, function(){
		$(this).empty().css({"left": prdLeft+"%"});
		prdInit();
	});
}

/******************* Location 동적 생성 ********************/
$.get("../json/locations.json", onLocationLoad);
function onLocationLoad(r) {
	var html = '';
	for(var i in r.locs) {
		html  = '<li class="store">';
		html += '<div class="photo"><img src="'+r.locs[i].src+'" class="img"></div>';
		html += '<p class="cont">'+r.locs[i].cont+'</p>';
		html += '<div class="addr">';
		html += '<i class="fa fa-map-marker-alt"></i>';
		html += '<span class="rc">Address: '+r.locs[i].addr+'</span>';
		html += '</div>';
		html += '<div class="time">';
		html += '<i class="fa fa-clock"></i>';
		html += '<span class="rc">Open: '+r.locs[i].time+'</span>';
		html += '</div>';
		html += '<div class="tel">';
		html += '<i class="fa fa-phone"></i>';
		html += '<span class="rc">Phone: '+r.locs[i].tel+'</span>';
		html += '</div>';
		html += '<button data-lat="'+r.locs[i].lat+'" data-lon="'+r.locs[i].lon+'" class="bt-map bt-yellow">See on Map</button>';
		html += '</li>';
		$(".store-wrap").append(html);
	}
	$(".store-wrap").find(".bt-map").click(onMapOpen);
	$(".modal-map").find(".bt-close").click(onMapClose);
	$(".modal-map").click(onMapClose);
	$(".modal-map .modal-wrap").click(onModalWrap);
	$(".modal-map").on("mousewheel", onModalWheel);
	$(".modal-map").on("DOMMouseScroll", onModalWheel);
}

function onModalWheel(e) {
	e.stopPropagation();
	e.preventDefault();
}

function onModalWrap(e) {
	e.stopPropagation();
}

function onMapOpen() {
	$(".modal-map").css({"display": "flex", "opacity": 0}).stop().animate({"opacity": 1}, 500);
	var lat = $(this).data("lat");
	var lon = $(this).data("lon");
	var container = document.getElementById('map');
	var options = {center: new kakao.maps.LatLng(lat, lon), level: 2};
	var map = new kakao.maps.Map(container, options);
	var markerPosition  = new kakao.maps.LatLng(lat, lon); 
	var marker = new kakao.maps.Marker({ position: markerPosition });
	marker.setMap(map);
}

function onMapClose() {
	$(".modal-map").stop().animate({"opacity": 0}, 500, function(){
		$(this).css("display", "none");
	});
}

/******************* Menu 동적 생성 ********************/
$.get("../json/menus.json", onMenuLoad);
function onMenuLoad(r) {
	var html = '';
	for(var i in r.menus) {
		html  = '<li class="menu clear">';
		html += '<div class="menu-img"><img src="'+r.menus[i].src+'" class="img"></div>';
		html += '<h3 class="menu-title rc">'+r.menus[i].title+'</h3>';
		html += '<div class="menu-price rc">'+r.menus[i].price+'</div>';
		html += '</li>';
		$(".menus").append(html);
	}
}

/******************* News 동적 생성 및 슬라이드 ********************/
var newsNow = 0,  newsSize = 5, newsLast, newsLeft, newsTar;
var newss = [], newsArr = [];
$(".news-wrapper > .bt-left").click(onNewsLeft);
$(".news-wrapper > .bt-right").click(onNewsRight);

$.get("../json/news.json", onnewsLoad);
function onnewsLoad(r) {
	console.log(r.news);
	newsLast = r.news.length - 1;
	var html = '';
	for(var i in r.news) {
		html  = '<li class="news">';
		html += '<div class="news-img">';
		html += '<img src="'+r.news[i].src+'" class="img">';
		html += '<div class="badge-tag">';
		for(var j in r.news[i].badge) {
			html += '<div class="badge">'+r.news[i].badge[j]+'</div>';
		}
		html += '</div>';
		html += '<div class="badge-date">';
		html += '<div class="month">'+moment(r.news[i].date).format('MMM')+'</div>';
		html += '<div class="day">'+moment(r.news[i].date).format('DD')+'</div>';
		html += '</div>';
		html += '</div>';
		html += '<div class="news-title">'+r.news[i].title+'</div>';
		html += '<div class="news-tag">';
		for(var j in r.news[i].tag) {
			html += '<span class="tag">'+r.news[i].tag[j]+'</span>';
		}
		html += '</div>';
		html += '<div class="news-cont">'+r.news[i].cont+'</div>';
		html += '<button class="bt-ghost bt-more">Read more <span>▶</span></button>';
		html += '</li>';
		newss.push($(html));		
	}
	newsInit();
}

function newsInit() {
	newsArr = [];
	newsArr[1] = newsNow;
	newsArr[0] = (newsNow == 0) ? newsLast : newsNow - 1;
	for(var i=2; i<newsSize; i++) newsArr[i] = (newsArr[i-1] == newsLast) ? 0 : newsArr[i-1] + 1;
	for(var i=0; i<newsArr.length; i++) $(newss[newsArr[i]]).clone().appendTo(".news-wrap");
}

function onNewsLeft() {
	newsTar = 0;
	newsNow = (newsNow == 0) ? newsLast : newsNow - 1;
	newsAni();
}

function onNewsRight() {
	newsTar = newsLeft * 2 + "%";
	newsNow = (newsNow == newsLast) ? 0 : newsNow + 1;
	newsAni();
}

function newsAni() {
	$(".news-wrap").stop().animate({"left": newsTar}, 500, function(){
		$(this).empty().css({"left": newsLeft+"%"});
		newsInit();
	});
}

/******************* press 동적 생성 ********************/
$.get("../json/press.json", onPressLoad);
function onPressLoad(r) {
	var html;
	for(var i in r.press) {
		html  = '<li class="press">';
		html += '	<div class="logo"><img src="'+r.press[i].logo+'"></div>';
		html += '	<div class="cont">'+r.press[i].content+'</div>';
		html += '	<div class="writer">'+r.press[i].writer+'</div>';
		html += '</li>';
		$(".press-ul").append(html);
	}
}



/******************* 사용자 함수 ********************/



/******************* 이벤트 함수 ********************/
function onResize() {
	this.wid = $(this).innerWidth();
	this.hei = $(this).innerHeight();
	if(wid > 991) {
		onNaviHide();
		prdLeft = -25;
		newsLeft = -33.3333;
	}
	else if(wid > 767) {
		prdLeft = -33.3333;
		newsLeft = -50;
	}
	else if(wid > 479) {
		prdLeft = -50;
		newsLeft = -100;
	}
	else if(wid <= 479) {
		prdLeft = -100;
		newsLeft = -100;
	}
	$(".prd-wrap").css("left", prdLeft+"%");
	$(".news-wrap").css("left", newsLeft+"%");
}

function onScroll() {
	// header 위치
	this.scTop = $(this).scrollTop();
	if(scTop > hei) {
		$(".header").css({"top": 0, "bottom": "auto", "position": "fixed"});
	}
	else {
		$(".header").css({"top": "auto", "bottom": 0, "position": "absolute"});
	}

	// .page의 현재 page 찾기
	var nowPage = -10;
	for(var i = $(".page").length - 1; i>=0; i--) {
		if(	$(".page").eq(i).offset().top <= scTop	) {
			nowPage = i;
			break;
		}
	}
	$(".navi-mo").find(".navi").css("color", "#333");
	$(".navi-mo").find(".navi").eq(nowPage).css("color", "#e6ac65");

	// .loc-wrap의 background-position-y 변화
	var locStart = $(".loc-wrap").offset().top;
	var locHei = $(".loc-wrap").innerHeight();
	var locEnd = locStart + locHei + hei;
	var locGap = 0;
	var locSpeed = 400;
	if(scTop + hei > locStart && scTop + hei < locEnd) {
		locGap = (locSpeed/2) - Math.round((scTop + hei - locStart) / (locEnd - locStart) * locSpeed);
		$(".loc-wrap").css("background-position-y", locGap + "%");
	}

	// .press-wrap의 background-position-y 변화
	var pressStart = $(".press-wrap").offset().top;
	var pressHei = $(".press-wrap").innerHeight();
	var pressEnd = pressStart + pressHei + hei;
	var pressGap = 0;
	var pressSpeed = 200;
	if(scTop + hei > pressStart && scTop + hei < pressEnd) {
		pressGap = (pressSpeed/2) - Math.round((scTop + hei - pressStart) / (pressEnd - pressStart) * pressSpeed);
		$(".press-wrap").css("background-position-y", pressGap + "%");
	}

	// .bt-top show/hide
	(scTop > hei) ? $(".bt-top").show() : $(".bt-top").hide();
}

function onTop() {
	$("html, body").stop().animate({"scrollTop": 0}, 500);
}

function onNaviShow() {
	$(".navi-mo").css("display", "block");
	setTimeout(function(){
		$(".header .bt-close").css("opacity", 1);
		$(".navi-mo").css("background-color", "rgba(0,0,0,0.8)");
		$(".navi-mo").find(".navi-wing").css("right", 0);
	}, 0);
}

function onNaviHide() {
	$(".navi-mo").css("background-color", "transparent");
	$(this).stop().animate({"opacity": 0}, 500, function(){
		$(".navi-mo").find(".navi-wing").css("right", "-320px");
		setTimeout(function(){
			$(".navi-mo").css("display", "none");
		}, 500);
	});
}

function onNaviClick() {
	var tar = $(".page").eq($(this).index()).offset().top + 1;
	$("html, body").stop().animate({"scrollTop": tar}, 500);
}

function onLogoClick() {
	$("html, body").stop().animate({"scrollTop": 0}, 500);
}

/******************* 이벤트 설정 ********************/
$(window).resize(onResize).trigger("resize");
$(window).scroll(onScroll).trigger("scroll");
$(".bt-top").click(onTop);
$(".header .navi-bars").click(onNaviShow);
$(".header .bt-close").click(onNaviHide);
$(".header > .navi").click(onNaviClick);
$(".header > .navi-mo .navi").click(onNaviClick);
$(".header > .logo").click(onLogoClick);