var mobileAgent = new Array("iphone", "ipod", "ipad", "android", "mobile", "blackberry", "webos", "incognito", "webmate", "bada", "nokia", "lg", "ucweb", "skyfire", "windows phone", "blackberry", "symbian", "windows ce");
var browser = navigator.userAgent.toLowerCase();
var isMobile = false
for (var i = 0; i < mobileAgent.length; i++) {
	if (browser.indexOf(mobileAgent[i]) != -1) {
		isMobile = true;
		break;
	}
}
$(function () {
	if (isMobile) {
		ShareFun('2019第十届中国数据库技术大会', 'http://dtcc.it168.com/','2019年5月8-10日，第十届中国数据库技术大会（DTCC2019）将在北京隆重召开。','http://dtcc.it168.com/images/banner-baige.jpg');
	}
});
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
var iswx = false;
function WXVerif(debug) {
    if (!iswx) {
        iswx = true;
        $.ajax({
            async: true, cache: false,
            type: "GET", dataType: "json",
            url: "../wxshare/data.php",
            data: { ajax: "share", url: escape(document.location.href) },
            error: function () {
                alert("网络延迟,请您稍后再试！");
            },
            success: function (Json) {
                iswx = false;
                if (Json != "") {
                    wx.config({
                        debug: debug,
                        appId: Json.appId,
                        timestamp: Json.timestamp,
                        // 必填，生成签名的时间戳
                        nonceStr: Json.nonceStr,
                        // 必填，生成签名的随机串
                        signature: Json.signature,
                        // 必填
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'hideMenuItems', 'hideAllNonBaseMenuItem'] // 必填
                    });
                    wx.error(function (res) {
                        if (res.errMsg != 'config:ok') {
                            console.log("签名失效");
                            //WXVerif(true);
                        }
                    });
                }
            }
        });
    }
}
function ShareFun(title, url, desc, img) {
    var shareTitle = title;
    var shortDesc = desc;
    WXVerif(false); //校验签名- 0代表从缓存读取token，第一次调用必须设置为0，因为频繁调用token会被微信禁用。第二个参数true代表开启debug模式
    wx.ready(function () {
        //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        wx.onMenuShareTimeline({
            title: shareTitle,
            // 分享标题
            desc: shortDesc,
            // 分享描述
            link: url,
            // 分享链接
            imgUrl: img,
            // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        //获取“分享给朋友”按钮点击状态及自定义分享内容接口
        wx.onMenuShareAppMessage({
            title: shareTitle,
            // 分享标题
            desc: shortDesc,
            // 分享描述
            link: url,
            // 分享链接
            imgUrl: img,
            // 分享类型,music，video或link，不填默认为link
            dataUrl: shareTitle,
            // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        //获取“分享到QQ”按钮点击状态及自定义分享内容接口
        wx.onMenuShareQQ({
            title: shareTitle,
            // 分享标题
            desc: shortDesc,
            // 分享描述
            link: url,
            // 分享链接
            imgUrl: img,
            // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        //获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
        wx.onMenuShareWeibo({
            title: shareTitle,
            // 分享标题
            desc: shortDesc,
            // 分享描述
            link: url,
            // 分享链接
            imgUrl: img,
            // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareQZone({
            title: shareTitle, // 分享标题
            desc: shortDesc, // 分享描述
            link: url, // 分享链接
            imgUrl: img, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    });
}
