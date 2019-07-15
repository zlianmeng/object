
// 数据渲染
; (function ($) {
    function Datashow() {
        this.$hidebox = $('.sn-register');
        this.$usernamebox = $('.sn-login');
        this.$spicbox = $('.spic');
        this.$bpicbox = $('.bf');
        this.$productlist = $('.product-list');
        this.$titlebox = $('.titlebox');
        this.$pricebox = $('.price-right');
        this.tablename = location.search.split('?')[1].split('&')[0].split('=')[1];
        this.id = location.search.split('?')[1].split('&')[1].split('=')[1];
        this.init();
    }
    // 总调函数
    Datashow.prototype.init = function () {
        // 尝试获取用户名，如果有则显示登陆状态
        if (this.getcookie('username')) {
            this.$usernamebox.html(this.getcookie('username').split('; ')[0]);
            this.$usernamebox.attr('href', '#');
            this.$hidebox.html('退出');
            this.$hidebox.attr('href', '#');
            this.$hidebox.on('click', function () {
                that.$usernamebox.html("请登录");
                that.$usernamebox.attr('href', 'http://10.31.158.21:8088/tianmao/object/src/login.html');
                that.$hidebox.html('免费注册');
                that.$hidebox.attr('href', "http://10.31.158.21:8088/tianmao/object/src/registor.html");
                that.removecookie('username');
                return false;
            })
        }
        this.ajax();
    }
    //利用ajax请求渲染数据
    Datashow.prototype.ajax = function () {
        let that = this;
        $.ajax({
            url: "http://10.31.158.21:8088/tianmao/object/php/details.php?table=" + this.tablename + "&id=" + this.id,
            dataType: "json"
        }).done(function (data) {
            let [spicstr, bpicstr, productliststr, titlestr, pricestr] = ['', '', '', '', ''];
            // 渲染主图
            spicstr = `
                <img src="${data.url}"alt="" class="spic-pic">
                <div class="sf"></div>
                `;
            // 渲染放大镜
            bpicstr = `
                <img src="${data.url}" class="bpic" alt="">
                `;
            // 渲染标题
            titlestr = `
                <div class="title">${data.title}</div>
                `;
            // 渲染价格
            pricestr = `
                    <em>￥</em><span class="price">${data.price}</span>
                `;
            // 渲染产品图列表
            if (data.imgurls) {
                let arr = data.imgurls.split(',');
                $.each(arr, function (index, value) {
                    productliststr += `
                        <li><img src="${value}" alt=""></li>
                        `;
                })
                //输出数据
                that.$productlist.html(productliststr);
            }
            that.$spicbox.html(spicstr);
            that.$bpicbox.html(bpicstr);
            that.$pricebox.html(pricestr);
            that.$titlebox.html(titlestr);

            // 放大镜
            ; (function ($) {
                function Zoom() {
                    this.$spic = $('.spic');
                    this.$sf = $('.sf');
                    this.$bpic = $('.bpic');
                    this.$bf = $('.bf');
                    this.$picshowbox = $('.product-list');
                    this.init();
                }
                // 主调函数
                Zoom.prototype.init = function () {
                    let that = this;
                    this.$spic.hover(function () {

                        that.mouseover();
                        $('body').on('mousemove', function (e) {
                            let ev = e || window.event;
                            that.followmouse(ev);
                        })

                    }, function () {
                        that.mouseup();
                    })
                }
                // 鼠标移入事件（大小放大镜出现）
                Zoom.prototype.mouseover = function () {
                    this.$sf.css('visibility', 'visible');
                    this.$bf.css('visibility', 'visible');
                }
                // 鼠标移出事件（大小放大镜消失）
                Zoom.prototype.mouseup = function () {
                    this.$sf.css('visibility', 'hidden');
                    this.$bf.css('visibility', 'hidden');
                }
                // 小放大镜跟随鼠标移动
                Zoom.prototype.followmouse = function (ev) {
                    // 跟随移动
                    this.$sf.css({
                        top: (ev.pageY - this.$spic.offset().top - this.$sf.height() / 2 - 1),
                        left: (ev.pageX - this.$spic.offset().left - this.$sf.width() / 2 - 1)
                    })
                    // 设置移动边界
                    // 设置上边界
                    if (this.$sf.position().top <= 0) {
                        this.$sf.css('top', '0');
                    }
                    // 设置下边界    
                    if (this.$sf.position().top >= this.$spic.height() - this.$sf.height()) {
                        this.$sf.css('top', this.$spic.height() - this.$sf.height())
                    }
                    // 设置左边界
                    if (this.$sf.position().left <= 0) {
                        this.$sf.css('left', '0')
                    }
                    // 设置右边界
                    if (this.$sf.position().left >= this.$spic.width() - this.$sf.width()) {
                        this.$sf.css('left', this.$spic.width() - this.$sf.width());
                    }
                    this.bpicmove();
                }
                // 大图按比例跟随小放大镜移动
                Zoom.prototype.bpicmove = function () {
                    // 求移动的比列
                    let biliX = -this.$sf.position().left / this.$spic.width();
                    let biliY = -this.$sf.position().top / this.$spic.height();
                    // 计算大图移动的距离
                    this.$bpic.css({
                        left: this.$bpic.width() * biliX,
                        top: this.$bpic.height() * biliY
                    })
                }
                new Zoom();
            }(jQuery));
            // 产品列表网页效果
            ; (function ($) {
                function Webeff() {
                    this.$leftbtn = $('#left');
                    this.$rightbtn = $('#right');
                    this.$listbox = $(".product-list");
                    this.$bpic = $('.bpic');
                    this.$spic = $('.spic-pic');
                    // 防止li不存在时报错
                    if (this.$listbox.find('li')) {
                        // 取一个li的宽度
                        const $oneli = this.$listbox.find('li').eq(0);
                        this.liwidth = $oneli.width() + parseInt($oneli.css('padding-left')) + parseInt($oneli.css('padding-right')) + parseInt($oneli.css('margin-left')) + parseInt($oneli.css('margin-right')) + 2;
                        // 取li的数量
                        this.num = this.$listbox.find('li').length;
                    }

                    this.init();
                }
                // 总调函数
                Webeff.prototype.init = function () {
                    let that = this;
                    if (this.$listbox.find('li')) {
                        this.$leftbtn.on('click', function () {
                            that.leftclick();
                        });
                        this.$rightbtn.on('click', function () {
                            that.rightclick();
                        });
                        this.$listbox.find('li').on('mouseover', function () {
                            that.mouseover($(this).index());
                        })
                    }

                }
                // 左侧按键点击事件
                Webeff.prototype.leftclick = function () {
                    this.$leftbtn.css('color', '#000');
                    this.$rightbtn.css('color', '#000');
                    if (this.$listbox.position().left == -((this.num - 6) * this.liwidth)) {
                        this.$leftbtn.css('color', 'transparent');
                        this.$listbox.css('left', -((this.num - 5) * this.liwidth));
                    } else {
                        this.$listbox.css('left', this.$listbox.position().left - this.liwidth);
                    }
                }
                // 右侧按键点击事件
                Webeff.prototype.rightclick = function () {
                    this.$rightbtn.css('color', '#000');
                    this.$leftbtn.css('color', '#000');
                    if (this.$listbox.position().left === -this.liwidth) {
                        this.$rightbtn.css('color', 'transparent');
                        this.$listbox.css('left', 0);
                    } else {
                        this.$listbox.css('left', this.$listbox.position().left + this.liwidth);
                    }
                }
                // 鼠标滑过展示列表更换主图图片
                Webeff.prototype.mouseover = function (index) {
                    let url = this.$listbox.find('li').eq(index).find('img').attr('src');
                    this.$listbox.find('li').eq(index).css('border-color', '#000').siblings('li').css('border-color', '#ccc');
                    this.$bpic.attr('src', url);
                    this.$spic.attr('src', url);
                }
                new Webeff();
            }(jQuery));



            // 加入购物车
            ; (function ($) {
                function Cart() {
                    this.$addbtn = $('.add-btn');
                    this.$upbtn = $('#up');
                    this.$downbtn = $('#down');
                    this.$getnum = $('.get-num');
                    this.$titlebox1 = $('.titlebox1-success');
                    this.idarr = [];
                    this.numarr = [];
                    this.tablearr = [];
                    this.timer = null;

                    this.init();
                }
                // 主调函数
                Cart.prototype.init = function () {
                    let that = this;
                    this.$upbtn.on('click', function () {
                        that.clickup();
                    });
                    this.$downbtn.on('click', function () {
                        that.clickdown();
                    });
                    this.$getnum.on('blur', function () {
                        that.blur();
                    });
                    this.$addbtn.on('click', function () {
                        that.addcart();
                    })
                }
                // 点击up键数量加1
                Cart.prototype.clickup = function () {
                    if (+this.$getnum.val() === 999) {
                        this.$getnum.val(999);
                    } else {
                        this.$getnum.val(+this.$getnum.val() + 1);
                    }
                }
                // 点击down键数量减1
                Cart.prototype.clickdown = function () {
                    if (+this.$getnum.val() === 1) {
                        this.$getnum.val(1);
                    } else {
                        this.$getnum.val(+this.$getnum.val() - 1);
                    }
                }
                // 限制输入数量超过999
                Cart.prototype.blur = function () {
                    if (+this.$getnum.val() >= 999) {
                        this.$getnum.val(999);
                    } else if (isNaN(+this.$getnum.val())) {
                        this.$getnum.val(1);
                    }
                }
                // 加入购物车
                Cart.prototype.addcart = function () {
                    let that = this;
                    if (this.getcookie('cookieid')) {
                        let cookieidarr = this.getcookie('cookieid').split(',');
                        let cookienumarr = this.getcookie('cookienum').split(',');
                        let cookietablearr = this.getcookie('cookietable').split(',');
                        if (cookieidarr.indexOf(data.id) != -1) {
                            // 修改购物车信息
                            let index = cookieidarr.indexOf(data.id);
                            cookienumarr.splice(index, 1, (Number(cookienumarr[index]) + Number(this.$getnum.val())));
                            this.setcookie('cookienum', String(cookienumarr), 7);
                            new Modal({
                                btnname: '.add-btn',
                                modalsheet: true,
                                modalname: '.titlebox1-success',
                                modalresize: false,
                                drag: false,
                                starttop: 300
                            });
                            this.timer = setTimeout(function () {
                                that.$titlebox1.css('display', 'none');
                                clearTimeout(that.timer);
                            }, 500);
                        } else {
                            // 添加新的商品
                            cookieidarr.push(data.id);
                            cookienumarr.push(this.$getnum.val());
                            cookietablearr.push(data.table);
                            this.setcookie('cookieid', String(cookieidarr), 7);
                            this.setcookie('cookienum', String(cookienumarr), 7);
                            this.setcookie('cookietable', String(cookietablearr), 7);
                            new Modal({
                                btnname: '.add-btn',
                                modalsheet: true,
                                modalname: '.titlebox1-success',
                                modalresize: false,
                                drag: false,
                                starttop: 300
                            });
                            this.timer = setTimeout(function () {
                                that.$titlebox1.css('display', 'none');
                                clearTimeout(that.timer);
                            }, 500);
                        };
                    } else {
                        // 首次添加购物车
                        this.idarr.push(data.id);
                        this.numarr.push(this.$getnum.val());
                        this.tablearr.push(data.table);
                        this.setcookie('cookieid', String(this.idarr), 7);
                        this.setcookie('cookienum', String(this.numarr), 7);
                        this.setcookie('cookietable', String(this.tablearr), 7);
                        new Modal({
                            btnname: '.add-btn',
                            modalsheet: true,
                            modalname: '.titlebox1-success',
                            modalresize: false,
                            drag: false,
                            starttop: 300
                        });
                        this.timer = setTimeout(function () {
                            that.$titlebox1.css('display', 'none');
                            clearTimeout(that.timer);
                        }, 500);
                    }
                }
                // 封装cookie函数
                Cart.prototype.setcookie = function (key, value, time) {
                    let date = new Date();
                    date.setDate(date.getDate() + time);
                    document.cookie = `${key}=${value};expires=${date}`;
                }
                Cart.prototype.getcookie = function (key) {
                    let arr = document.cookie.split('; ');
                    for (let i = 0; i < arr.length; i++) {
                        let newarr = arr[i].split('=');
                        if (newarr[0] === key) {
                            return newarr[1];
                        }
                    }
                }
                new Cart();
                new Modal({
                    btnname: '.add-btn',
                    modalsheet: true,
                    modalname: '.titlebox1-success',
                    modalresize: false,
                    drag: false,
                    starttop: 300
                });
            }(jQuery));
        })
    }
    Datashow.prototype.setcookie = function (key, value, time) {
        let date = new Date();
        date.setDate(date.getDate() + time);
        document.cookie = `${key}=${value};expires=${date}`;
    }
    Datashow.prototype.getcookie = function (key) {
        let arr = document.cookie.split('; ');
        for (let i = 0; i < arr.length; i++) {
            let newarr = arr[i].split('=');
            if (newarr[0] === key) {
                return newarr[1];
            }
        }
    }
    Datashow.prototype.removecookie = function (key) {
        this.setcookie(key, '', -1);
    }
    new Datashow();
}(jQuery));
