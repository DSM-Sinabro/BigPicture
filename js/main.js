$(function () {
    $("#btn_start").on("click",function () {
        $("html, body").animate({
            scrollTop : $("#second").offset().top
        },500);
    });
});
