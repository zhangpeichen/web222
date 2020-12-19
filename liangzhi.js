var timer;
	var index = 1;
	var isMoving = false;
	var box = document.getElementById("box");
	var left=document.getElementById("left");
	var right = document.getElementById("right");
	var slider = document.getElementById("slider");
	var long = document.getElementsByClassName("words");
	var oNavlist = document.getElementById("nav").children;

	setInterval(function(){
		var left=getStyle(long[0],"left");
		long[0].style.left=(parseInt(left)-1)+"px";
		if(left=="-1800px"){
			long[0].style.left=-435+"px";
		}
	},20);
	// 轮播下一张的函数
	function next(){
		if(isMoving){
			return;
		}
		isMoving = true;
		index++;
		navmove();
		animate(slider,{left:-1200*index},function(){
			if(index == 6){
				slider.style.left = "-1200px";
				index = 1;
			}
			isMoving = false;
		});
	}
	function prev(){
		if(isMoving){
			return;
		}
		isMoving = true;
		index--;
		navmove();
		animate(slider,{left:-1200*index},function(){
			if(index === 0){
				slider.style.left = "-6000px";
				index = 5;
			}
			isMoving = false;
		});
	}
	timer = setInterval(next,3000);
	// 鼠标划入清定时器
	box.onmouseover = function(){
		animate(left,{opacity:50});
		animate(right,{opacity:50});
		clearInterval(timer);
	}
	// 鼠标划出开定时器
	box.onmouseout = function(){
		animate(left,{opacity:0});
		animate(right,{opacity:0});
		timer = setInterval(next,3000);
	}
	right.onclick = next;
	left.onclick = prev;
// 小按钮点击事件
	for(var i=0;i<oNavlist.length;i++){
		oNavlist[i].index = i;
		oNavlist[i].onclick = function(){
				index = this.index+1;
				navmove();
				animate(slider,{left:-1200*index});
		}
	}

	// 小按钮背景切换
	function navmove(){
		for(var i=0;i<oNavlist.length;i++){
			oNavlist[i].className = "";
		}
		if(index > 5){
			oNavlist[0].className = "active";
		}
		else if(index === 0){
			oNavlist[4].className = "active";
		}
		else{
			oNavlist[index-1].className = "active";
		}
	}