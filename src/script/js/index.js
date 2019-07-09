; !function ($) {
	function Web() {
		this.init();
	}
	Web.prototype.init = function () {
		//天猫国际数据渲染
		this.ajax('tmallgj', 'tmall-hk');
		//美丽人生数据渲染
		this.ajax('fashion', 'fashion');
		//潮店酷玩数据渲染
		this.ajax('play', 'play');
		// 居家生活
		this.ajax('family', 'family');
		// 打造爱巢
		this.ajax('love', 'home-decoration');
		// 户外出行
		this.ajax('outdoors', 'outdoors');
		// 猜你喜欢
		this.ajax('guesslist', 'guess-like', 'product-show', '<li class="guess-item">', '</li>');
		// 广告数据渲染
		this.brandshow();
		// 天猫超市数据渲染
		this.super();
	}
	//封装随机数函数
	Web.prototype.sj = function (min, max) {
		return parseInt(Math.random() * ((max - min) + min));
	}
	//各个产品板块数据渲染的函数
	Web.prototype.ajax = function (name, tagname, boxname = 'product-item-box', tagh = '', tagf = '') {
		let that = this;
		$.ajax({
			url: 'http://10.31.158.21:8088/tianmao/object/php/' + name + '.php',
			dataType: 'json'
		}).done(function (data) {
			that.$productbox = $(`#${tagname} .${boxname}`);
			that.str = '';
			$.each(data, function (index, value) {
				that.str += `
				${tagh}
				<div class="product-item">
					<a class="product-item-link" href="http://10.31.158.21:8088/tianmao/object/src/details.html?table=${name}&id=${index}">
						<div class="floor-item-tag" style="visibility:hidden"></div>
						<img src="${value.url}"
							alt="">
						<div class="floor-item-title">${value.title}</div>
						<div class="floor-price">￥${value.price}</div>
					</a>
				</div>
				${tagf}
				`
				that.$productbox.html(that.str);
			});
		});
	}
	// 广告渲染数据
	Web.prototype.brandshow = function () {
		let that = this;
		$.ajax({
			url: 'http://10.31.158.21:8088/tianmao/object/php/brand.php',
			dataType: 'json',
		}).done(function (data) {
			that.$brand = $('.brand-box');
			that.$brandBtn = $('.brand-item-btn');
			that.brandstr = '';
			for (let i = 0; i < 29; i++) {
				let num = that.sj(0, 10);
				that.brandstr += `
				<li class="brand-item">
					<div class="brand-img">
						<img src="${data[num].url}"
						alt="">
					</div>
					<a class="brand-mask" href="javascript:;">
						<div class="coupon">
							<span>${data[num].title}</span>
						</div>
						<div class="enter">
							<span>点击进入</span>
						</div>
					</a>
				</li>
				`
			}
			that.$brand.html(that.brandstr);
			that.brandhover();
			that.brandswitch(data);
		});
	}
	//广告添加鼠标悬停事件
	Web.prototype.brandhover = function () {
		this.$brandItem = $('.brand-item');
		this.$brandItem.hover(function () {
			$(this).find('.brand-img').css('opacity', '0').siblings('.brand-mask').css('opacity', '1');
		}, function () {
			$(this).find('.brand-img').css('opacity', '1').siblings('.brand-mask').css('opacity', '0');
		})
	}
	//广告切换
	Web.prototype.brandswitch = function (data) {
		let that = this;
		//换一批按钮添加点击事件
		this.$switchbtn = $('.brand-item-btn');
		this.$brandImg = $('.brand-img');
		this.$bg = $('.brand-mask');
		this.$switchbtn.on('click', function () {
			// 对每一项绑定延迟计时器
			for (let i = 0; i < 29; i++) {
				this.timer = setTimeout(function () {
					that.brandhide(i, data);
				}, that.sj(0, 500));
			}
			clearTimeout(this.timer);
		});
	}
	// 广告动画隐藏效果
	Web.prototype.brandhide = function (i, data) {
		let that = this;
		// 添加动画效果隐藏
		$(this.$brandImg[i]).stop().animate({
			width: 0,
			left: $(this.$brandItem[i]).offset().left + 61
		}, 200, function () {
			// 添加动画效果出现
			$(that.$brandImg[i]).stop().animate({
				width: 122,
				left: $(that.$brandItem[i]).offset().left - 61
			}, 200)
			// 出现后随机改变内容
			let num = that.sj(0, data.length);
			$(that.$brandImg[i]).find('img').attr('src', data[num].url);
			$(that.$bg[i]).find('span').html(data[num].title);
		})
	}
	// 天猫超市数据渲染
	Web.prototype.super = function () {
		let that = this;
		$.ajax({
			url: "http://10.31.158.21:8088/tianmao/object/php/supermarket.php",
			dataType: "json",
		}).done(function (data) {
			that.$productcon = $('.product-box');
			that.brandstr = '';
			for (let i = 0; i < 6; i++) {
				that.brandstr += `
				<div class="product-item">
					<a class="product-item-link" href="http://10.31.158.21:8088/tianmao/object/src/details.html?table=supermarket&id=${i}">
						<div class="floor-item-tag" style="visibility:hidden"></div>
						<img src="${data[i].url}"
							alt="">
						<div class="floor-item-title">${data[i].title}</div>
						<div class="floor-price">￥${data[i].price}</div>
					</a>
				</div>
				`
			}
			that.$productcon.html(that.brandstr);
		});
	}
	new Web();
}(jQuery);
// banner数据+效果
$.ajax({
	url: 'http://10.31.158.21:8088/tianmao/object/php/banner.php',
	dataType: 'json'
}).done(function (bannerdata) {
	let bannerbgstr = '';
	let $bgbox = $('.banner-center');
	$.each(bannerdata, function (index, value) {
		if (value.imgurls) {
			bannerbgstr += `
			<div class="banner-pic" style="display:none" bcolor="${value.color}">
				<a class="big-banner-link" href="javascript:;">
					<b class="big-banner" style="background:url(${value.url}) no-repeat center center;"></b>
				</a>
				<a class="sm-banner sm1" href="javascript:;">
					<img src="${value.imgurls.split(',')[0]}"
					alt="">
				</a>
				<a class="sm-banner sm2" href="javascript:;">
					<img src="${value.imgurls.split(',')[1]}"
					alt="">
				</a>
			</div>
			`
		} else {
			bannerbgstr += `
			<div class="banner-pic" style="display:none" bcolor="${value.color}">
				<a class="big-banner-link" href="javascript:;">
					<div class="tanx-banner-con">
						<img class="tanx-banner"
							src="${value.url}" alt="">
					</div>
				</a>
			</div>
			`
		}
	});
	$bgbox.html(bannerbgstr);
	// banner图效果
	!function () {
		function Lb() {
			this.$bannerbox = $('.banner-pic');
			this.$bannerbtn = $('.banner-btn a');
			this.$bgcolorbox = $('.banner-bgcolor');
			this.timer = null;
			this.index = 0;
			this.init();

		}
		// 总调函数
		Lb.prototype.init = function () {
			// 轮播图展示初始化
			let that = this;
			this.$bannerbox.eq(0).css({
				display: 'block',
				opacity: 1,
			});
			this.$bgcolorbox.css("background", this.$bannerbox.eq(0).attr('bcolor'));
			this.$bannerbtn.on('mouseover', function () {
				that.btnswitch($(this).index());
				that.switch($(this).index());
				that.index = $(this).index();
			});
			//自动轮播
			that.autoswitch();
			// 鼠标悬停关闭定时器，离开开启定时器
			this.$bannerbox.hover(function () {
				clearInterval(that.timer);
			}, function () {
				that.autoswitch();
			})
		}
		// 按钮样式切换
		Lb.prototype.btnswitch = function (index) {
			this.$bannerbtn.eq(index).addClass('selected').siblings().removeClass('selected');
		}
		//轮播切换效果
		Lb.prototype.switch = function (index) {
			let that = this;
			this.$bannerbox.eq(index).animate({
				opacity: 1,
			}, 200).siblings('.banner-pic').animate({
				opacity: 0,
			}, 200, function () {
				that.$bgcolorbox.css("background", that.$bannerbox.eq(index).attr('bcolor'));
				that.$bannerbox.eq(index).css('display', 'block');
				that.$bannerbox.eq(index).siblings().css('display', 'none');
			})
		}
		// 自动轮播效果
		Lb.prototype.autoswitch = function () {
			let that = this;
			this.timer = setInterval(function () {
				that.index++;
				if (that.index >= that.$bannerbtn.length) {
					that.index = 0;
					that.switch(that.index);
					that.btnswitch(that.index);
				} else {
					that.switch(that.index);
					that.btnswitch(that.index);
				}
			}, 4000);
		}
		new Lb();
	}(jQuery);
});
// 楼梯全部效果
!function () {
	function Floor() {
		this.$floorbox = $('.mui-lift');
		this.navsign = $('.nav-name');
		this.floor = $('.fplist a');
		this.sqall = $('.js-use').find('div[id]').not('div[id=product-content]');
		this.init();
	}
	//总调函数
	Floor.prototype.init = function () {
		let that = this;
		$(window).on('scroll', function () {
			//楼梯的出现与消失
			that.floorshow();
			// 滚动事件
			that.floorswitch();
		})
		//鼠标悬停效果
		this.floor.hover(function () {
			that.mouseover($(this).index());
		}, function () {
			that.mouseout();
		})
		this.floor.on('click', function () {
			that.click($(this).index());
		})

	}
	// 楼梯的出现与消失
	Floor.prototype.floorshow = function () {
		if ($(window).scrollTop() > 680) {
			this.$floorbox.stop().animate({
				width: 35,
				height: 370,
				opacity: 1,
				display: 'block',
			}, 200);
		} else {
			this.$floorbox.stop().animate({
				width: 0,
				height: 0,
				opacity: 0,
				display: 'none',
			}, 200)
		}
	}
	// 鼠标移入效果
	Floor.prototype.mouseover = function (num) {
		let $target = $(this.navsign[num]);
		switch (num) {
			case 0: ;
			case 4: $target.parent().css('background', '#64C333'); break;
			case 1: ;
			case 7: $target.parent().css('background', '#000'); break;
			case 2: $target.parent().css('background', '#EA5F8D'); break;
			case 5: $target.parent().css('background', '#F15453'); break;
			case 3: $target.parent().css('background', '#0AA6E8'); break;
			case 6: $target.parent().css('background', '#19C8A9'); break;
		}
	}
	//鼠标移出效果
	Floor.prototype.mouseout = function () {
		this.floor.css({
			background: 'rgba(0, 0, 0, 0.6)',
		})
	}
	// 楼梯滚动效果
	Floor.prototype.floorswitch = function () {
		let that = this;
		$.each(this.sqall, function (index, value) {
			if ($(window).scrollTop() + 400 > $(value).offset().top) {
				for (let i = 0; i < index; i++) {
					that.floor.css('background', 'rgba(0,0,0,0.6)');
				}
				that.mouseover(index);
			}
		})
	}
	//楼梯点击效果
	Floor.prototype.click = function (num) {
		$('html,body').animate({
			scrollTop: this.sqall.eq(num).offset().top - 50,
		});
	}
	new Floor();
}(jQuery);
// 顶部导航
!function () {
	function Tobnav() {
		this.$topNav = $('#top-nav');
		this.navshow();
	}
	Tobnav.prototype.navshow = function () {
		let that = this;
		$(window).on('scroll', function () {
			if ($(window).scrollTop() > 730) {
				that.$topNav.css({
					display: 'block',
				});
			} else {
				that.$topNav.css('display', 'none');
			}
		})
	}
	new Tobnav();
}(jQuery);
// 二级导航
!function () {
	function Tobnav() {
		this.$subNav = $('.nav-box .content-con');
		this.$navli = $('.nav-item');
		this.init();
	}
	Tobnav.prototype.init = function () {
		let that = this;
		this.$navli.hover(function () {
			that.$subNav.eq($(this).index()).addClass('show').siblings().removeClass('hide');
		}, function () {
			that.$subNav.removeClass('show').addClass('hide');
		});
	}
	new Tobnav();
}(jQuery);
// tab切换
!function () {
	function Tab() {
		this.$tabli = $('.floor-tab-title li');
		this.$tabcon = $('.floor-tab-content');
		this.timer=null;
		this.num=0;
		this.init();
	}
	//总调函数
	Tab.prototype.init = function () {
		let that=this;
		this.$tabli.on('mouseover', function () {
			that.switch($(this).index());
		})
		this.autoswitch();
		this.hover();
	}
	// 切换效果
	Tab.prototype.switch = function (index) {
		this.$tabli.eq(index).addClass('floor-current-tab').siblings('li').removeClass('floor-current-tab');
		this.$tabcon.eq(index).addClass('hide').siblings('.floor-tab-content').removeClass('hide');
	}
	// 自动tab切换
	Tab.prototype.autoswitch = function () {
		let that=this;
		this.timer=setInterval(function(){
			that.num++;
			if(that.num>=that.$tabli.length){
				that.num=0;
				that.switch(that.num);
			}else{
				that.switch(that.num);
			}
		},3000);
	}
	// 鼠标悬停
	Tab.prototype.hover=function(){
		let that=this;
		this.$tabcon.hover(function(){
			clearInterval(that.timer);
		},function(){
			that.autoswitch();
		})
	}
	new Tab();
}(jQuery);

// 	//lunbo数据
// 	$.ajax({
// 		url:'php/banner.php',
// 		dataType:'json'
// 	}).done(function(bannerdata){
// 		$.each(bannerdata,function(index,value){
// 			var $bannerstr='<ul>';
// 		});
// 	});
// 	//tab切换数据
// 	$.ajax({
// 		url:'php/banner.php',
// 		dataType:'json'
// 	}).done(function(bannerdata){
// 		$.each(bannerdata,function(index,value){
// 			var $bannerstr='<ul>';

// 		});
// 	});
// }(jQuery);


