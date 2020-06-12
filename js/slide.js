/*
	function a() {
		// 함수선언문
	}
	
	var a = function() {
		// 함수표현식
	}
reference
- type: hori, vert, fade, scale, prd : 슬라이드 타입
- container : 슬라이드들이 담길 객체

var Slide = (function(){
	function Slide(obj) {
		this.obj = obj || {};
		this.type = obj.type || 'hori';
		this.container = $(obj.container) || $(".slide-wrap");
	}
	return Slide;
})();

var mainSlide = new Slide({
	type: 'scale', 
	container: '.main-wrap', 
	slide: '.slide',
	before: function(prev, next, container){

	},
	complete: function(prev, next, container){

	}
});
console.log(mainSlide);
*/

var Slide = (function(){
	function Slide(container, slide, type, cb) {
		this.container = $(container);
		this.slide = $(container).find(slide);
		if(typeof type == "string") {
			this.type = type;
			this.cb = cb;
		}
		else if(typeof type == "function") {
			this.type = 'hori';
			this.cb = type;
		}
		else {
			this.type = 'hori';
			this.cb = undefined;
		}
		if(this.type == 'hori') horiInit();
		else if(this.type == 'scale') this.scaleInit();
		else if(this.type == 'vert') this.vertInit();
		else if(this.type == 'fade') this.fadeInit();
		else if(this.type == 'step') this.stepInit();
	}
	Slide.prototype.scaleInit = function() {
		var obj = this;
		var now = 0;
		this.container.addClass("slide-wrap");
		this.slide.addClass("slide");
		this.btPrev = $('<div class="bt bt-prev"></div>').appendTo(this.container);
		this.btNext = $('<div class="bt bt-next"></div>').appendTo(this.container);
		var last = this.slide.length - 1;

		this.btPrev.click(onPrev);
		this.btNext.click(onNext);

		function init() {
			obj.btPrev.show();
			obj.btNext.show();
			obj.container.children(".slide").remove();
			$(obj.slide[now]).appendTo(obj.container);
		}
		function ani() {
			console.log(	$(obj.slide)	);
			$(obj.slide[now]).appendTo(obj.container).css({"opacity": 0, "transform": "scale(1.2)"});
			setTimeout(function(){
				obj.container.find(".slide").eq(0).css({"opacity": 0, "transform": "scale(0.7)"});
				obj.container.find(".slide").eq(1).css({"opacity": 1, "transform": "scale(1)"});
				obj.cb(obj.container.find(".slide").eq(0), obj.container.find(".slide").eq(1), obj.container);
				setTimeout(init, 500);
			}, 0);
		}

		function onPrev() {
			obj.btPrev.hide();
			now = (now == 0) ? last : now - 1;
			ani();
		}
		function onNext() {
			obj.btNext.hide();
			now = (now == 2) ? 0 : now + 1;
			ani();
		}

		init();
	}
	return Slide;
})();



var Slidessssss = {
	scale: function(container, slide, cb) {
		var now = 0;
		var $container = $(container).addClass("slide-wrap");
		console.log($container);
		var $slide = $(slide).addClass("slide");
		var $btPrev = $('<div class="bt bt-prev"></div>').appendTo($container).click(onPrev);
		var $btNext = $('<div class="bt bt-next"></div>').appendTo($container).click(onNext);
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
				$container.find(".slide").eq(0).css({"opacity": 0, "transform": "scale(0.7)"});
				$container.find(".slide").eq(1).css({"opacity": 1, "transform": "scale(1)"});
				cb($container.find(".slide").eq(0), $container.find(".slide").eq(1), $container);	
				setTimeout(init, 500);
			}, 0);
		}
		function onPrev() {
			$(this).hide();
			now = (now == 0) ? last : now - 1;
			ani();
		}
		function onNext() {
			$(this).hide();
			now = (now == 2) ? 0 : now + 1;
			ani();
		}
		init();
	}
};