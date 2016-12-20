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
});

$(document).ready(function() {
    $("#btn_suggest").click(function() {
        $("#myModal_suggest").modal();
    });
});

$(document).ready(function() {
    $("#btn_event").click(function() {
        $("#myModal_event").modal();
    });
});

$(document).ready(function() {
    $("#btn_news").click(function() {
        $("#myModal_news").modal();
    });
});
