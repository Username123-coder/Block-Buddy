var init = async () => {
    var l = await chrome.storage.local.get(['user']);

    var res = await fetch( "http://192.168.0.103:8081/getLists", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "user": l.user,
        })
    });

    ret = await res.json();
    var lists = ret.lists;

    lists.forEach((l) => {
        var button = document.createElement("button");
        button.innerHTML = l.listName;
        button.addEventListener("click", () => {
            click(l.listName);
        });
        document.body.appendChild(button);
    });
};

function addrem() {
    chrome.action.setPopup({popup: "addrem.html"});
    window.location.href = "addrem.html";
}

function click(name) {
    chrome.storage.local.set({"name": name});
    chrome.action.setPopup({popup: "main.html"});
    window.location.href = "main.html";
}

function ret(name) {
    chrome.action.setPopup({popup: "popup.html"});
    window.location.href = "popup.html";
}

window.onload = async () => {
    var el = document.getElementById("add/rem");
    el.addEventListener("click", addrem);
    var b = document.getElementById("back");
    b.addEventListener("click", ret);
    init();
};
