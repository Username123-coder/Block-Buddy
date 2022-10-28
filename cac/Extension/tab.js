function designate() {
    var time = document.getElementById("t").value;
    var url = document.getElementById("url").value;
    var now = new Date();
    var day = now.getDate();
    var year = now.getFullYear();
    var month = now.getMonth();

    var timestamp = +new Date(year, month, day, time.split(":")[0], time.split(":")[1], 0, 0);
    chrome.alarms.create(url, {
        when: timestamp
    });
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