chrome.runtime.sendMessage({method: "getLocalStorage", key: "status"}, function(response) {
    lists = response.data;
    console.log(lists);



    var imgs = document.getElementsByTagName("img");
    for (let i = 0; i < lists.length; i++) {
        for (let j = 0; j < lists[i].length; j++) {
            if (lists[i][j] != "") {
                let x = lists[i][j];
                x.toLowerCase();

                let y = x.substring(0, 1).toUpperCase() + x.substring(1, x.length);
                document.body.innerHTML = document.body.innerHTML.replaceAll(lists[i][j], "[censored]");
                document.body.innerHTML = document.body.innerHTML.replaceAll(y, "[censored]");

                let v = y.indexOf(" ");
                while (v > -1) {
                    if (y.charAt(v + 1) == null) {
                        y = y.substring(0, v + 1) + y.substring(v + 1, v + 2).toUpperCase() + y.substring(v + 2, y.length);
                    } 
                    v = y.indexOf(" ", v + 1);
                }
                document.body.innerHTML = document.body.innerHTML.replaceAll(y, "[censored]");

                y = y.toUpperCase();
                document.body.innerHTML = document.body.innerHTML.replaceAll(y, "[censored]");
            }
        }
    }
});
