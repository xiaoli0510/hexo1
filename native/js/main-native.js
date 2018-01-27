/**
 * Author: XiaoLi
 * Desc：使用原生js渲染页面
 * GitHub: https://github.com/xiaoli0510
 */

var native = {
    init: function () {

        this.rendPage();

        this.bindEvent("on");
    },
    rendPage: function () {

        this.rendHead();

        this.rendUserInfo();

        this.rendProjectInfo();

        this.rendBlogInfo();

        this.rendAsideInfo();

        this.rendFooter();
    },
    bindEvent: function (method) {
        if (method == "on" || method == "off") {

        }
    },
    rendHead: function () {

    },
    rendUserInfo: function () {
        this.get("../data/userInfo.json", function (res) {
            var html = native.buildUserBox(JSON.parse(res));
            document.getElementsByClassName("body-header")[0].innerHTML = html;
        }, function (error) {
            console.log(error);
        });
    },
    rendProjectInfo: function () {
        this.get("../data/projectInfo.json", function (res) {
            var html = native.buildProjectBox(JSON.parse(res));
            document.getElementsByClassName("main-project")[0].innerHTML = html;
        }, function (error) {
            console.log(error);
        });
    },
    rendBlogInfo: function () {
        this.get("../data/blogInfo.json", function (res) {
            var html = native.buildBlogBox(JSON.parse(res));
            document.getElementsByClassName("main-blog")[0].innerHTML = html;
        }, function (error) {
            console.log(error);
        });
    },
    rendAsideInfo: function () {
        this.get("../data/asideInfo.json", function (res) {
            var html = native.buildAsideBox(JSON.parse(res));
            document.getElementsByClassName("body-aside")[0].innerHTML = html;
        }, function (error) {
            console.log(error);
        });
    },
    rendFooter: function () {
        this.get("../data/footerInfo.json", function (res) {
            var html = native.buildFooterBox(JSON.parse(res));
            document.getElementsByClassName("body-footer")[0].innerHTML = html;
        }, function (error) {
            console.log(error);
        });
    },
    buildUserBox: function (data) {
        var userPhotoHtml = "<img class='header-user_photo' src= '" + data.user_photo + "' alt='photo'/>";
        var userDescHtml = "<div class='header-user_info'>" +
            "<hgroup>" +
            "<h1 class='header-user_name'>" + data.user_name + "</h1>" +
            "<h5 class='header-user_desc'>" + data.user_desc + "</h5>" +
            "</hgroup>" +
            "</div>";
        var userNavHtml = "<nav class='header-nav'><ul class='nav-ul'>";
        for (var i = 0, len = data.user_nav.length; i < len; i++) {
            userNavHtml += "<li class='nav-li'><a href='" + data.user_nav[i].link + "'>" + data.user_nav[i].name + "</a></li>";
        }
        userNavHtml += "</ul></nav>";
        return userPhotoHtml + userDescHtml + userNavHtml;
    },
    buildAsideBox: function (data) {
        var asideHtml = "<div class='aside-code'>" +
            "<img class='aside-code-img' src='" + data.code_img + "'/>" +
            "<p class='aside-code-lable'>" + data.lable + "</p>" +
            "</div>"
        return asideHtml;
    },
    buildProjectBox: function (data) {
        var projectHtml = "<h2>开源项目</h2><ul>";
        for (var i = 0, len = data.project_list.length; i < len; i++) {
            projectHtml += "<li>" +
                "<section>" +
                "<a href='" + data.project_list[i].link + "'>" +
                "<h2 class='overflow_omit'>" + data.project_list[i].title + "</h2>" +
                "<div class='overflow_omit'>" + data.project_list[i].desc + "</div>" +
                "</a>" +
                "</section>" +
                "</li>"
        }
        projectHtml += "</ul>";
        return projectHtml;
    },
    buildBlogBox: function (data) {
        var blogHtml = "<h2>博客文章</h2><ul>";
        for (var i = 0, len = data.article_list.length; i < len; i++) {
            blogHtml += "<li>" +
                "<section>" +
                "<a href='" + data.article_list[i].link + "'>" +
                "<h2 class='overflow_omit'>" + data.article_list[i].title + "</h2>" +
                "<div class='overflow_omit'>" + data.article_list[i].desc + " </div>" +
                "</a>" +
                "</section>" +
                "</li>"
        }
        blogHtml += "</ul><h3 class='main-view_more'><a href='" + data.blog_address + "'>查看更多</a></h3>";
        return blogHtml;
    },
    buildFooterBox: function (data) {
        var friendLinksHtml = "<aside class='footer-aside_link'><a>友情链接：</a>";
        for (var i = 0, len = data.friend_links.length; i < len; i++) {
            friendLinksHtml += "<a href='" + data.friend_links[i].link + "'>" + data.friend_links[i].name + "</a>";
            if (i != len - 1) {
                friendLinksHtml += "<span>|</span>";
            }
        }
        friendLinksHtml += "</aside>";
        var copyrightHtml = "<footer><p class='footer-copyright'>Copyright &copy; " + data.copyright + "</p></footer>";
        return friendLinksHtml + copyrightHtml;
    },
    rend: function (data) {

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
    ajax: function (options) {
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
    formatParams: function (data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        arr.push(("v=" + Math.random()).replace(".", ""));
        return arr.join("&");
    }
}

window.onload = function () {
    native.init();
}