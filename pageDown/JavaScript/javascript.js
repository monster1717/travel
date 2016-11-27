var length = 0;
var num = 0;
var run = false;

window.onload = function(){
	 img = document.getElementById("imgShow").getElementsByTagName("img");
	 content = document.getElementById("content");
	 page_1 = content.getElementsByTagName("span")[0];
	 pageImg_1 = page_1.getElementsByTagName("img")[0];
	 page_2 = content.getElementsByTagName("span")[1];
	 pageImg_2 = page_2.getElementsByTagName("img")[0];
	 page_3 = content.getElementsByTagName("span")[2];
	 pageImg_3 = page_3.getElementsByTagName("img")[0];
	 page_4 = content.getElementsByTagName("span")[3];
	 pageImg_4 = page_4.getElementsByTagName("img")[0];
	 length = img.length;
	 pageImg_3.src = img[num].src;
	 pageImg_4.src = img[num].src;
	 // var height = document.documentElement.clientHeight;
	 var height = window.innerHeight;
	 console.log(height);
	 content.style.height = height+"px";
	 content.style.visibility = "visible";
}

document.onselectstart = function() {
	return false;
}

function setOpacity(obj,opacity){
	if(opacity < 0) opacity=0;
	if(opacity > 100) opacity=100;
	if( obj.filters ) obj.filters.alpha.opacity=opacity;
	else obj.style.opacity=opacity;
}

function pageDownLeft(){
	if(!run){
		run=true;
		pageImg_2.src=img[num].src;
		page_4.style.width=0;
		num--;
		if(num<0) num=length-1;
		pageImg_1.src=img[num].src;
		pageImg_4.src=img[num].src;
		for(var i=1 ;i<=20; i++) setTimeout("pageDownLeft1("+i+")",i*32);

	}else setTimeout("pageDownLeft()",100);
}

function pageDownLeft1(p){
	page_3.style.left = (2.5*p) + "%";
	page_3.style.width = (40+(10-2.5*p))+"%";
	setOpacity(pageImg_3,100-0.5*(p*p));
	if( p==20 ){
		pageImg_3.src = img[num].src;
		setOpacity(pageImg_3,100);
		page_3.style.width = "50%";
		for(var i=1;i<=20;i++) setTimeout("pageDownLeft2("+i+")",i*32);
	}
}

function pageDownLeft2(p){
	page_4.style.width = (2.5*p)+"%";
	setOpacity(pageImg_4,0.5*p*p);
	if(p == 20) run = false;
}

function pageDownRight(){
	if(!run){
		run=true;
		pageImg_1.src=img[num].src;
		page_3.style.width=0;
		num++;
		if(num >= length) num = 0;
		console.log(pageImg_2.src);
		pageImg_2.src = img[num].src;
		pageImg_3.src = img[num].src;
		for(var i=1;i<=20;i++) setTimeout("pageDownRight1("+i+")",i*32);
	}else setTimeout("pageDownRight()",100);
}

function pageDownRight1( p ){
	page_4.style.width = (50-(2.5*p))+"%";
	setOpacity( pageImg_4, 100 - 0.5 * ( p * p ) );
	if( p == 20 ) {
		pageImg_4.src = img[num].src;
		setOpacity( pageImg_4, 100 );
		page_4.style.width = "50%" ;
		for( var i = 1; i <= 20; i++ ) setTimeout("pageDownRight2("+i+")", i*32 );
	}
}

function pageDownRight2( p ) {
	page_3.style.left = (50-(2.5*p))+"%";
	page_3.style.width = (2.5*p)+"%";
	setOpacity(pageImg_3,0.5*p*p);
	if( p == 20 ) run = false;
}