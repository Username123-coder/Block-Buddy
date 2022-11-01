var init = async () => {
    var l = await chrome.storage.local.get(['user']);

    var res = await fetch( "https://cool.loca.lt/getLists", {
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
        var divider = document.createElement("div");
        button.innerHTML = l.listName;
        button.className = "listBtn";
        button.addEventListener("click", () => {
            click(l.listName);
        });
        document.body.appendChild(button);
        document.body.appendChild(divider);
    });
};

function create() {
    chrome.action.setPopup({popup: "menu.html"});
    window.location.href = "menu.html";
}

function newTab() {
    chrome.action.setPopup({popup: "tab.html"});
    window.location.href = "tab.html";
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
    var el = document.getElementById("create");
    el.addEventListener("click", create);
    var b = document.getElementById("back");
    b.addEventListener("click", ret);
    init();
};
