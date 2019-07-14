; (function ($) {
    function Regis() {
        this.$username = $('.username');
        this.$password = $('.password');
        this.$repassword = $('.repeat-password');
        this.$textbox = $('input').not('.btn')
        this.$titlebox = $('.titlebox');
        this.$title1 = $('.title1');
        this.$btn = $('.btn');
        this.$q = $('.q');
        this.$r = $('.r');
        this.$passwordsign = false;
        this.$repasswordsign = false;
        this.$usernamesign = false;
        this.$ajax = false;
        this.$gsyz = false;
        this.init();
    }
    Regis.prototype.init = function () {
        let that = this;
        // 密码强度验证
        this.$password.on('input', function () {
            that.filter();
        })
        // 密码格式验证
        this.$password.on('blur', function () {
            that.filter();
            that.pwyzgs();
            if (that.$passwordsign == true) {
                that.$titlebox.eq(0).css('display', 'none');
            }
        })
        // 密码确认验证
        this.$repassword.on('blur', function () {
            that.repwyz();
            if (that.$repasswordsign == true) {
                that.$titlebox.eq(1).css('display', 'none');
            }
            that.title(1, that.$repasswordsign);
        })
        // 用户名验证
        this.$username.on('blur', function () {
            that.usernameyz();
            that.findrepeat();

        })
        // 获得焦点提示框出现
        this.$textbox.on('focus', function () {
            if (that.$titlebox.eq(0).css('display') == 'none' && that.$titlebox.eq(2).css('display') == 'none') {
                that.$titlebox.eq($(this).attr('a')).css('display', 'block').siblings('.titlebox').css('display', 'none');
            }
        })
        // 提交验证-阻止默认行为
        this.$btn.on('click', function (ev) {
            var ev = ev || window.event;
            if (that.$passwordsign == true && that.$repasswordsign == true && that.$usernamesign == true) {
                new Modal({
                    btnname: '.btn',
                    modalsheet: true,
                    modalname: '#tishi',
                });
            } else {
                return false;
            }

        })
    }
    // 用户名验证
    Regis.prototype.usernameyz = function () {
        this.useryz = new RegExp(/^[\d\w]{7,14}$/g);
        if (this.$username.val() != '') {
            if (this.useryz.test(this.$username.val())) {
                // 格式验证通过，请求ajax查重
                this.$ajax = true;
            } else {
                this.$titlebox.eq(2).find('.baocuo').html('会员名格式有误').css('color', 'red');
                this.$usernamesign = false;
                this.$ajax = false;
            }
        } else {
            this.$titlebox.eq(2).find('.baocuo').html('会员名不能为空').css('color', 'red');
            this.$usernamesign = false;
            this.$ajax = false;
        }
    }
    // 利用ajax查重用户名
    Regis.prototype.findrepeat = function () {
        let that = this;
        if (this.$ajax == true) {
            $.ajax({
                type: 'get',
                url: `http://localhost:8088/tianmao/object/php/registor-repeat.php?username=${that.$username.val()}`,
            }).done(function (sign) {
                if (!sign) {
                    that.$titlebox.eq(2).css('display', 'none');
                    that.$titlebox.eq(2).find('.baocuo').html('会员名可用').css('color', 'green');
                    that.$usernamesign = true;
                    that.$ajax = false;
                } else {
                    that.$titlebox.eq(2).find('.baocuo').html('会员名已注册').css('color', 'red');
                    that.$usernamesign = false;
                    that.$ajax = false;
                }
                that.title(2, that.$usernamesign);
            })
        }

    }
    // 密码强度验证
    Regis.prototype.filter = function () {
        // 密码强度验证
        let num = 0;
        if ((/[\d]/g).test(this.$password.val())) {
            num++;
        }
        if ((/[a-z]/g).test(this.$password.val())) {
            num++
        }
        if ((/[A-Z]/g).test(this.$password.val())) {
            num++
        }
        if ((/\W/g).test(this.$password.val())) {
            num++
        }
        if (num == 0) {
            
            this.$titlebox.find('span').css({
                background: '#eee',
                color: '#000'
            })
            this.$titlebox.eq(0).find('.baocuo').html('密码不能为空').css('color', 'red');
            this.$passwordsign = false;
            this.$gsyz = false;
        }
        if (num == 1 || num == 2) {
            this.$r.css({
                background: 'red',
                color: '#fff'
            }).siblings('span').css({
                background: '#eee',
                color: '#000'
            })
            this.$titlebox.eq(0).find('.baocuo').html('您输入的密码强度太低').css('color', 'red');
            this.$passwordsign = false;
            this.$gsyz = false;
        }
        if (num == 3) {
            this.$q.css({
                background: '#eee',
                color: '#000'
            }).siblings('span').css({
                background: 'yellow',
                color: '#fff'
            })
            this.$titlebox.eq(0).find('.baocuo').html('您输入的密码强度为中').css('color', 'green');
            // 密码强度验证通过
            this.$gsyz = true;
        }
        if (num == 4) {
            this.$titlebox.find('span').css({
                background: 'green',
                color: '#fff'
            })
            this.$titlebox.eq(0).find('.baocuo').html('您输入的密码强度为强').css('color', 'green');
            // 密码强度验证通过
            this.$gsyz = true;
        }
    }
    // 密码格式验证
    Regis.prototype.pwyzgs = function () {
        this.pwyz = new RegExp(/^[\d\w\W]{7,14}$/g);
        // 密码格式验证
        console.log(this.$gsyz);
        if (this.$gsyz == true) {
            if (this.pwyz.test(this.$password.val())) {
                this.$passwordsign = true;
                this.$gsyz = false;
                // alert(2)
            } else {
                // alert(1)
                this.$titlebox.eq(0).find('.baocuo').html('您输入的密码格式有误').css('color', 'red');
                this.$passwordsign = false;
                this.$gsyz = false;
            }
            this.title(0, this.$passwordsign);
        }
    }
    // 密码确认验证
    Regis.prototype.repwyz = function () {
        if (this.$repassword.val() != '') {
            if (this.$password.val() == this.$repassword.val()) {
                this.$titlebox.eq(1).find('.baocuo').html('正确').css('color', 'green');
                this.$repasswordsign = true;
            } else {
                this.$titlebox.eq(1).find('.baocuo').html('您两次输入的密码不相同').css('color', 'red');
                this.$repasswordsign = false;
            }
        } else {
            this.$titlebox.eq(1).find('.baocuo').html('请再次确认密码').css('color', 'red');
            this.$repasswordsign = false;
        }
    }
    // 最后的提示
    Regis.prototype.title = function (index, name) {
        if (name == false) {
            this.$title1.eq(index).addClass('icon-shanchu2').css('color', 'red').removeClass('icon-weixuanzhongyuanquan');
        } else {
            this.$title1.eq(index).addClass('icon-weixuanzhongyuanquan').css('color', 'green').removeClass('icon-shanchu2');
        }
    }
    new Regis();
}(jQuery))