$(function(){
	var $projectItem=$(".projectItem");
	var length=$projectItem.length;
	console.log(length);
	for(var i=0;i<length;i++){
		(function(i){
			$(".projectItem").eq(i).hover(function(){
				$(this).children(".imgList").stop(true).animate({
					height:'500px'
				},200)
				$(this).parent(".projectPhoto").css({"background":"url(./images/projectPhoto_"+(i+1)+".png) no-repeat","background-size":"100% , 100%","transition":"all 0.8s ease 0.2s","-webkit-transition":"all 0.8s ease 0.2s"})
				$(this).find(".imgList h2").stop(true).animate({
					paddingTop:'130px'
				},550)
				$(this).find(".imgList p").stop(true).show()
			},
			function(){
				$(this).children(".imgList").stop(true).animate({
					height:'150px'
				},200)
				$(this).find(".imgList h2").stop(true).animate({
					paddingTop:'0px'
				},550)
				$(this).find(".imgList p").stop(true).hide()
			})
		})(i);
	}
})