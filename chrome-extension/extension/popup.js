var url;
chrome.tabs.query({}, function(tabs) {
    for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].active) {
            var tab = tabs[i];
            i = tabs.length;
            url = tab.url;
        }
    }
});

var lastFormat = localStorage.getItem("lastFormat");
if (lastFormat) {
    document.querySelector("#"+lastFormat).checked = true;
} else {
    document.querySelector("#mp3").checked = true;
}
function updateLastFormat() {
    var format = "";
    var inputs = document.querySelectorAll(".options input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            format = inputs[i].id;
        }
    }
    localStorage.setItem("lastFormat", format);
    return format;
}
document.addEventListener("click", function() {
    updateLastFormat();
});

var mp3 = document.querySelector("#mp3", function() {
    download("mp3");
);
var aac = document.querySelector("#aac", function() {
    download("aac");
);
var mp4 = document.querySelector("#mp4", function() {
    download("mp4");
);
function download(format) {
    setTimeout(function() {
        localStorage.setItem("timeoutedd");
    }, 3000);
}
