$(function){
	$.fn.shake = function(s){
		var proto = {rangX:2, rangY:2, rangeRot:1, rumbleSpeed:10, posX:left, posY:top},
			obj = $.extend( s, proto );

			return this.each( function() {
				var $obj = $(this),
					ani, /*定义动画名称*/
					leval = obj.rangX*2, /*水平移动的距离*/
					vertical = obj.rangY*2, /*数值方向上移动的距离*/
					spin = obj.rangeRot*2,  /*旋转的角度*/
					speed = obj.rumbleSpeed*2,  /*动画的持续时间*/
					direcX = obj.posX,  /*水平的*/
					direcY = obj.posY,
					pos = $obj.css("position"),
					lev,
					ver,
					p,
					spinStyle = {'position':'pos','-webkit-transform':'rotate(0deg)','-moz-transform':'rotate(0deg)','-o-transform':'rotate(0deg)','transform':'(0deg)'};

					if(direcX === 'left') { lev = parseInt($obj.css("left"),10)};
					if(direcX === 'right') {lev = parseInt($obj.css("right"),10)};
					if(direcY === 'top') {ver = parseInt($obj.css("top"),10)};
					if(direcY ==='bottom') {ver = parseInt($obj.css("bottom"),10)};

					function rumbler(obj){
						var b =Math.random(),
						addlev = Math.floor(Math.random()*(leval+1))-leval/2,
						addver = Math.floor(Math.random()*(vertical+1))-vertical/2,
						addspin = Math.floor(Math.random()*(spin+1))-spin/2;

						if(obj.css('display') === 'inline') {
							p = true;
							obj.css('display','inline-block')
						}
						if(addlev === 0 && leval !== 0){ addlev = b <.5 ? 1 : -1; }
						if(addver === 0 && vertical !== 0){ addver = b <.5 ? 1: -1; }

						if(pos === 'absolute'){
						obj.css({'position':'absolute','-webkit-transform':'rotate('+ addspin +'deg)','-moz-transform':'rotate('+ addspin +')','-o-transform','transform0':'rotate('+addspin+')'});
						obj.css(direcX, addlev + direcX + "px");
						obj.css(direcY, addver + direcY + "px");

						}
					}

					$obj.hover(function(){
						var a = $(this);
						ani = setInterval(function(){
							rumbler(a)
						},10);
					},function(){
						var a = $(this);
						ani = clearInterval(rumbler(a));
						a.css(spinStyle);
						a.css(direcX,lev + "px");
						a.css(direcY,ver + "px");
						if (p === true) {
		                        a.css('display', 'inline')
		                 }
					})
			} )
	}
}
