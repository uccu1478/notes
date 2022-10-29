$(function () {
    $("#showAllCollapse").click(function () {
        $('.collapseList').collapse('show');
    });
    $("#hideAllCollapse").click(function () {
        $('.collapseList').collapse('hide');
    });

    $("#navbarExpand").click(function () {
        console.log($("#navbarExpand").hasClass('collapsed'));
        if ($("#navbarExpand").hasClass('collapsed')) {
            $('#navbarExpandIcon').text('keyboard_arrow_down');
            $('#navbarExpandText').text('展開');
        }
        else {
            $('#navbarExpandIcon').text('keyboard_arrow_up');
            $('#navbarExpandText').text('收合');
        }
    });
    $(".collapseAfterClick").click(function () {
        $('#navbarCollapse').removeClass("show");
        $('#navbarExpandIcon').text('keyboard_arrow_down');
        $('#navbarExpandText').text('展開');
    });
});