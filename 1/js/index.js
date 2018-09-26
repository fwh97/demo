$(function ($) {
	/*初始化fullpage组件*/
    /*1.设置每一个屏幕的背景颜色*/
    /*2.设置屏幕内容的对齐方式  默认是垂直居中的  改成顶部对齐*/
    /*3.设置导航 设置指示器 点容器*/
    /*4.监听进入某一屏的时候 回调*/
	 $('#fullpage').fullpage({

 		sectionsColor:["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
	 	verticalCentered:false,
	 	navigation: true,
	 	afterLoad:function (link,index) {   //当前展示屏加载完执行
            /*index 序号 1开始  当前屏的序号*   当前屏添加.now 自定义当前展示屏的有这个样式才动画      */
            $('.section').eq(index-1).addClass('now');
        },
        onLeave:function (index,nextindex,direction) {  //onleave  离开某一个页面的时候触发
        	/*滚动前的回调函数，接收 index、nextIndex 和 direction 3个参数：
			index 是离开的“页面”的序号，从1开始计算；
			nextIndex 是滚动到的“页面”的序号，从1开始计算；
			direction 判断往上滚动还是往下滚动，值是 up 或 down。*/

        	var currentSection = $('.section').eq(index-1);
        	$('.more').fadeIn();
        	if (direction == 'up') {  //往上滚动将样式删除，重新执行动画
        		$('.now,.leaved,.show').removeClass('now').removeClass('leaved').removeClass('show'); 
        		$(".content[style]").removeAttr("style");
        	}

        	if (nextindex ==3) {			//当前是从第二页到第三页
    			$('.section').eq(index-1).addClass('leaved');
        	}else if(nextindex == 4){
                /*当前是从第三页到第四页*/
                currentSection.addClass('leaved');
            }else if( nextindex == 6){
            	currentSection.addClass('leaved');
                $('.screen06 .box').addClass('show');
            }
            else if(nextindex == 7){
                $('.screen07 .star').addClass('show');
                $('.screen07 .text').addClass('show');

                $('.screen07 .star img').each(function(i, el) {
                	$(this).css('transition-delay',i*0.5+'s');
                });
            }
            else if( nextindex == 8){
            	$('.more').fadeOut();
            }
        },
        
        afterRender:function(){         	//页面结构生成后的回调函数，或者说页面初始化完成后的回调函数
        	$('.more').on('click',function(){
        		$.fn.fullpage.moveSectionDown();  //向下滚动
        	})
        	/*当第四屏的购物车动画结束之后执行收货地址的动画*/
        	$('.screen04 .cart').on('transitionend', function() {
        		 $('.screen04 .text').addClass('show'); 		
        		 //$('.screen04 .address').show().find('img:last').fadeIn(100);
        	});

        	$('.screen08').on('mousemove', function(ev) {
        		$(this).find('.hand').css({
        			left:ev.clientX-205,  //.hand在父级.content里 所以减去父级距离页面边缘的位置
        			top:ev.clientY-30
        		});
        	}).find('.again').on('click', function(event) {	//点击重新执行动画
        		$('.now,.leaved,.show').removeClass('now').removeClass('leaved').removeClass('show'); 
        		 //删除掉这些样式才能让动画回到未执行状态

        		$(".content[style]").removeAttr("style");	//删除css添加的样式

        		$.fn.fullpage.moveTo(1);/*跳回第一页*/
        	});
        	
        },
        scrollingSpeed:1000 ///*页面切换的时间 默认是700*/
 	});
});