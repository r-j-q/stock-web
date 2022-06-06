(function ($) {
  "use strict";
  var baseUrl = "https://api.stock-plouto.com";
  $(document).ready(function () {
    $("#ploutoRegister").click(function () {
      var userInfo = localStorage.getItem("userInfo");
      if (userInfo == null) {
        window.location.href = "register.html";
      }  
    });
  });
  $("#registerBtn").click(function () {
    var registerUser = {
      username: $("#username").val(),
      password: $("#password").val(),
      rePassword: $("#rePassword").val(),
      email: $("#email").val(),
      phone: $("#phone").val(),
      age: parseInt($("#age").val()),
    };
    if ($("#username").val() == "" || $("#phone").val()) {
      fnShowAnimate("zoom-in", "Incorrect information");
      return;
    }
     
    $.ajax({
      type: "post",
      url: `${baseUrl}/auth/register`,
      data: registerUser,
      dataType: "json",
      success: function (res) {
        window.location.href = "index.html";
      },
    });
  });

  $("#loginBtn").click(function () {
    if ($("#username").val() == "" || $("#password").val()) {
      fnShowAnimate("zoom-in", "Incorrect information");
      return;
    }
    var user = {
      username: $("#username").val(),
      password: $("#password").val(),
    };
    $.ajax({
      type: "post",
      url: `${baseUrl}/auth/login`,
      data: user,
      dataType: "json",
      success: function (res) {
        console.log("")
        var data = JSON.stringify(res.data);
        localStorage.setItem("userInfo", data || null);
        window.location.href = "index.html";
      },
    });
  });

  let _tempPosition = "center";

  // 第三步：初始化插件
  const tzAlert = new TzAlert({
    id: "alert1",
    center: true, // 内容居中
    useEscClose: false,
    useInitShow: false, // 实例化完成直接显示
    useMaskClose: true,
    title: {
      html: "",
      color: "#ff80ab",
      fontSize: "18px",
    },
    mask: {
      use: true,
      background: "rgba(0,0,0,.6)",
    },
    //  html: 默认双击内容部分即可复制
    tips: {
      html: "",
    },
    content: {
      html: "message",
    },
    onEvents: function (e) {
      var ctx = e.ctx,
        cancel = e.cancel,
        confirm = e.confirm;
      console.log(e);
      if (e.cancel) {
        tzAlert.close();
        e.ctx.close();
      } else if (e.confirm) {
      }
    },
    onMounted: function () {
      //   console.log('默认初始化完成钩子')
    },
  });

  // 动画显示https://www.jq22.com/jquery-info24247
  function fnShowAnimate(animate, content) {
    tzAlert.open({
      position: _tempPosition,
      animate: animate,
      maskClose: true,
      width: "300px",
      mask: {
        use: true,
        background: "rgba(0,0,0,.6)",
      },
      cancel: {
        use: false,
      },
      confirm: {
        use: false,
      },
      content: {
        html: content,
      },
    });
  }
})(jQuery);
