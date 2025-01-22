const sections = [
    {
        id: 'CPlusPlus', icon: 'devicon-cplusplus-plain', title: 'C++', items: [
            { text: 'C++單元測試', date: '2024-03-16', path: 'cpp', file: 'cpp-1' },
        ]
    },
    {
        id: 'CSharp', icon: 'devicon-csharp-plain', title: 'C#', items: [
            { text: '檔案上傳 .NET 6 MVC', date: '2022-11-08', path: 'csharp', file: 'csharp-1' },
            { text: '檔案上傳 WinForm 上傳PDF', date: '2023-02-12', path: 'csharp', file: 'csharp-2' },
            { text: 'Blazor OCR', date: '2023-02-12', path: 'csharp', file: 'csharp-3' },
            { text: 'Unity 物件移動、控制', date: '2024-07-09', path: 'csharp', file: 'csharp-4' },
        ]
    },
    {
        id: 'JS', icon: 'devicon-javascript-plain', title: 'JS', items: [
            { text: 'VueSelect', date: '2023-02-12', path: 'js', file: 'js-1' },
            { text: '動態嵌入Gist', date: '2024-03-14', path: 'js', file: 'js-2' },
        ]
    },
    {
        id: 'PY', icon: 'devicon-python-plain', title: 'Python', items: [
            { text: 'Implementation of ResNet for Image Classification on the Flowers102 Dataset', date: '2025-01-22', path: 'py', file: 'py-1' },
        ]
    },
    {
        id: 'SQL', icon: 'devicon-microsoftsqlserver-plain', title: 'SQL', items: [
            { text: '取得新增資料之識別-OUTPUT', date: '2022-11-04', path: 'sql', file: 'sql-1' },
        ]
    },
    {
        id: 'Z', icon: 'devicon-gitbook-original', title: '其他', items: [
            { text: '上架App至Google Play Store', date: '2024-04-02', path: 'z', file: 'z-1' },
            { text: 'Windows 10 工作列顯示秒數', date: '2024-04-03', path: 'z', file: 'z-2' },
            { text: 'Windows 10 相片 應用程式消失', date: '2024-04-16', path: 'z', file: 'z-3' },
            { text: '判斷Endian', date: '2024-04-26', path: 'z', file: 'z-4' },
            // { text: '課程筆記-機器學習2021', date: '2024-08-30', path: 'z', file: 'z-5' },
            { text: 'RV1126 連接WiFi網路', date: '2024-10-19', path: 'z', file: 'z-6' },
        ]
    },
];

$(function () {
    initSections();
    initClicks();
    initModal();
});

function initSections() {
    $('#sections').html(sections.map(section => `
            <div class="row mt-3" id="${section.id}">
                <div class="col-12">
                    <div class="list-group">
                        <button class="btn list-group-item list-group-item-warning d-flex align-items-center"
                            type="button" data-bs-toggle="collapse" data-bs-target="#c${section.id}" aria-expanded="true" aria-controls="c${section.id}">
                            <i class="${section.icon} me-2"></i>${section.title}
                        </button>
                    </div>
                    <div class="collapse show collapseList" id="c${section.id}">
                        ${section.items.reverse().map(item => `
                        <button class="d-flex justify-content-between list-group-item list-group-item-action openModal"
                            data-path="${item.path}" data-file="${item.file}">
                            <span>${item.text}</span>
                            <span class="text-nowrap tw-bold">${item.date}</span>
                        </button>`).join('')}
                    </div>
                </div>
            </div>`).join(''));
}

function initClicks() {
    // navbar in mobile - collapse
    $("#navbarExpand").click(function () {
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

    // toptools
    $("#showAllCollapse").click(function () {
        $('.collapseList').collapse('show');
    });
    $("#hideAllCollapse").click(function () {
        $('.collapseList').collapse('hide');
    });

    // Copy to clipboard in modal
    $('#share').click(function () {
        let copyUrl = `${window.location.origin}${window.location.pathname}?p=${$('#path').val()}&f=${$('#file').val()}`;
        copy(copyUrl);
    });

    $('.openModal').click(function () {
        $('#path').val($(this).data('path'));
        $('#file').val($(this).data('file'));
        openModal();
    });

    $('#bug_report').click(function () {
        const subject = `bug_report:notes-${$('#file').val()}`;
        window.location = `mailto:uccu1478@gmail.com?subject=${subject}&body=Hello!`;
    });
}

// open modal if URLSearchParams has p and f
function initModal() {
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
}

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

// try access html
function openModal() {
    // origin : "https://uccu1478.github.io"
    // pathname : "/notes/"
    $("#modalContent").load(`${window.location.origin}${window.location.pathname}${$('#path').val()}/${$('#file').val()}.html`, function (responseTxt, statusTxt, xhr) {
        if (statusTxt == "success") {
            setGist().then(() => {
                $('#staticBackdrop').modal('show');
            }).catch(() => {
                console.error('Error loading Gist');
            });
        }
        if (statusTxt == "error") {
            Swal.fire({
                icon: 'error',
                title: '發生錯誤',
                text: '網址不正確或是本篇文章已移除',
                footer: `<a href="mailto:uccu1478@gmail.com?subject=bug_report:notes&body=Hello!"
                            class="btn list-group-item-danger d-flex align-items-center">
                            <div class="d-flex align-items-center">
                                <span class="material-icons-outlined me-0">email</span>
                                <label class="fs-6 text-break">錯誤更正</label>
                            </div>
                        </a>`
            });
        }
    });
}

// gist script 使用document.write 不支援動態網頁
async function setGist() {
    const $gists = $('script[src^="https://gist.github.com/"]');
    if ($gists.length) {
        Swal.fire({
            title: 'Loading...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });
        const promises = $gists.map(function () {
            var $this = $(this);
            return $.getJSON($this.attr('src') + 'on?callback=?').then(data => {
                if ($('link[rel="stylesheet"][href="' + data.stylesheet + '"]').length < 1) {
                    $('head').append('<link rel="stylesheet" href="' + data.stylesheet + '" type="text/css" />');
                }
                $this.replaceWith($(data.div));
            });
        }).get();
        await Promise.all(promises);
        Swal.close();
    }
}