$(function () {
    // navbar in mobile - collapse
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

    // main list - Expand & Collapse
    $("#showAllCollapse").click(function () {
        $('.collapseList').collapse('show');
    });
    $("#hideAllCollapse").click(function () {
        $('.collapseList').collapse('hide');
    });

    // Copy in modal
    $('#share').click(function () {
        let copyUrl = `${window.location.pathname}?p=${$('#path').val()}&f=${$('#file').val()}`;
        copy(copyUrl)
    });

    // IF url has p and f params, open modal
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('p') && searchParams.has('f')) {
        const path = searchParams.get('p');
        const file = searchParams.get('f');
        if (path != '' && file != '') {
            $('#path').val(path);
            $('#file').val(file);
            openModal();
        }
    }

    // openModal click
    $('.openModal').click(function () {
        $('#path').val($(this).data('path'));
        $('#file').val($(this).data('file'));
        openModal();
    });
});

function copy(text) {
    navigator.clipboard.writeText(text);
}

function openModal() {
    // try access html
    $("#modalContent").load(`./${$('#path').val()}/${$('#file').val()}.html`);
    $('#staticBackdrop').modal('show');
}