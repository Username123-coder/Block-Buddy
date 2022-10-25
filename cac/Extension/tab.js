function designate() {
    var time = document.getElementById("t").value;
    var url = document.getElementById("url").value;
    chrome.runtime.sendMessage({method: "tab", key: "status", u: url, t: time});
}

function retu() {
    chrome.action.setPopup({popup: "List.html"});
    window.location.href = "List.html";
}

window.onload = () => {
    var en = document.getElementById("butt");
    en.addEventListener("click", designate);
    var ret = document.getElementById("ret");
    ret.addEventListener("click", retu);
};