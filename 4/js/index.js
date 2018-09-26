window.onload=function () {
	/*1.顶部搜索*/
    search();
    /*2.轮播图*/
    banner();
    /*3.倒计时*/
    downTime(4 * 60 * 60);
}

var search=function () {
	var search=document.querySelector('.jd-search-box');
	var banner=document.querySelector('.jd-banner');
	var height=banner.offsetHeight;

	window.onscroll=function () {
		var scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
		var opacity = 0;
		if(scrollTop < height ){
			opacity = scrollTop/height * 0.85
		}
		else{
			opacity= 0.85;
		}
		search.style.background = 'rgba(201,21,35,' + opacity + ')';
	}
};

var banner=function () {
	/*1. 自动轮播图且无缝   定时器，过渡*/
    /*2. 点要随着图片的轮播改变  根据索引切换*/
    /*3. 滑动效果  利用touch事件完成*/
    /*4. 滑动结束的时候    如果滑动的距离不超过屏幕的1/3  吸附回去   过渡*/
    /*5. 滑动结束的时候    如果滑动的距离超过屏幕的1/3  切换（上一张，下一张）根据滑动的方向，过渡*/
    var banner=document.querySelector('.jd-banner');
     /*屏幕宽度*/
    var width = banner.offsetWidth;
    /*图片容器*/
    var imageBox = banner.querySelector('ul:first-child');
    /*点容器*/
    var pointBox = banner.querySelector('ul:last-child');
    /*所有的点*/
    var points = pointBox.querySelectorAll('li');

    var addTransition=function () {
    	imageBox.style.transition = 'all 0.2s';
    	imageBox.style.webkitTransition = 'all 0.2s';
    }

    var setTranslate=function (translate) {
    	imageBox.style.transform='translateX('+ translate +'px)';
    	imageBox.style.webkitTransform='translateX('+ translate +'px)';
    }

    var removeTransition=function () {
    	imageBox.style.transition='none';
    	imageBox.style.webkitTransition='none';
    }
    var index=1;

    var timer=setInterval(function(){
    	index++;

    	addTransition();
    	setTranslate(-index*width);
    },1000);

    imageBox.addEventListener('transitionend', function () {
    	if (index>=9) {
    		index=1;
    		removeTransition();

    		setTranslate(-index*width);
    	}
    	else if(index <=0){
    		index=8;
    		removeTransition();

    		setTranslate(-index*width);
    	}

    	setPoins();
    });

    var setPoins=function () {
    	for (var i = 0; i < points.length; i++) {
    		var obj=points[i];

    		obj.classList.remove('now');
    	}
    	points[index-1].classList.add('now');
    };
    // 绑定事件
    var startX=0;
    var distanceX=0;
    var bMove=false;

    imageBox.addEventListener('touchstart', function (e) {
        /*清除定时器*/
        clearInterval(timer);
        /*记录起始位置的X坐标*/
        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove', function (e) {
    	console.log('a')
        /*记录滑动过程当中的X坐标*/
        var moveX = e.touches[0].clientX;
        /*计算位移  有正负方向*/
        distanceX = moveX - startX;
        /*计算目标元素的位移  不用管正负*/
        /*元素将要的定位=当前定位+手指移动的距离*/
        var translateX = -index * width + distanceX;
        /*滑动--->元素随着手指的滑动做位置的改变*/
        removeTransition();
        setTranslate(translateX);
        bMove = true;
    });

    imageBox.addEventListener('touchend', function (e) {
    	if (bMove) {
			if (Math.abs(distanceX) < width/4) {
					addTransition();
					setTranslate(-index * width);
				}
			else{
				if (distanceX > 0) {
					index--;
				}
				else{
					index++;
				}
				addTransition();
				setTranslate(-index * width);
			}
		}
		/*最好做一次参数的重置*/
        startX = 0;
        distanceX = 0;
        isMove = false;
        /*加上定时器*/
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            /*加过渡*/
            addTransition();
            /*做位移*/
            setTranslate(-index * width);
        }, 1000);
    });
}

var downTime=function (time) {
	/*1.每一秒改变当前的时间*/
    /*2.倒数计时  假设 4小时*/
    //var time = 4 * 60 * 60;
    var spans = document.querySelectorAll('.time span');

    var timer = setInterval(function () {
        time --;
        /*格式化  给不同的元素html内容*/
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = Math.floor(time%60);

        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;
        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;
        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;

        if(time <= 0){
            clearInterval(timer);
        }

    }, 1000)
}

