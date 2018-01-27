/**
 * Author: XiaoLi
 * Desc：使用原生js渲染页面
 * GitHub: https://github.com/xiaoli0510
 */

var native = {
    init:function(){
        
        this.rendPage();

        this.bindEvent("on");
    },
    rendPage:function(){

        this.rendHead();

        this.rendUserInfo();

        this.rendProjectInfo();

        this.rendBlogInfo();

        this.rendAsideInfo();

        this.rendFooter();
    },
    bindEvent:function(method){
        if(method == "on" || method == "off"){
            
        }
    },
    rendHead:function(){

    },
    rendUserInfo:function(){

    },
    rendProjectInfo:function(){

    },
    rendBlogInfo:function(){

    },
    rendAsideInfo:function(){

    },
    rendFooter:function(){

    },
    rend:function(data){
        this.get(data.dataSrc,function(res){
            // console.log(res);
            var html = template(data.tplId,JSON.parse(res));
            document.getElementById(data.containerId).innerHTML = html;
        },function(error){
            console.log(error);
        });
    },
    get: function (url, sf, ef, p) {  
        this.ajax({  
            url: url,  
            async: true,  
            method: 'GET',  
            contentType: 'application/x-www-form-urlencoded',  
            crossDomain: true,  
            success: function (response, xml) {
                if ('function' == typeof sf)  
                    sf(response, p);  
            },  
            fail: function (status) {
                if ('function' == typeof ef)  
                    ef(status, p);  
            }  
        });  
    },
    ajax:function(options) {
        options = options || {};
        options.type = (options.type || "GET").toUpperCase();
        options.dataType = options.dataType || "json";
        var params = this.formatParams(options.data);

        //创建 - 非IE6 - 第一步
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else { //IE6及其以下版本浏览器
            var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        //接收 - 第三步
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                if (status >= 200 && status < 300) {
                    options.success && options.success(xhr.responseText, xhr.responseXML);
                } else {
                    options.fail && options.fail(status);
                }
            }
        }

        //连接 和 发送 - 第二步
        if (options.type == "GET") {
            xhr.open("GET", options.url + "?" + params, true);
            xhr.send(null);
        } else if (options.type == "POST") {
            xhr.open("POST", options.url, true);
            //设置表单提交时的内容类型
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(params);
        }
    },
    //格式化参数
    formatParams:function (data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        arr.push(("v=" + Math.random()).replace(".",""));
        return arr.join("&");
    }
}

window.onload = function(){
    native.init();
}