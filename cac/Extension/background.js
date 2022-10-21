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

    checkURL(url) {
        if (this.lists) {
            let l = this.lists.length;
            for (let i = 0; i < l; i++) {
                if (this.lists[i].includes(url)) return true;
            }
            return false;
        }
        return false;
    }

    getList() {
        return this.lists;
    }
}

c = new Lists();
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        c.initLists();

        if (c.checkURL(tab.url)) {
            chrome.tabs.remove(tabId);
        }

        chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: ['inject.js']
        });

        chrome.alarms.onAlarm.addListener(function (alarm) {
            chrome.tabs.create({ url: alarm.name, active: true });
        });
        
        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            if (request.method == "getLocalStorage") {
                sendResponse({data: c.getList()});
            } else if (request.method == "tab") {
                var now = new Date();
                var day = now.getDate();
                var year = now.getFullYear();
                var month = now.getMonth();

                var timestamp = +new Date(year, month, day, request.t.split(":")[0], request.t.split(":")[1], 0, 0);
                chrome.alarms.create(request.u, {
                    when: timestamp
                });
            }
        });
    }
})
