(function ($) {
  "use strict";

  var baseUrl = "https://api.stock-plouto.com";
  // var baseUrl = "http://192.168.1.20:8080";
  var areaCode = "001";
  $(document).ready(function () {
    var userInfo = localStorage.getItem("userInfo");
    if (userInfo == null) {
      // $(".loginIn").show()
    }

    // $(".loginIn").click(function () {
    //   // var userInfo = localStorage.getItem("userInfo");
    //   // console.log("------>", typeof userInfo);
    //   if (userInfo == null || typeof userInfo == "string") {
    //     localStorage.removeItem("userInfo");
    //     window.location.href = "login.html";
    //   }
    // });

    // $("#ploutoRegister").click(function () {
    //   if (userInfo == null) {
    //     window.location.href = "register.html";
    //   }
    // });
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
 

  

 

 
  $("#paypal-button-container").hide();
  var goods_id = "",
    price = 0;
  $(document).on("click", "#pay0", function () {
    goods_id = $("#pay0").data("id");
    price = $("#pay0").data("price");
    $("#paypal-button-container").show();
    // createdOrder()
    // createdOrders(price);
  });
  $(document).on("click", "#pay01", function () {
    goods_id = $("#pay01").data("id");
    price = $("#pay01").data("price");
    $("#paypal-button-container").show();

    // createdOrders(price);
  });
  $(document).on("click", "#pay10", function () {
    goods_id = $("#pay10").data("id");
    price = $("#pay10").data("price");
    $("#paypal-button-container").show();

    // createdOrders(price);
  });
  $(document).on("click", "#pay11", function () {
    goods_id = $("#pay11").data("id");
    price = $("#pay11").data("price");
    $("#paypal-button-container").show();

    // createdOrders(price);
  });
  $(document).on("click", "#pay12", function () {
    goods_id = $("#pay12").data("id");
    price = $("#pay12").data("price");
    $("#paypal-button-container").show();

    // createdOrders(price);
  });
  function createdOrder(goods_id, transactionid) {
    var tokens = JSON.parse(localStorage.getItem("userInfo")) || "";

    $.ajax({
      type: "get",
      url: `${baseUrl}/user/pay/jscallback?paytype=paypal&goods_id=${goods_id}&transactionid=${transactionid}`,
      dataType: "json",
      headers: {
        Authorization: `Bearer ${tokens.token}`,
      },
      success: function (res) {
        console.log("创建订单", res);
        if(res.code == 0){
          // fnShowAnimate("zoom-in", res.msg);
          window.location.href =  "index.html"
        }
        

        //  
      },
    });
  }
 
 

  // }

  // 支付模块

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

              var op = `<div class="displaytop-list displaytopK" data-id="${
                data.ID
              }" data-price="${
                data.cur_price
              }" id="pay0"><span  style="display:none">${data.ID}</span><div>${
                data.title
              }</div><div>$${data.cur_price / 100} /${typesd}</div></div>`;

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
              var op20 = `<div class="displaytop-list displaytopK" data-id="${
                data.ID
              }"   data-price="${data.cur_price}" id="pay01"><div>${
                data.title
              }</div><div>$${data.cur_price / 100} /${types}</div></div>`;

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
              var op21 = `<div class="displaytop-list displaytopK" data-id="${
                data.ID
              }"  data-price="${data.cur_price}"  id="pay1${index}"><div>${
                data.title
              }</div><div>$${data.cur_price / 100} /${type}</div></div>`;

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


  paypal
    .Buttons({ 
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: price / 100,
              },
            },
          ],
        });
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then(function (orderData) {
          console.log("=goods_id===>", goods_id);
          console.log(
            "Capture result====》",
            orderData,
            JSON.stringify(orderData, null, 2)
          );
          const transaction = orderData.purchase_units[0].payments.captures[0];
          createdOrder(goods_id, transaction.id);
          // alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
        });
      },
    })
    .render("#paypal-button-container");
})(jQuery);
