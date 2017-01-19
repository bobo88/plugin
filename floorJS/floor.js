/**
 * 
 * @authors BOBO (yuanboi88@163.com)
 * @date    2017-01-19 11:56:40
 * @option: {
 * 	floorItem: //所有楼层对应的盒子
 * 	nav: //包裹导航定位的盒子
 * 	direction: //方位，默认值是 'right'
 * 	offset: //偏移量，默认值是 '50px 50px'。其中，方位不同时，规则如下：
 * 	// rightDirection -> {right,top}, leftDirection -> {left,top}, topDirection -> {top,left}, bottomDirection -> {bottom,left}
 * }
 * @version 0.0.1
 */
(function($,window){
	$.extend({
		floorJS: function(options){
			var defaults = {
				direction : "right",
				offset : "50px 50px",
				callback:null
			}
			var options = $.extend({},defaults,options);
			
			var floorItemArr = $(options.floorItem),
				nav = $(options.nav),
				direction = options.direction,
				offset = options.offset,
				navItemArr = nav.find('li');

			//direction
			switch(direction){
				case 'right':
					var styleOptions = {
						'right': offset.split(' ')[0],
						'top': offset.split(' ')[1]
					};
					break;
				case 'left':
					var styleOptions = {
						'left': offset.split(' ')[0],
						'top': offset.split(' ')[1] 
					};
					break;
				case 'top':
					var styleOptions = {
						'top': offset.split(' ')[0],
						'left': offset.split(' ')[1]
					};
					break;
				case 'bottom':
					var styleOptions = {
						'bottom': offset.split(' ')[0],
						'left': offset.split(' ')[1]
					};
					break;
				default:
					var styleOptions = {
						'right': offset.split(' ')[0],
						'top': offset.split(' ')[1]
					};
					break;
			}

			nav.css(styleOptions);

			$(window).scroll(function(){
				var $win = $(window),
					firstFloorItemH = floorItemArr.eq(0).offset().top,
					winScrollH = $win.scrollTop();

				if(winScrollH >= firstFloorItemH){
				    nav.fadeIn();
				}else{
				    nav.fadeOut();
				}

				$.each(floorItemArr, function(index, val) {
				    var that = $(val);
				    if(winScrollH >= that.offset().top){
				        navItemArr.eq(index).addClass('active').siblings('li').removeClass('active');  
				    }else{
				        navItemArr.eq(index).removeClass('active');
				    }
				});
			});
		}
	});
})(jQuery, window);