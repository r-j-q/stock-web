(function ($) {
  "use strict";

  $(document).ready(function () {
    $(".loginIn").click(function () {
      var userInfo = localStorage.getItem("userInfo");
      console.log("------>",  typeof userInfo);
      if ( userInfo == null) {
        window.location.href = "login.html";
      }
    });
  });
})(jQuery);
