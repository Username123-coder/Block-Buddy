async function add() {
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

    var name = "List " + (lists.length + 1);

    var res = await fetch( "http://192.168.0.103:8081/addList", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "user": l.user,
            "name": name,
            "enabled": 1,
            "list": ""
        })
    });
}

async function remove() {
    var l = await chrome.storage.local.get(['user']);

    var res = await fetch( "http://192.168.0.103:8081/removeList", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "user": l.user,
            "name": document.getElementById("name").value
        })
    });
}

function retu() {
    chrome.action.setPopup({popup: "List.html"});
    window.location.href = "List.html";
}

window.onload = () => {
    var a = document.getElementById("add");
    a.addEventListener("click", add);
    var rem = document.getElementById("rem");
    rem.addEventListener("click", remove);
    var ret = document.getElementById("ret");
    ret.addEventListener("click", retu);
}