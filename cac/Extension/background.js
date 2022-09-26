class SQLClient {
    #ip;
    #user;

    constructor() {
        this.ip = "192.168.0.103";
    };
    
    async initUser() {
        this.user = await chrome.storage.local.get(['user']);
    }

    async apiGetLists() {
        if (this.user) {
            var res = await fetch( "http://192.168.0.103:8081/getLists", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "user": this.user.user
                })
            });

            res = await res.json();
            return res.lists;
        }
        return null;
    }
}

class Lists extends SQLClient {
    #lists;

    async processLists() {
        let l = this.lists.length;
        let temp = this.lists;
        this.lists = [];

        for (let i = 0; i < l; i++) {
            if (temp[i].enable == 1) {
                this.lists.push(temp[i].listStr.split(","));
            }
        }
    }

    async initLists() {
        await this.initUser();
        this.lists = await this.apiGetLists();
        if (this.lists != null) {
            this.processLists();
        }
    }

    getList() {
        return this.lists;
    }
}

c = new Lists();
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        c.initLists();
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: ['inject.js']
        })
        
        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            if (request.method == "getLocalStorage") {
                sendResponse({data: c.getList()});
            }
        });
    }
})
