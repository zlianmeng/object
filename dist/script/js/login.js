"use strict";!function(t){function e(){this.$username=t(".username"),this.$password=t(".password"),this.$place=t(".place"),this.$btn=t(".btnbox input"),this.$tishi=t("#tishi"),this.timer=null,this.init()}e.prototype.init=function(){var t=this;this.$btn.on("click",function(){t.ajax()}),new Modal({btnname:".btn",modalsheet:!0,modalname:"#tishi",modalresize:!1,drag:!1,starttop:300})},e.prototype.ajax=function(){var e=this;t.ajax({async:!1,url:"http://10.31.158.21:8088/tianmao/object/php/login.php",type:"post",data:{username:e.$username.val(),password:e.$password.val()}}).done(function(t){t?(flag=!0,e.setcookie("username",e.$username.val(),1),location.href="http://10.31.158.21:8088/tianmao/object/src/index.html"):(new Modal({btnname:".btn",modalsheet:!0,modalname:"#tishi",modalresize:!1,drag:!1,starttop:300}),e.timer=setTimeout(function(){e.$tishi.css("display","none"),clearTimeout(e.timer)},1e3))})},e.prototype.setcookie=function(t,e,a){var i=new Date;i.setDate(i.getDate()+a),document.cookie=t+"="+e+";expires="+i},new e}(jQuery);