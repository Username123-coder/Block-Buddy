// window.onload = () => {
    chrome.runtime.sendMessage({method: "getLocalStorage", key: "status"}, function(response) {
        lists = response.data;
        console.log(lists);

        
        
        var imgs = document.getElementsByTagName("img");
        for (let i = 0; i < lists.length; i++) {
            for (let j = 0; j < lists[i].length; j++) {
                const x = new String(lists[i][j]);
                x.toLowerCase;
                const y = x.substring(0, 1).toUpperCase + x.substring(1, x.length());
                document.body.innerHTML = document.body.innerHTML.replaceAll(lists[i][j], "[censured]");
                document.body.innerHTML = document.body.innerHTML.replaceAll(y, "[censured]");
            }
        }
    });
// }