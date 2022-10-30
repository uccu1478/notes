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
        let copyUrl = `${window.location.origin}${window.location.pathname}?p=${$('#path').val()}&f=${$('#file').val()}`;
        copy(copyUrl);
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

    $('#bug_report').click(function () {
        const subject = `bug_report:notes-${$('#file').val()}`;
        window.location = `mailto:uccu1478@gmail.com?subject=${subject}&body=Hello!`;
    });
});

function copy(text) {
    navigator.clipboard.writeText(text);
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'white',
        customClass: {
            popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: false,
        showCloseButton: true
    });
    Toast.fire({
        icon: 'success',
        title: '已複製'
    });
}

function openModal() {
    // try access html
    // origin : "https://uccu1478.github.io"
    // pathname : "/notes/"
    $("#modalContent").load(`${window.location.origin}${window.location.pathname}${$('#path').val()}/${$('#file').val()}.html`, function (responseTxt, statusTxt, xhr) {
        if (statusTxt == "success") {
            $('#staticBackdrop').modal('show');
        }
        if (statusTxt == "error") {
            Swal.fire({
                icon: 'error',
                title: '發生錯誤',
                text: '網址不正確或是本篇文章已移除',
                footer: '<a href="mailto:uccu1478@gmail.com">錯誤更正</a>'
            })
            // for dev
            // $('#staticBackdrop').modal('show');
        }
    });
}