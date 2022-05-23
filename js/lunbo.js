$(function () {
    //获得当前<ul>
    var $scrollList = $(".scroll-box ul");
    var timer = null;
    //触摸清空定时器
    $scrollList.hover(function () {
        clearInterval(timer);
    },
        function () { //离开启动定时器
            timer = setInterval(function () {
                scrollList($scrollList);
            },
                1000);
        }).trigger("mouseleave"); //自动触发触摸事件
    //滚动动画
    function scrollList(obj) {
        //获得当前<li>的高度
        var scrollHeight = $("ul li:first").height();
        //滚动出一个<li>的高度
            $scrollList.stop().animate({
            marginTop: -scrollHeight
        },
            600,
            function () {
                //动画结束后，将当前<ul>marginTop置为初始值0状态，再将第一个<li>拼接到末尾。
                    $scrollList.css({
                    marginTop: 0
                }).find("li:first").appendTo($scrollList);
            });
    }
});
