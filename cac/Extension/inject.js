// window.onload = () => {
    chrome.runtime.sendMessage({method: "getLocalStorage", key: "status"}, function(response) {
        lists = response.data;
        console.log(lists);
        var imgs = document.getElementsByTagName("img");
        for (let i = 0; i < lists.length; i++) {
            for (let j = 0; j < lists[i].length; j++) {
                document.body.innerHTML = document.body.innerHTML.replaceAll(lists[i][j], "[censured]");
            }
        }
    });
// }