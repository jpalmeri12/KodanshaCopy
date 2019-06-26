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
    document.execCommand("copy")
}