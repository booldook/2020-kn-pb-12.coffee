/*
reference
- type: hori, vert, fade, scale, prd : 슬라이드 타입
- container : 슬라이드들이 담길 객체
*/
var Slide = (function(){
	function Slide(obj) {
		this.obj = obj || {};
		this.type = obj.type || 'hori';
		this.container = $(obj.container) || $(".slide-wrap");
	}
	return Slide;
})();



var mainSlide = new Slide({type: 'scale', container: '.main-wrap'});
console.log(mainSlide);