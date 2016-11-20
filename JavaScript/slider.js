

	/*幻灯片的详细信息*/
	var data = [
		{img:1,h1:"WE ONLY TO TRAVEL",h2:"CREATE TOP AGENCE",p:"Sanya (Sanya) located in the southernmost part of Hainan Island, is the most China southern tropical seaside tourist city, air quality is the best, the most China City longevity area."},
		{img:2,h1:"WE ONLY TO TRAVEL",h2:"CREATE TOP AGENCE",p:"Sanya (Sanya) located in the southernmost part of Hainan Island, is the most China southern tropical seaside tourist city, air quality is the best, the most China City longevity area."},
		{img:3,h1:"WE ONLY TO TRAVEL",h2:"CREATE TOP AGENCE",p:"Sanya (Sanya) located in the southernmost part of Hainan Island, is the most China southern tropical seaside tourist city, air quality is the best, the most China City longevity area."},
		{img:4,h1:"WE ONLY TO TRAVEL",h2:"CREATE TOP AGENCE",p:"Sanya (Sanya) located in the southernmost part of Hainan Island, is the most China southern tropical seaside tourist city, air quality is the best, the most China City longevity area."},
		{img:5,h1:"WE ONLY TO TRAVEL",h2:"CREATE TOP AGENCE",p:"Sanya (Sanya) located in the southernmost part of Hainan Island, is the most China southern tropical seaside tourist city, air quality is the best, the most China City longevity area."}
	];


	/*编写函数得到对象的id或者class*/
	var g=function(id){
		if(id.substr(0,1)==".")
			return document.getElementsByClassName(id.substr(1));
		else
			return document.getElementById(id);
	}


	/*将详细的信息对应每一张图片中*/
	function addslider(){
		var tpl_main=g("template_main").innerHTML
						.replace(/^\s*/,'')
						.replace(/\s*$/,'');
		var tpl_ctrl=g("template_ctrl").innerHTML
						.replace(/^\s*/,'')
						.replace(/\s*$/,'');

		var out_main=[];
		var out_ctrl=[];

		for(i in data){
			var _html_main=tpl_main
						.replace(/{{index}}/g,data[i].img)
						.replace(/{{h1}}/g,data[i].h1)
						.replace(/{{h2}}/g,data[i].h2)
						.replace(/{{p}}/g,data[i].p)
						.replace(/{{css}}/g,['','main_i-right '][i%2]);

			var _html_ctrl=tpl_ctrl
						.replace(/{{index}}/g,data[i].img);

			out_main.push(_html_main);
			out_ctrl.push(_html_ctrl);
		}

		g("template_main").innerHTML=out_main.join('');
		g("template_ctrl").innerHTML=out_ctrl.join('');

		g("template_main").innerHTML+=tpl_main
					.replace(/{{index}}/g,'{{index}}')
					.replace(/{{h1}}/g,data[i].h1)
					.replace(/{{h2}}/g,data[i].h2);

		g('main_{{index}}').id='main_background';
	}

	function buttonClick(){
		var prev=g("prev");
		var next=g("next");
		var mainChange=g(".main_i");
		var index=g(".main_i").length;
		prev.onclick=function(){
			for(var i=0;i<index;i++){
				if(mainChange[i].className.indexOf("main_i_active")!=-1){
					if(i==0){
						console.log(index);
						switchSlider(index-1);
					}
					else{
						console.log(i);
						switchSlider(i);
					}
					break;
				}
			}
			
		}

		next.onclick=function(){
			for(var i=0;i<index;i++){
				console.log(mainChange[i].className.length);
				if(mainChange[i].className.indexOf("main_i_active")!=-1){
					var index_2=i;
					if(i==index-2){
						console.log(1);
						switchSlider(1);
					}
					else{
						console.log(i);
						switchSlider(i+2)
					}
					break;
				}
			}
			
		}
	}


	/*将显示出的动态加上特定的className*/
	function switchSlider(n){
		var clear_main=g('.main_i');
		var clear_ctrl=g('.ctrl_i');

		var main=g('main_'+n);
		var ctrl=g('ctrl_'+n);

		for(var i=0;i<clear_ctrl.length;i++){
			clear_main[i].className=clear_main[i].className.replace('main_i_active','');
			clear_ctrl[i].className=clear_ctrl[i].className.replace('ctrl_i_active','');
		}

		main.className+='main_i_active';
		ctrl.className+='ctrl_i_active';

		setTimeout(function(){
			g('main_background').innerHTML=main.innerHTML;
		},1000);

	}


	var repeatCount=0;
	var cTimeout;
	var timeoutIntervals=new Array();
	var timeoutIntervalSpeed;
	var vertical=50;
	/*点击导航栏转向对应位置*/
	function viewTo(){
		
		 var column=document.getElementById("column");
		 var li=column.getElementsByTagName("li");
		 var link=document.getElementsByClassName("link");
		for(var i=0;i<link.length;i++){/*绑定事件循环闭包*/
			(function(){
				var temp=i;
				li[i].onclick=function(){
					ScrollToControl(link[temp].id);
				}
			})(i);		
		}	
	}
	
	function elementPosition(obj){
		var curtop=0;
		console.log(obj);
		if(obj.offsetParent){
			curtop=obj.offsetTop;/*以页面头部做为起点，当前显示的界面的坐标*/
			while(obj==obj.offsetParent){
				curtop+=obj.offsetTop;
			}
		}
		return {y:curtop};
	}

	function ScrollToControl(id){
		var elem=g(id);
		console.log(elem);
		var scrollPos=elementPosition(elem).y;
		// var nowPos=
		console.log(scrollPos);	
		console.log(document.body.scrollTop);
		if(scrollPos>=document.body.scrollTop){
			scrollPos=scrollPos-document.body.scrollTop;
			var remainder=scrollPos%50;
			var repeatTimes=(scrollPos-remainder)/50;/*可得到整数，重复位移的次数*/
			ScrollSmoothly(scrollPos,repeatTimes,vertical);
			window.scrollBy(0,remainder);/*最后一次移动剩余的值*/
		}
		else{
			console.log("向上滑动");
			scrollPos=document.body.scrollTop-scrollPos;
			console.log(scrollPos);
			var remainder=scrollPos%50;
			var repeatTimes=(scrollPos-remainder)/50;/*可得到整数，重复位移的次数*/
			ScrollSmoothly(scrollPos,repeatTimes,-vertical);
			window.scrollBy(0,-remainder);
		}		
	}

	function ScrollSmoothly(scrollPos,repeatTimes,a){/*scrollPos是位移，repeatTimes是位移的次数*/
		if(repeatCount<repeatTimes){
			window.scrollBy(0,a);/*每次移动50px的距离*/
		}
		else{
			repeatCount=0;
			clearTimeout(cTimeout);
			return;/**/
		}
		repeatCount++;
		cTimeout=setTimeout("ScrollSmoothly('"+scrollPos+"','"+repeatTimes+"','"+a+"')",10);
	
	}

window.onload = function(){	
	addslider();
	switchSlider(1);
	buttonClick();
	ScrollToControl("slider");
	viewTo();
}