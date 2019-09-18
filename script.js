var kanji = [];
var info = {
    start: 1,
    end: 20
}

$(function () {
    var newInfo = localStorage.getItem("kodanshacopy");
    console.log(newInfo);
    if (newInfo != null) {
        info = JSON.parse(newInfo);
        $("#from").val(info.start);
        $("#to").val(info.end);
    }
    else {
        saveData();
    }
    $("#from").val(info.start);
    $("#to").val(info.end);
    $.ajax("kodansha.txt").done(function (data) {
        console.log("ready");
        kanji = data.split("\n");
        console.log(kanji);
        document.querySelector("#btn").addEventListener("click", copy);
        document.querySelector("#adv").addEventListener("click", advance);
    });
});

function copy() {
    $("#copy").empty();
    var str = "";
    var start = parseInt($("#from").val()) - 1;
    var end = parseInt($("#to").val()) - 1;
    info.start = start + 1;
    info.end = end + 1;
    console.log(info);
    for (var i = start; i <= end; i++) {
        if (i >= 0 && i < kanji.length) {
            str += `${kanji[i]} (${i+1})\n`;
        }
    }
    str = str.trim();
    $("#copy").text(str);
    var copyText = document.querySelector("#copy");
    copyText.select();
    document.execCommand("copy");
    iosCopyToClipboard(document.getElementById("copy"));
    saveData();
}

function advance() {
    var start = parseInt($("#from").val());
    var end = parseInt($("#to").val());
    var diff = end - start;
    start = end + 1;
    end = start + diff;
    info.start = start;
    info.end = end;
    $("#from").val(start);
    $("#to").val(end);
    saveData();
}

function saveData() {
    localStorage.setItem("kodanshacopy", JSON.stringify(info));
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