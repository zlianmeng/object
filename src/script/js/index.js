; !function ($) {
	function Web() {
		this.init();
	}
	Web.prototype.init = function () {
		//天猫国际数据渲染
		this.ajax('tmhk', 'tmall-hk');
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
		this.ajax('guess', 'guess-like', 'product-show', '<li class="guess-item">', '</li>');
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
			url: 'http://10.31.158.21:8088/tianmao/object/php/branddata.php',
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
			url: "http://10.31.158.21:8088/tianmao/object/php/super.php",
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
			this.$floorbox.stop(true).animate({
				width: 35,
				height: 370,
				opacity: 1,
				display: 'block',
			}, 200);
		} else {
			this.$floorbox.stop(true).animate({
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
		$(window).scrollTop(this.sqall.eq(num).offset().top-50);
	}
	new Floor();
}(jQuery);
// banner数据
// 	$.ajax({
// 		url:'php/banner.php',
// 		dataType:'json'
// 	}).done(function(bannerdata){
// 		$.each(bannerdata,function(index,value){
// 			var $bannerstr='<ul>';

// 		});
// 	});

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

// !function(){
// 	//banner效果

// }(jQuery);

// !function(){
// 	//lunbo效果

// }(jQuery);
