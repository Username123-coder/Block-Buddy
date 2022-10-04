function designate() {
    console.log("juiyg");
    var time = document.getElementById("t").value;
    var url = document.getElementById("url").value;
    chrome.runtime.sendMessage({method: "tab", key: "status", u: url, t: time});
}


window.onload = () => {
    console.log("subway");
    var en = document.getElementById("butt");
    en.addEventListener("click", designate);
};