window.onload = function() {

	var moveTime = 500;
	console.log("hello");

	var winHeight = window.innerHeight;
	console.log(winHeight);
	var height = $("#contentBox").outerHeight();
	console.log(height);
	var moveHeight = height - winHeight;
	console.log(moveHeight);
	var half = winHeight/2;
	var width = $("#contentBox").outerWidth();
	console.log(width);
	var curmove = moveHeight/10;
	// $("#contentBox").hover(function(e){
	// 	pointX = e.pageX;
	// 	pointY = e.pageY;
	// 	offsetTop = $("#contentBox").offset().top;
	// 	console.log(offsetTop);
	// 	if(pointX < width && pointY < half && $("#contentBox").offset().top <= 0 ){
	// 		goUp();
	// 	}
	// 	if(pointX < width && pointY > half && $("#contentBox").offset().top < 0 ){
	// 		goDown();
	// 	}
	// },function(e){
	// 	clearTimeout(goUp)
	// 	clearTimeout(goDown)
	// })

	// var goUp = function(){
	// 	clearTimeout(goDown);
	// 	console.log(moveHeight);
	// 	for(var i=0;i<10 && $("#contentBox").offset().top >= (moveHeight*-1) ;i++){
	// 		setInterval(function(){
	// 			$("#contentBox").css("top",$("#contentBox").offset().top - curmove);
	// 		},100);
	// 	}
	// }

	// var goDown = function(){
	// 	clearTimeout(goUp);
	// 	for(var i=0; i<10 && $("#contentBox").offset().top>=(moveHeight*-1) && $("#contentBox").offset().top<=0;i++){
	// 		setInterval(function(){
	// 			$("#contentBox").css("top",$("#contentBox").offset().top + curmove);
	// 		},100);
	// 	}
	// }

	 $("#contentBox").mouseenter(function(e){
	  	pointX = e.pageX;
	  	pointY = e.pageY;
	  	offsetTop = $("#contentBox").offset().top;
	  	var scrollHeight = $(document).scrollTop();
	  	
	  	console.log(pointX < width && (pointY-$(document).scrollTop()) < half && ($("#contentBox").offset().top-$(document).scrollTop()) <= 0 && $("#contentBox").offset().top < moveHeight);
	  	if( pointX < width && (pointY-$(document).scrollTop()) < half && ($("#contentBox").offset().top-$(document).scrollTop()) <= 0 && $("#contentBox").offset().top < moveHeight){
	  		$("#contentBox").stop(true,false);
	  		console.log(-1*moveHeight);
	  		$("#contentBox").animate({top: -1*moveHeight +"px"},2500);
	  	}
	  	if( pointX < width && (pointY-$(document).scrollTop()) > half && ($("#contentBox").offset().top-$(document).scrollTop()) < 0 && $("#contentBox").offset().top <= moveHeight){
	  		$("#contentBox").stop(true,false);
	  		$("#contentBox").animate({top: 0 +"px"},2500);
	  	}
	  })
	
	  $("#contentBox").mouseleave(function(e){
	   		$("#contentBox").stop(true);
	   	})	

	  var goUp = function(){
	  	clearTimeout(goDown);
	  	offsetTop = $("#contentBox").top;
	  	for(var i=0;i<10 && $("#contentBox").offset().top >= (moveHeight*-1) ;i++){
	  		console.log($("#contentBox").offset().top);
	  		$("#contentBox").animate({top:$("#contentBox").offset().top-curmove*(i+1) +"px"});
	  	}
	  }

	  var goDown = function(){
	  	clearTimeout(goUp);
	  	offsetTop = $("#contentBox").top;
	  	for(var i=0; i<10 && $("#contentBox").offset().top >= (moveHeight*-1) && $("#contentBox").offset().top<=0 ;i++){
	  		console.log($("#contentBox").offset().top);
	  		$("#contentBox").animate({top:$("#contentBox").offset().top+curmove*(i+1)+"px"});
	  	}
	  }

	  // $("#contentBox").mouseenter(function(e){
	  // 	pointX = e.pageX;
	  //  	pointY = e.pageY;
	  // 	offsetTop = $("#contentBox").offset().top;
	  // 	console.log(offsetTop);
	  // 	if( pointX < width && pointY < half && $("#contentBox").offset().top <= 0 && $("#contentBox").offset().top >= (-1*moveHeight+curmove)){
	  // 		var goUp = setInterval(function(){
	  // 			$("#contentBox").css("top",$("#contentBox").offset().top - curmove);
	  // 			if($("#contentBox").offset().top <= -1*moveHeight){
	  // 				clearInterval(goUp);
	  // 			}
	  // 		},100);	
	  // 	}
	  // 	if(pointX <width && pointY > half && $("#contentBox").offset().top < 0){
	  // 		var goDown = setInterval(function(){
	  // 			$("#contentBox").css("top",$("#contentBox").offset().top + curmove);
	  // 			console.log($("#contentBox").offset().top);
	  // 			if($("#contentBox").offset().top == 0){
	  // 				clearInterval(goDown);
	  // 			}
	  // 		},100);
	  // 	}
	  // })
	
	$("#contentBox").mouseleave(function(e){
	 		$("#contentBox").stop(true);
	 	})



	

}