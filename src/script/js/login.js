; (function ($) {
    function Login() {
        this.$username = $('.username');
        this.$password = $('.password');
        this.$place = $('.place');
        this.$btn = $('.btnbox input');
        this.$tishi = $('#tishi');
        this.timer = null;
        this.init();
    }
    // 总调函数
    Login.prototype.init = function () {
        let that = this;
        this.$btn.on('click', function () {
            that.ajax();

        })
        new Modal({
            btnname: '.btn',
            modalsheet: true,
            modalname: '#tishi',
            modalresize: false,
            drag: false,
            starttop: 300
        });
    }
    //请求匹配数据库
    Login.prototype.ajax = function () {
        let that = this;
        $.ajax({
            async:false,
            url: "http://localhost:8088/tianmao/object/php/login.php",
            type: 'post',
            data: {
                username: that.$username.val(),
                password: that.$password.val()
            }
        }).done(function (data) {
            if (data) {
                flag = true;
                that.setcookie('username', that.$username.val(), 1);
                location.href = 'http://localhost:8088/tianmao/object/src/tianmao.html';
            } else {
                new Modal({
                    btnname: '.btn',
                    modalsheet: true,
                    modalname: '#tishi',
                    modalresize: false,
                    drag: false,
                    starttop: 300
                });
                that.timer = setTimeout(function () {
                    that.$tishi.css('display', 'none');
                    clearTimeout(that.timer);
                }, 1000);
            }
        })
    }
    // 封装设置cookie的函数
    Login.prototype.setcookie = function (key, value, time) {
        let date = new Date();
        date.setDate(date.getDate() + time);
        document.cookie = `${key}=${value};expires=${date}`
    }
    new Login();
}(jQuery))

