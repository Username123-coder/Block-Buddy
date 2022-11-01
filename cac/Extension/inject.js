chrome.runtime.sendMessage({method: "getLocalStorage", key: "status"}, function(response) {
    lists = response.data;
    console.log(lists);



    var imgs = document.getElementsByTagName("img");
    for (let i = 0; i < lists.length; i++) {
        for (let j = 0; j < lists[i].length; j++) {
            if (lists[i][j] != "") {
                let x = lists[i][j];
                x.toLowerCase();
                document.body.innerHTML = document.body.innerHTML.replace(new RegExp(x, 'gi'), "[censored]");
                
            }
        }
    }
});
