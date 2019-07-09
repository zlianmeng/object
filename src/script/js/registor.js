; (function ($) {
    function Regis() {
        this.$username = $('.username');
        this.$nametitle = $('.nametitle');
        this.$password=$('.password');
        this.$repassword=$('.repeat-password');
        this.$tpassword=$('.title-password');
        this.$trepassword=$('.title-repeat-password');
        this.pwyz=new RegExp('[0-9a-z]');
        this.init();
    }
    Regis.prototype.init = function () {
        let that = this;
        // 用户名查重
        this.$username.on('blur', function () {
            that.findrepeat();
        });
        // 表单验证
        this.$password.on('input',function(){
            
        })
    }
    // 利用ajax查重用户名
    Regis.prototype.findrepeat = function () {
        let that = this;
        $.ajax({
            type:'get',
            url: `http://10.31.158.21:8088/tianmao/object/php/registor-repeat.php?username=${that.$username.val()}`,
        }).done(function (sign) {
            if (!sign) {
                that.$nametitle.html('用户名可用');
                that.$nametitle.css('color', 'green');
            } else {
                that.$nametitle.html('用户名已注册');
                that.$nametitle.css('color', 'red');
            }
        })
    }
    // 表单验证
    Regis.prototype.filter=function(){
        
    }
    new Regis();
}(jQuery))