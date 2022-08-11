(function ($) {
  "use strict";
  var baseUrl = "https://api.stock-plouto.com";
  // var baseUrl =   "http://192.168.1.11:8080"

  var tokens = JSON.parse(localStorage.getItem("userInfo")) || "";
  // const stripe = Stripe("pk_test_51L8IpsIzNzEUKhl8gMaHzwlkHlFW69ShIbjRVASnUjkZUDyVBb5NX9hzrnRP8rAo5x3F5ILLOl74nsusyTB3FBzf00bzY656Es");
  
  //下面是正式环境
  const stripe = Stripe("pk_live_51L8IpsIzNzEUKhl8uXHCShyfEXTUAcetBsKbaG690FCXWGcBlFWoxbRdqsKjvKjh2k1WSkRKXYhRl3iZVqLjwZSI00fmzBBSTm");
  const items = [{ id: "prod_LxQP3nkuvcykMZ" }];
 
 let elements;
 
//  initialize();
//  checkStatus();
 
//  document
//    .querySelector("#payment-form")
//    .addEventListener("submit", handleSubmit);
  
 async function initialize(goods_id) {
  console.log("==goods_id===>",goods_id)
  // http://192.168.1.24:8080/noauth/create-payment-intent?id=1
  //  const response = await fetch("http://192.168.1.24:8080/user/order/create?paytype=stripe&goods_id=3&payway=0", {
    const response = await fetch(`${baseUrl}/user/order/create?paytype=stripe&goods_id=${goods_id}&payway=0`, {
     method: "get",
     headers: { "Content-Type": "application/json" ,
     Authorization: `Bearer ${tokens.token}`,
    
    },
    //  body: JSON.stringify({ items }),
   }) 
   const { clientSecret } = await response.json();
 
   const appearance = {
     theme: 'stripe',
   };
   console.log("====>",clientSecret)
   elements = stripe.elements({ appearance, clientSecret });
 
   const paymentElement = elements.create("payment");
   paymentElement.mount("#payment-element");
 }
 
 async function handleSubmit(e) {
   e.preventDefault();
   setLoading(true);
 
   const { error } = await stripe.confirmPayment({
     elements,
     confirmParams: { 
       return_url: `${baseUrl}/pay/callbackstripe`,
     },
   });
  
   if (error.type === "card_error" || error.type === "validation_error") {
     showMessage(error.message);
   } else {
     showMessage("An unexpected error occurred.");
   }
 
   setLoading(false);
 }
  
 async function checkStatus() {
   const clientSecret = new URLSearchParams(window.location.search).get(
     "payment_intent_client_secret"
   );
 
   if (!clientSecret) {
     return;
   }
 
   const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
 
   switch (paymentIntent.status) {
     case "succeeded":
       showMessage("Payment succeeded!");
       break;
     case "processing":
       showMessage("Your payment is processing.");
       break;
     case "requires_payment_method":
       showMessage("Your payment was not successful, please try again.");
       break;
     default:
       showMessage("Something went wrong.");
       break;
   }
 }
  
 
 function showMessage(messageText) {
   const messageContainer = document.querySelector("#payment-message");
 
   messageContainer.classList.remove("hidden");
   messageContainer.textContent = messageText;
 
   setTimeout(function () {
     messageContainer.classList.add("hidden");
     messageText.textContent = "";
   }, 4000);
 }
  
 function setLoading(isLoading) {
   if (isLoading) { 
     document.querySelector("#submit").disabled = true;
     document.querySelector("#spinner").classList.remove("hidden");
     document.querySelector("#button-text").classList.add("hidden");
   } else {
     document.querySelector("#submit").disabled = false;
     document.querySelector("#spinner").classList.add("hidden");
     document.querySelector("#button-text").classList.remove("hidden");
   }
 }
  // stripe 支付模块

  // var baseUrl = "http://192.168.1.20:8080";
  var areaCode = "001";
  $(document).ready(function () {
    var userInfo = localStorage.getItem("userInfo");
    if (userInfo == null) {
      // $(".loginIn").show()
    } 
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

  // $("#paypal-button-container").hide();
  var goods_id = "",
    price = 0,
    payTypes = "#pay0";
  $(document).on("click", "#pay0", function () {
    // 弹出弹窗，在弹出中选择支付方式
    payTypes = "#pay0";
    popupFunction();
  });

  // $(document).on("click", "#pay-paypel", function () {
  //   goods_id = $(payTypes).data("id");
  //   price = $(payTypes).data("price");
  //    createdOrderTo(goods_id);
  // });

  $(document).on("click", "#pay01", function () {
    payTypes = "#pay01";
    popupFunction();
  });
  // $(document).on("click", "#pay-paypel", function () {
  //   goods_id = $(payTypes).data("id");
  //   price = $(payTypes).data("price");
  //    createdOrderTo(goods_id);
  // });

  $(document).on("click", "#pay10", function () {
    payTypes = "#pay10";
    popupFunction();
  });

  // $(document).on("click", "#pay-paypel", function () {
  //   goods_id = $(payTypes).data("id");
  //   price = $(payTypes).data("price");
  //   createdOrderTo(goods_id);
  // });

  $(document).on("click", "#pay11", function () {
    payTypes = "#pay11";
    popupFunction();
  });

  // $(document).on("click", "#pay-paypel", function () {
  //   goods_id = $(payTypes).data("id");
  //   price = $(payTypes).data("price");
  //   createdOrderTo(goods_id);
  // });

  $(document).on("click", "#pay12", function () {
    payTypes = "#pay12";
    popupFunction();
  });

  $(document).on("click", "#pay67770", function () {
    payTypes = "#pay67770";
    popupFunction();
  });
  $(document).on("click", "#pay166770", function () {
    payTypes = "#pay166770";
    popupFunction();
  });


  $(document).on("click", "#pay-paypel", function () {
    goods_id = $(payTypes).data("id");
    price = $(payTypes).data("price"); 
    // var paytype="paypel";
    var paytype = "paypal"; 
    createdOrderTo(goods_id, paytype);
  });
  $(document).on("click", "#pay-stripe", function () {
    goods_id = $(payTypes).data("id");
    price = $(payTypes).data("price");
      
    $(".please-payment-method").hide()
    $("#pay-paypel").hide()
    $("#pay-stripe").hide() 
    $("#payment-form").show()
    initialize(goods_id) ;
    checkStatus();
    document
      .querySelector("#payment-form")
      .addEventListener("submit", handleSubmit);
  });

  function popupFunction() {
    $("#item1").popup({
      time: 1000,
      classAnimateShow: "slideInUp",
      classAnimateHide: "fadeOut",
      onPopupClose: function e() {
        console.log('0')
        $(".please-payment-method").show()
        $("#pay-paypel").show()
        $("#payment-form").show()
        $("#pay-stripe").show()
      },
      onPopupInit: function e() {
        console.log('1')
        $("#payment-form").hide()
      },
    });
  }

  // 后端接口逻辑
  function createdOrderTo(goods_id, paytype) {
    var tokens = JSON.parse(localStorage.getItem("userInfo")) || "";

    $.ajax({
      type: "get",
      url: `${baseUrl}/user/order/create?paytype=${paytype}&goods_id=${goods_id}&payway=0`,
      dataType: "json",
      headers: {
        Authorization: `Bearer ${tokens.token}`,
      },
      success: function (res) {
        // console.log("创建订单", res);
        if (res.code == 0) {
          window.location.href = res.data.pay_url;
        }
      },
    });
  }
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
        // console.log("创建订单", res);
        if (res.code == 0) {
          window.location.href = "index.html";
        }
      },
    });
  }

  // }

  // 支付模块

  function goodList(id) {
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
          }else if (id == 3) {
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
              var op23 = `<div class="displaytop-list displaytopK" data-id="${
                data.ID
              }"  data-price="${data.cur_price}"  id="pay6777${index}"><div>${
                data.title
              }</div><div>$${data.cur_price / 100} /${type}</div></div>`;

              $("#payList").append(op23);
            });
          }else if (id == 4) {
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
              var op24 = `<div class="displaytop-list displaytopK" data-id="${
                data.ID
              }"  data-price="${data.cur_price}"  id="pay16677${index}"><div>${
                data.title
              }</div><div>$${data.cur_price / 100} /${type}</div></div>`;

              $("#payList").append(op24);
            });
          }
        } else if (res.code == 2) {
          localStorage.removeItem("userInfo");
          window.location.href = "login.html?params=pay";
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
  }else if (ids == 3) {
    goodList(3);
  }else if (ids == 4) {
    goodList(4);
  }

  function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);

    return null;
  }

  // paypal
  //   .Buttons({
  //     createOrder: (data, actions) => {
  //       return actions.order.create({
  //         purchase_units: [
  //           {
  //             amount: {
  //               value: price / 100,
  //             },
  //           },
  //         ],
  //       });
  //     },
  //     onApprove: (data, actions) => {
  //       return actions.order.capture().then(function (orderData) {
  //         console.log("=goods_id===>", goods_id);
  //         console.log(
  //           "Capture result====》",
  //           orderData,
  //           JSON.stringify(orderData, null, 2)
  //         );
  //         const transaction = orderData.purchase_units[0].payments.captures[0];
  //         createdOrder(goods_id, transaction.id);
  //       });
  //     },
  //   })
  //   .render("#paypal-button-container");
})(jQuery);
