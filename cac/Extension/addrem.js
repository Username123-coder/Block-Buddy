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

    var ret = await res.json();
    var lists = ret.lists;
    var input = document.getElementById("name").value;
    var num = 1;

    if (input === "") {
        var name = "List " + num;
    } else {
        name = document.getElementById("name").value;
    }

    for (let i = 0; i < lists.length; i++) {
        if (name === lists[i].listName) {
            if (input == "") {
                num += 1;
                name = "List " + num;
                i = 0;
            } else {
                document.getElementById("out").innerHTML = "That name is used in another list.";
                return;
            }
        }
    }

    document.getElementById("out").innerHTML = name + " has been successfully added.";

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
    var name = document.getElementById("name").value;

    document.getElementById("out").innerHTML = name + " has been successfully deleted.";

    var res = await fetch( "http://192.168.0.103:8081/removeList", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "user": l.user,
            "name": name
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
