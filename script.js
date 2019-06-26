var kanji = [];

$(function () {
    $.ajax("kodansha.txt").done(function (data) {
        console.log("ready");
        kanji = data.split("\n");
        console.log(kanji);
        document.querySelector("#btn").addEventListener("click", copy);

    });
});

function copy() {
    $("#copy").empty();
    var str = "";
    var start = parseInt($("#from").val()) - 1;
    var end = parseInt($("#to").val()) - 1;
    for (var i = start; i <= end; i++) {
        if (i >= 0 && i < kanji.length) {
            str += kanji[i] + "\n";
        }
    }
    str = str.trim();
    $("#copy").text(str);
    var copyText = document.querySelector("#copy");
    copyText.select();
    document.execCommand("copy");
    iosCopyToClipboard(document.getElementById("copy"));
}

function iosCopyToClipboard(el) {
    var oldContentEditable = el.contentEditable,
        oldReadOnly = el.readOnly,
        range = document.createRange();

    el.contentEditable = true;
    el.readOnly = false;
    range.selectNodeContents(el);

    var s = window.getSelection();
    s.removeAllRanges();
    s.addRange(range);

    el.setSelectionRange(0, 999999); // A big number, to cover anything that could be inside the element.

    el.contentEditable = oldContentEditable;
    el.readOnly = oldReadOnly;

    document.execCommand('copy');
}