function addrem() {
    chrome.action.setPopup({popup: "addrem.html"});
    window.location.href = "addrem.html";
}

function newTab() {
    chrome.action.setPopup({popup: "tab.html"});
    window.location.href = "tab.html";
}

function ret(name) {
    chrome.action.setPopup({popup: "List.html"});
    window.location.href = "List.html";
}

window.onload = async () => {
    var el = document.getElementById("add/rem");
    el.addEventListener("click", addrem);
    var b = document.getElementById("back");
    b.addEventListener("click", ret);
    var t = document.getElementById("tab");
    t.addEventListener("click", newTab);
    init();
};
