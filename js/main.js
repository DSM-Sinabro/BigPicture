$(function() {
    $("#btn_start").on("click", function() {
        $("html, body").animate({
            scrollTop: $("#second").offset().top
        }, 500);
    });
});

$(document).ready(function() {
    $("#btn_apply").click(function() {
        $("#myModal_apply").modal();
    });

    $("#btn_suggest").click(function() {
        $("#myModal_suggest").modal();
    });

    $("#btn_event").click(function() {
        $("#myModal_event").modal();
    });

    $("#btn_news").click(function() {
        $("#myModal_news").modal();
    });
});
