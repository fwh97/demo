$(function () {
	banner();
	initMobileTad();

	$('[data-tooltip="tooltip"]').tooltip();
});

var banner=function () {
	var getData=function (Callbacks) {
		if (window.data) {
			Callbacks && Callbacks(data);
		}
		else{
			$.ajax({
				type:'get',
				url:'js/data.json',
				dataType:'json',
				data:'',
				success:function (data) {
					window.data=data;
					Callbacks && Callbacks(window.data);
				}
			});
		}
	}
	var render=function () {
		getData(function (data) {
			/*2.根据数据动态渲染  根据当前设备  屏幕宽度判断 */
            var isMobile = $(window).width() < 768 ? true : false;

            var pointHtml=template('point', {list:data});
            var imagesHtml=template('images', {list:data, isMobile:isMobile});
            $('.carousel-indicators').html(pointHtml);
            $('.carousel-inner').html(imagesHtml);
		});
	}
	render();
	$(window).on('resize',function () {
        render();
        /*通过js主动触发某个事件*/
    }).trigger('resize');

	var startX=0;
	var distanceX=0;
	var isMove=false;

	$('.wjs_banner').on('touchstart', function(e) {
		startX=e.originalEvent.touches[0].clientX;
	}).on('touchmove',function (e) {
		var moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
	}).on('touchend',function (e) {
		if (isMove && Math.abs(distanceX) > 50) {
			if (distanceX < 0) {
				$('.carousel').carousel('next');
			}
			else{
				$('.carousel').carousel('prev');
			}
		}
		startX=0;
		distanceX=0;
		isMove=false;
	});
}

var initMobileTad=function () {
	var $navTad=$('.wjs_product .nav-tabs');
	var width=0;

	$navTad.find('li').each(function(i, el) {
		var $liWidth=$(this).outerWidth(true);
		width+=$liWidth;
	});

	$navTad.width(width);
	// 必须要阻止事件冒泡， 滑动效果才能实现
	document.querySelector('.nav-tabs-parent').addEventListener('touchmove',function(e){ 
		e.preventDefault();
	});
	new IScroll($('.nav-tabs-parent')[0],{
		scrollX:true,
		click:true,
		
		scrollY:false
	});
}

