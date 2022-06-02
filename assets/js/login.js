

(function($) {
    'use strict'

    $(document).ready(function() {
        

$("#loginIn").click(function(){
    
    var userInfo = localStorage.getItem("userInfo");
    if(userInfo==null){
     window.location.href='login-page.html';
    }
    // file:///Users/ranjingqiao/Documents/a/stock-web/index.html#
})
});
})(jQuery);


 