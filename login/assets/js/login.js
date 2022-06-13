(function ($) {
  "use strict";

  var baseUrl = "https://api.stock-plouto.com";
  var areaCode = "001";
  $(document).ready(function () {
    var userInfo = localStorage.getItem("userInfo");
    if (userInfo == null) {
      // $(".loginIn").show()
    }

    $(".loginIn").click(function () {
      // var userInfo = localStorage.getItem("userInfo");
      // console.log("------>", typeof userInfo);
      if (userInfo == null || typeof userInfo == "string") {
        localStorage.removeItem("userInfo");
        window.location.href = "login.html";
      }
    });

    $("#ploutoRegister").click(function () {
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
      code: $("#code").val(),
    };
    if (
      $("#username").val() == "" ||
      $("#phone").val() == "" ||
      $("#email").val() == "" ||
      $("#password").val() == "" ||
      $("#rePassword").val() == "" ||
      $("#code").val() == ""
    ) {
      fnShowAnimate("zoom-in", "Incorrect information");
      return;
    }
    if ($("#password").val() != $("#rePassword").val()) {
      fnShowAnimate("zoom-in", "Incorrect information");
      return;
    }

    var emailRegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var ok = emailRegExp.test($("#email").val());

    if (ok) {
    } else {
      // 输入的格式不符合要求
      fnShowAnimate("zoom-in", "Error email");
      return;
    }

    // console.log("注册参数2", registerUser);
    $.ajax({
      type: "post",
      url: `${baseUrl}/auth/register`,
      data: registerUser,
      dataType: "json",
      success: function (res) {
        if (res.code == 0) {
          window.location.href = "login.html";
        } else {
          fnShowAnimate("zoom-in", res.msg);
        }
        // console.log("======>", res);
        // window.location.href = "login.html";
      },
    });
  });

  $("#loginBtn").click(function () {
    if ($("#username").val() == "" || $("#password").val() == "") {
      fnShowAnimate("zoom-in", "Incorrect information");
      return;
    }
    var user = {
      username: $("#username").val(),
      password: $("#password").val(),
    };
    // console.log("登录参数", user);

    $.ajax({
      type: "post",
      url: `${baseUrl}/auth/login`,
      data: user,
      dataType: "json",
      success: function (res) {
        // console.log("登录成功了", res);
        if (res.code == 1) {
          fnShowAnimate("zoom-in", res.msg);
        } else {
          var data = JSON.stringify(res.data);
          localStorage.setItem("userInfo", data || null);
          window.location.href = "index.html";
        }
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
      if (e.cancel) {
        tzAlert.close();
        e.ctx.close();
      } else if (e.confirm) {
      }
    },
    onMounted: function () {},
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
  //弹窗 https://www.jq22.com/jquery-info24247
  function showMsg(text, icon, hideAfter) {
    if (heading == undefined) {
      var heading = "Title";
    }
    $.toast({
      text: text, //消息提示框的内容。
      heading: heading, //消息提示框的标题。
      icon: icon, //消息提示框的图标样式。
      showHideTransition: "fade", //消息提示框的动画效果。可取值：plain，fade，slide。
      allowToastClose: true, //是否显示关闭按钮。(true 显示，false 不显示)
      hideAfter: hideAfter, //设置为false则消息提示框不自动关闭.设置为一个数值则在指定的毫秒之后自动关闭消息提框
      stack: 1, //消息栈。同时允许的提示框数量
      position: "top-center", //消息提示框的位置：bottom-left, bottom-right,bottom-center,top-left,top-right,top-center,mid-center。
      textAlign: "left", //文本对齐：left, right, center。
      loader: true, //是否显示加载条
      //bgColor: '#FF1356',//背景颜色。
      //textColor: '#eee',//文字颜色。
      loaderBg: "#ffffff", //加载条的背景颜色。

      beforeShow: function () {
        alert("The toast is about to appear");
      },

      afterShown: function () {
        alert("Toast has appeared.");
      },

      beforeHide: function () {
        alert("Toast is about to hide.");
      },

      afterHidden: function () {
        alert("Toast has been hidden.");
      },
    });
  }

  var time = 60;
  function getCodes(obj) {
    var phones = $("#phone").val();
    if (phones == "") {
      obj.attr("disabled", false);
      obj.html("Get Code");
      fnShowAnimate("zoom-in", "Telephone error");
      return;
    }
    $.ajax({
      type: "get",
      url: `${baseUrl}/noauth/getcode?phone=${phones}&areacode=${areaCode}`,
      dataType: "json",
      success: function (res) {},
    });
  }

  $("#s1").change(function () {
    areaCode = $("#s1  option:selected").text();
  });

  $(".btn_yzmbutton").click(function () {
    var obj = $(".btn_yzmbutton");
    getCodes(obj);
    countdown(obj);
  });

  function countdown(obj) {
    if (time == 0) {
      obj.attr("disabled", false);
      obj.html("Get Code");
      time = 60;
      return;
    } else {
      obj.attr("disabled", true);
      obj.html(time + "s");
      time--;
    }
    setTimeout(function () {
      countdown(obj);
    }, 1000);
  }
  var goods_id = "";
  $(document).on("click", "#pay0", function () {
    goods_id = $("#pay0").data("id");
    createdOrder(goods_id);
  });
  $(document).on("click", "#pay01", function () {
    goods_id = $("#pay01").data("id");
    createdOrder(goods_id);
  });
  $(document).on("click", "#pay10", function () {
    goods_id = $("#pay10").data("id");
    createdOrder(goods_id);
  });
  $(document).on("click", "#pay11", function () {
    goods_id = $("#pay11").data("id");
    createdOrder(goods_id);
  });
  $(document).on("click", "#pay12", function () {
    goods_id = $("#pay12").data("id");
    createdOrder(goods_id);
  });
  function createdOrder(goods_id) {
    var tokens = JSON.parse(localStorage.getItem("userInfo")) || "";

    $.ajax({
      type: "get",
      url: `${baseUrl}/order/create?paytype=paypal&goods_id=${goods_id}`,
      dataType: "json",
      headers: {
        Authorization: `Bearer ${tokens.token}`,
      },
      success: function (res) {
        console.log("创建订单", res);
      },
    });
  }

  function goodList(id) {
    var tokens = JSON.parse(localStorage.getItem("userInfo")) || "";

    $.ajax({
      type: "get",
      url: `${baseUrl}/user/goods/list?type=${id}`,
      dataType: "json",
      headers: {
        Authorization: `Bearer ${tokens.token}`,
      },
      success: function (res) {
        if (res.code == 0) {
          if (id == 0) {
            $.each(res.data.list, function (index, data) {
              var typesd = "M";
              if (data.time == 10) {
                typesd = "M";
              } else if (data.time == 13) {
                typesd = "Q";
              } else if (data.time == 20) {
                typesd = "Y";
              } else if (data.time == 7) {
                typesd = "Week";
              }

              var op = `<div class="displaytop-list displaytopK" data-id="${data.ID}" id="pay0"><span  style="display:none">${data.ID}</span><div>${data.title}</div><div>$${data.cur_price} /${typesd}</div></div>`;

              $("#payList").append(op);
            });
          } else if (id == 2) {
            $.each(res.data.list, function (index, data) {
              var types = "M";
              if (data.time == 10) {
                types = "M";
              } else if (data.time == 13) {
                types = "Q";
              } else if (data.time == 20) {
                types = "Y";
              } else if (data.time == 7) {
                types = "Week";
              }
              var op20 = `<div class="displaytop-list displaytopK" data-id="${data.ID}"  id="pay01"><div>${data.title}</div><div>$${data.cur_price} /${types}</div></div>`;

              $("#payList").append(op20);
            });
          } else if (id == 1) {
            $.each(res.data.list, function (index, data) {
              var type = "M";
              if (data.time == 10) {
                type = "M";
              } else if (data.time == 13) {
                type = "Q";
              } else if (data.time == 20) {
                type = "Y";
              } else if (data.time == 7) {
                type = "Week";
              }
              var op21 = `<div class="displaytop-list displaytopK" data-id="${data.ID}"  id="pay1${index}"><div>${data.title}</div><div>$${data.cur_price} /${type}</div></div>`;

              $("#payList").append(op21);
            });
          }
        } else if (res.code == 2) {
          localStorage.removeItem("userInfo");
          window.location.href = "login.html";
        }
      },
    });
  }

  $("#toPayment1").click(function () {
    window.location.href = "pay.html?id=0";
  });
  $("#toPayment2").click(function () {
    window.location.href = "pay.html?id=2";
  });
  $("#toPayment3").click(function () {
    window.location.href = "pay.html?id=1";
  });

  var ids = getUrlParam("id") || "no";
  if (ids == 0) {
    goodList(0);
  } else if (ids == 2) {
    goodList(2);
  } else if (ids == 1) {
    goodList(1);
  }

  function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);

    return null;
  }
})(jQuery);
