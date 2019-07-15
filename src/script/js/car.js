; (function ($) {
    "use strict"
    function Datacar() {
        this.$usernamebox = $('.sn-login');
        this.$hidebox = $('.sn-register');
        this.$moban = $('.goods-info');
        this.$itembox = $('.goods-item');
        this.$goodsnums = $('.goodsnums');
        this.$totalprice = $('.totalprice');
        this.$selectallbtn = $('.selectbtn-all');
        this.init();
    }
    // 主调函数
    Datacar.prototype.init = function () {
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
        let that = this;
        if (this.getcookie('cookieid')) {
            this.senddata();
        }
        this.have();
        this.$upbtn = $('.quantity-add');
        this.$downbtn = $('.quantity-down');
        // 增加按钮的函数调用
        this.$upbtn.on('click', function () {
            that.jjbtn($(this), 999, 1);
        })
        // 减少按钮的函数调用
        this.$downbtn.on('click', function () {
            that.jjbtn($(this), 1, -1);
        })
        // 调用删除购物车的函数
        this.delcar();
        // 全选按钮点击事件
        this.$selectallbtn.on('click', function () {
            that.selectall();
        })
        // 调用单选按钮点击事件函数
        this.select();
    }
    // 数据渲染
    Datacar.prototype.senddata = function () {
        let that = this;
        this.cookiedata = this.getcookie('cookieid').split(',');
        let prices = 0;
        let nums = 0;
        $.each(this.cookiedata, function (index, value) {
            let num = that.getcookie('cookienum').split(',')[index];
            let table = that.getcookie('cookietable').split(',')[index];
            $.ajax({
                async: false,
                url: "http://10.31.158.21:8088/tianmao/object/php/car.php?id=" + value + '&table=' + table,
                dataType: 'json',
            }).done(function (data) {
                // 克隆模板
                let $item = that.$moban.clone();
                // 数据渲染
                $item.find('.del-btn').attr('dataid', data.id);
                $item.css('display', 'block');
                $item.find('.data-title').html(data.title);
                $item.find('.data-price').html((+data.price).toFixed(2));
                $item.find('.data-url').attr('src', data.url);
                $item.find('.cookie-num').attr('value', num).attr('uid', data.id).attr('table', data.table);
                $item.find('.price-all').html((num * data.price).toFixed(2));
                that.$itembox.prepend($item);
                //通过cookie 渲染总价以及总件数
                // if ($('.selectbtn-one').prop('checkbox')) {
                prices += +data.price * +num;
                nums++;
                // }
                that.$totalprice.html(prices.toFixed(2));
                that.$goodsnums.html(nums);
            })
        })

    }
    // 判断购物车是否存在商品
    Datacar.prototype.have = function () {
        this.$carttop = $('.empty-cart');
        this.$cartwrap = $('.cart-wrap');
        this.$carttop.css('display', 'none');
        if (this.getcookie('cookieid')) {
            this.$carttop.css('display', 'none');
            this.$cartwrap.css('display', 'block');
        } else {
            this.$carttop.css('display', 'block');
            this.$cartwrap.css('display', 'none');
        }
    }
    // 删除购物车商品
    Datacar.prototype.delcar = function () {
        let that = this;
        let $delbtn = $('.del-btn');
        $delbtn.on('click', function () {
            // 取当前选中商品的总价
            let priceone = +$(this).parent().siblings('.b-sum').find('.price-all').html();
            // 更新cookie
            that.cookiechange($(this).attr('dataid'));
            // 删除选中的商品盒子
            $(this).parent().parent().remove();
            // 变更总价的数据
            that.$totalprice.html(+that.$totalprice.html() - priceone);
            that.$goodsnums.html(+that.$goodsnums.html() - 1);
        })
    }
    // 增减按钮的效果
    Datacar.prototype.jjbtn = function (othis, mnum, add) {
        let that = this;
        // 取单个商品总价与数量的盒子
        let $onum = othis.parent().parent().find('.cookie-num');
        let $oPriceall = othis.parent().parent().siblings('.b-sum').find('.price-all');
        let whenprice = +$oPriceall.html();
        // 加减上限的判断
        if ($onum.val() == mnum) {
            $onum.val(mnum);
        } else {
            // 设置单次点击增加或者减少的数量
            $onum.val(+$onum.val() + add);
            // 后台请求数据更新单个商品的总价
            $.get("http://10.31.158.21:8088/tianmao/object/php/car.php", { id: $onum.attr('uid'), table: $onum.attr('table') }, function (data) {
                data = JSON.parse(data);
                let prices = 0;
                prices += +data.price * +$onum.val();
                $oPriceall.html(prices.toFixed(2));
                // 计算单个商品总价变化前后的差
                let pricechange = +othis.parent().parent().siblings('.b-sum').find('.price-all').html() - whenprice;
                // 更改总价的渲染
                that.$totalprice.html((+that.$totalprice.html() + pricechange).toFixed(2));
            })
            // 更新cookie数据
            this.cookiechange($onum.attr('uid'), add);
        }
    }
    // 全选按钮
    Datacar.prototype.selectall = function () {
        this.$selectbtn = $('.selectbtn-one');
        // 全选按钮功能
        if (this.$selectbtn.prop('checked')) {
            this.$selectbtn.prop('checked', false);
            this.$selectallbtn.prop('checked', false);
        } else {
            this.$selectbtn.prop('checked', true);
            this.$selectallbtn.prop('checked', true);
        }
        this.dataup();
    }
    // 点击商品项选中按钮
    Datacar.prototype.select = function () {
        let that = this;
        this.$selectbtn = $('.selectbtn-one');
        this.$selectbtn.on('click', function () {
            // 单选按钮与全选按钮协同效果
            if (that.$selectbtn.length === $('.selectbtn-one:checked').length) {
                that.$selectallbtn.prop('checked', true);
            } else {
                that.$selectallbtn.prop('checked', false);
            }
            that.dataup();
        })
    }

    // 选中的商品计算在总价与总数内，未选中不计算
    Datacar.prototype.dataup = function () {
        let prices = 0;
        let num = 0;
        $('.selectbtn-one:checked:visible').each(function (index, ele) {
            console.log(ele);

            num++;
            let priceone = +$(ele).parent().parent().siblings('.b-sum').find('.price-all').html();
            prices += priceone;
            console.log(priceone);
        })
        this.$totalprice.html(prices.toFixed(2));
        this.$goodsnums.html(num);
    }
    // 更新cookie数据的方法
    Datacar.prototype.cookiechange = function (id, change) {
        let that = this;
        //  确认将要删除商品的索引
        let index = that.getcookie('cookieid').split(',').indexOf(id);
        // 取到cookie中的数据
        let idarr = that.getcookie('cookieid').split(',');
        let numarr = that.getcookie('cookienum').split(',');
        let tablearr = that.getcookie('cookietable').split(',');
        // 判断是删除或者更改cookie
        if (!change) {
            // 删除选中的cookie
            idarr.splice(index, 1);
            numarr.splice(index, 1);
            tablearr.splice(index, 1);
            that.setcookie('cookieid', idarr, 7);
            that.setcookie('cookienum', numarr, 7);
            that.setcookie('cookietable', tablearr, 7);
        } else {
            // 更改cookie
            numarr.splice(index, 1, +numarr[index] + change);
            that.setcookie('cookienum', numarr, 7);
        }

    }
    // 封装cookie函数
    Datacar.prototype.setcookie = function (key, value, time) {
        let date = new Date();
        date.setDate(date.getDate() + time);
        document.cookie = `${key}=${value};expires=${date}`;
    }
    Datacar.prototype.getcookie = function (key) {
        let arr = document.cookie.split('; ');
        for (let i = 0; i < arr.length; i++) {
            let newarr = arr[i].split('=');
            if (newarr[0] === key) {
                return newarr[1];
            }
        }
    }
    Datacar.prototype.removecookie = function (key) {
        this.setcookie(key, '', -1);
    }
    new Datacar();
}(jQuery));
