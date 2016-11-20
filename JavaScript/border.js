$(function(){
	// var  $liList=$(".serviceItem").children("ul").children("li");
	// length=$liList.length;
	var length=$(".list").length;
	console.log(length);
	for(var i=0;i<length;i++){
		(function(i){
			$(".list").hover(function(){
				$(this).find(".border_1").stop(true).animate({
					height:'100%'
				},300)
				$(this).find(".border_2").stop(true).delay(300).animate({
					width:'100%'
				},300)
				$(this).find(".border_3").stop(true).animate({
					height:'100%'
				},300)
				$(this).find(".border_4").stop(true).delay(300).animate({
					width:'100%'
				},300)
			},
			function(){
				$(this).find(".border_1").stop(true).delay(100).animate({
					height:'0px'
				},100)
				$(this).find(".border_2").stop(true).animate({
					width:'0px'
				},100)
				$(this).find(".border_3").stop(true).delay(100).animate({
					height:'0px'
				},100)
				$(this).find(".border_4").stop(true).animate({
					width:'0px'
				},100)
			});
		})(i)			
	}
})