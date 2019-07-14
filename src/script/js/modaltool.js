/*
API:
1、必要的参数，btnname:
btnname：在使用插件时要设置触发按钮的class名或者id名，否无插件无效；

2、设置模态框样式：
modalsheet：属性为是否自定义模态框样式，true代表需要自定义模态框样式，false代表使用插件默认样式；
当modalsheet属性值为true时，需要设置modalname的值
modalname：在设置了modalsheet的属性值为true时，必须利用modalname属性上传自定义的模态框的id名或者class名；

3、模态框出现的初始位置：
startposition:{boxcenter:模态框出现在视口的中心位置，默认值；}
starttop:value：设置相对于视口中模态框出现时的top值；单位为像素，不支持自定义单位；
/'top':垂直方向置于视口的顶端；/'middle':垂直方向置于视口中间；/'bottom':垂直方向置于视口底部；/默认状态为居中显示；
startleft:value:设置相对于视口中模态框出现时的top值；单位为像素，不支持自定义单位；
/'left':垂直方向置于视口的左侧；/'center':垂直方向置于视口中间；/'right':垂直方向置于视口右侧；/默认状态为居中显示；/

4、设置是否需要拖动；
drag:'false'/false:不需要拖动;/默认值为'true'/true:需要拖动；

5、设置是否需要随视口大小而改变位置；
modalresize:true:模态框的位置会随着视口大小的变化而变化；true为默认值/false：模态框的位置不会发生改变；
*/

// window.onload = function () {

;!function () {

    function Modal(option) {
        this.option = option;
        this.setting = {
            modalsheet: false,
            modalname: '#window-tool',
            startposition: 'boxcenter',
            starttop: 'middle',
            startleft: 'center',
            drag: true,
            modalresize: true,
            clickhide: false,



        };
        Object.assign(this.setting, this.option);
        this.btn = document.querySelector(`${this.setting.btnname}`);
        this.resetsheet();
        if (this.setting.modalsheet === true || this.setting.modalsheet === 'true') {
            this.oBox = document.querySelector(`${this.setting.modalname}`);
            try {
                this.oBox.style.position = 'absolute';
                this.oBox.style.display = 'none';
                this.oBox.success = "success";
                console.log(this.oBox.success);
            } catch (e) {
                this.resetsheet();
                document.body.appendChild(this.oBox);
                this.oBox = document.querySelector('#window-tool');
            }
        } else {
            document.body.appendChild(this.oBox);
            this.oBox = document.querySelector('#window-tool');

        }

        this.init();

    }


    Modal.prototype.init = function () {//总调函数
        let that = this;
        this.btn.onclick = function (ev) {//模态框出现的点击事件
            var ev = ev || window.event;
            if (ev.stopPropagation) {
                ev.stopPropagation();
            } else {
                ev.cancelBubble = true;
            }
            that.oBox.style.display = "block";
            that.showbox();
        }
        if (this.setting.modalresize != false && this.setting.modalresize != 'false') {
            window.onresize = function () {
                that.showbox();
            }
        }

        this.oBox.onclick = function (ev) {//取消冒泡带来的影响
            if (ev.stopPropagation) {
                ev.stopPropagation();
            } else {
                ev.cancelBubble = true;
            }
        }
        if (this.setting.clickhide === true || this.setting.clickhide === "true") {
            document.onclick = function () {//模态框的隐藏事件
                that.hidebox();
            }
        };

        this.oBox.onmouseover = function () {//设置鼠标样式
            that.oBox.style.cursor = "move";
        }
        //模态框拖动效果
        if (this.setting.drag === 'false' || this.setting.drag === false) { } else {
            this.oBox.onmousedown = function (ev) {
                var ev = ev || window.event;
                that.mousedown(ev);
                document.onmousemove = function (ev) {
                    var ev = ev || window.event;
                    that.mousemove(ev);
                }
            }
            document.onmouseup = function () {
                that.mouseup();
            }
        }

    }

    Modal.prototype.resetsheet = function () {
        this.oBox = document.createElement('div');
        this.oBox.id = 'window-tool';
        this.oBox.style.cssText = `
            max-width:1000px;
            max-height:500px;
            position:absolute;
            background:#eee;
            border:1px solid #ccc;
            padding:40px;
            display:none`;
        this.resetcontent();
    }
    Modal.prototype.resetcontent = function () {
        this.bigbox = document.createElement('div');
        this.title = document.createElement('p');
        this.contentbox = document.createElement('div');
        this.oBox.appendChild(this.bigbox);
        this.bigbox.appendChild(this.title);
        this.bigbox.appendChild(this.contentbox);
        this.title.style.cssText = `
                width:300px;
                height:30px;
                font-size:20px;
                font-weight:900;
                text-align:center;
                line-height:30px;
            `;
        this.title.innerHTML = '标题';
        this.contentbox.innerHTML = `
                <p><label style="width:80px;display:inline-block;">用户名：</label><input type="text" name="username"></p>
                <p><label style="width:80px;display:inline-block;">密码：</label><input type="password" name="password"></p>
                <p style="display:inline-block;">
                    <input style="width:149px;height:30px;font-size:16px;font-weight:900;line-height:30px;" type="button" value="登陆">
                </p>
                <p style="display:inline-block;">
                    <input style="width:149px;height:30px;font-size:16px;font-weight:900;line-height:30px;" type="button" value="注册">
                </p>
            `;

        this.bigbox.onmousedown = function (ev) {//取消冒泡带来的影响
            if (ev.stopPropagation) {
                ev.stopPropagation();
            } else {
                ev.cancelBubble = true;
            }
        }
        this.bigbox.onmouseover = function (ev) {//取消冒泡带来的影响
            this.style.cursor = "auto";
            if (ev.stopPropagation) {
                ev.stopPropagation();
            } else {
                ev.cancelBubble = true;
            }
        }
    }
    Modal.prototype.showbox = function () {//模态框的位置
        this.aligncenter = (document.documentElement.clientWidth - this.oBox.offsetWidth) / 2 + 'px';
        this.alignright = (document.documentElement.clientWidth - this.oBox.offsetWidth) + 'px';
        this.verticalmiddle = (document.documentElement.clientHeight - this.oBox.offsetHeight) / 2 + 'px';
        this.verticalbottom = (document.documentElement.clientHeight - this.oBox.offsetHeight) + 'px';
        if (this.setting.startleft || this.setting.starttop) {
            if (!isNaN(parseFloat(this.setting.starttop))) {
                this.oBox.style.top = parseFloat(this.setting.starttop) + 'px';
            } else {
                try {
                    switch (this.setting.starttop) {
                        case "top": this.oBox.style.top = 0; break;
                        case "middle": this.oBox.style.top = this.verticalmiddle; break;
                        case "bottom": this.oBox.style.top = this.verticalbottom; break;
                        default: throw new Error('starttop\'s value is undefine');
                    };
                } catch (e) {
                    console.log(e)
                    this.oBox.style.top = this.verticalmiddle;
                }
            }
            if (!isNaN(parseFloat(this.setting.startleft))) {
                this.oBox.style.left = parseFloat(this.setting.startleft) + 'px';
            } else {
                try {
                    switch (this.setting.startleft) {
                        case "left": this.oBox.style.left = 0; break;
                        case "center": this.oBox.style.left = this.aligncenter; break;
                        case "right": this.oBox.style.left = this.alignright; break;
                        default: throw new Error('startleft\'s value is undefine');
                    }
                } catch (e) {
                    console.log(e)
                    this.oBox.style.left = this.aligncenter;
                }
            }
        } else if (this.startposition === 'boxcenter' || !this.setting.startleft || !this.setting.starttop) {
            this.oBox.style.top = this.verticalmiddle;
            this.oBox.style.left = this.aligncenter;
        }

    }
    Modal.prototype.hidebox = function () {//模态框的隐藏
        this.oBox.style.display = "none";
    }
    Modal.prototype.mousedown = function (ev) {//鼠标按下事件
        this.shortx = ev.offsetX;
        this.shorty = ev.offsetY;
    }
    Modal.prototype.mousemove = function (ev) {//鼠标移动事件
        this.oBox.style.top = (ev.clientY - this.shorty) + 'px';
        this.oBox.style.left = (ev.clientX - this.shortx) + 'px';
        if (this.oBox.offsetTop >= document.documentElement.clientHeight - this.oBox.offsetHeight) {
            this.oBox.style.top = document.documentElement.clientHeight - this.oBox.offsetHeight + 'px';
        } else if (this.oBox.offsetTop <= 0) {
            this.oBox.style.top = 0;
        }
        if (this.oBox.offsetLeft >= document.documentElement.clientWidth - this.oBox.offsetWidth) {
            this.oBox.style.left = document.documentElement.clientWidth - this.oBox.offsetWidth + 'px';
        } else if (this.oBox.offsetLeft <= 0) {
            this.oBox.style.left = 0;
        }
    }
    Modal.prototype.mouseup = function () {//鼠标抬起事件
        document.onmousemove = null;
        this.oBox.style.cursor = "auto";
    }



    window.Modal = Modal;
}()
// }
