async function addTolist() {
    var l = await chrome.storage.local.get(['user']);
    var e = 0;
    var n = await chrome.storage.local.get(['name']);

    var checkBox = document.getElementById("enable");
    if (checkBox.checked) {e = 1}
    else {e = 0};

    var res = await fetch( "https://cool.loca.lt/getLists", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "user": l.user,
            "name": n.name
        })
    });
    var ret = await res.json();
    var list = ret.lists[0].listStr;
    list = list.split(",");
    list.push(document.getElementById("item").value);
    list = list.filter((f) => {return f != ""});
    list = list.toString();

    document.getElementById("out").innerHTML = list;

    var reg = await fetch("https://cool.loca.lt/changeList", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "user": l.user,
            "name": n.name,
            "list": list,
            "enabled": e
        })
    });
};

async function en_dis() {
    var l = await chrome.storage.local.get(['user']);
    var e = 0;
    var n = await chrome.storage.local.get(['name']);

    var checkBox = document.getElementById("enable");
    if (checkBox.checked) {e = 1}
    else {e = 0};

    var res = await fetch( "https://cool.loca.lt/getLists", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "user": l.user,
            "name": n.name
        })
    });
    var ret = await res.json();
    var list = ret.lists[0].listStr;

    var reg = await fetch("https://cool.loca.lt/changeList", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "user": l.user,
            "name": n.name,
            "list": list,
            "enabled": e
        })
    });
};

async function removeFromList() {
    var l = await chrome.storage.local.get(['user']);
    var e = 0;
    var n = await chrome.storage.local.get(['name']);

    var checkBox = document.getElementById("enable");
    if (checkBox.checked) {e = 1}
    else {e = 0};

    var res = await fetch( "https://cool.loca.lt/getLists", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "user": l.user,
            "name": n.name
        })
    });
    var ret = await res.json();
    var list = ret.lists[0].listStr;
    list = list.split(",");
    list = list.filter((f) => {return f != document.getElementById("item").value});
    list = list.toString();

    document.getElementById("out").innerHTML = list;

    var reg = await fetch("https://cool.loca.lt/changeList", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "user": l.user,
            "name": n.name,
            "list": list,
            "enabled": e
        })
    });
}

async function start() {
    var l = await chrome.storage.local.get(['user']);
    var n = await chrome.storage.local.get(['name']);

    var res = await fetch( "https://cool.loca.lt/getLists", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "user": l.user,
            "name": n.name
        })
    });

    var ret = await res.json();
    var en = ret.lists[0].enable;
    var check = document.getElementById("enable");
    document.getElementById("out").innerHTML = ret.lists[0].listStr;
    if (en == 1) {
        check.checked = true;
    }
}

function retu() {
    chrome.action.setPopup({popup: "List.html"});
    window.location.href = "List.html";
}

window.onload = async () => {
    start();
    var change = document.getElementById("change");
    change.addEventListener("click", addTolist);
    var rem = document.getElementById("remove");
    rem.addEventListener("click", removeFromList);
    var ret = document.getElementById("ret");
    ret.addEventListener("click", retu);
    var check = document.getElementById("enable");
    check.addEventListener("click", en_dis);
};