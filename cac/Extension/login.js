chrome.storage.local.set({"user": ""})

function authenticate() {
    let u = document.getElementById("user").value;
    let p = document.getElementById("pwd").value;
    if (u === "" || pwd === "") {
        document.getElementById("err").innerHTML = "Make sure both fields are filled in.";
    } else {
        fetch("http://192.168.0.103:8081/auth", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "user": u,
                "hash": p
            })
        }).then((res) => {
            return res.json();
        }).then((res) => {
            if (res.res) {
                chrome.storage.local.set({'user': u});
                chrome.action.setPopup({popup: "List.html"});
                window.location.href = "List.html";
            } else {
                document.getElementById("err").innerHTML = "Username or password doesn't exist.";
            }
        });
    }
}

async function register() {
    let u = document.getElementById("user").value;
    let p = document.getElementById("pwd").value;
    if (u === "" || p === "") {
        document.getElementById("err").innerHTML = "Make sure both fields are filled in.";
    } else {
        var res = await fetch("http://192.168.0.103:8081/auth", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "user": u,
                "hash": p
            })
        });
        
        const resp = await res.json();
        if (resp.res) {
            document.getElementById("err").innerHTML = "Username and password are already registered.";
        } else {
            var reg = await fetch("http://192.168.0.103:8081/register", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "user": u,
                    "hash": p
                })
            });
            
            chrome.storage.local.set({'user': u});
            chrome.action.setPopup({popup: "List.html"});
            window.location.href = "List.html";
        }
    }
}

window.onload = () => {
    var auth = document.getElementById("auth");
    var reg = document.getElementById("register");
    auth.addEventListener("click", authenticate);
    reg.addEventListener("click", register);
}