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
        var res = await fetch( "http://192.168.0.103:8081/getLists", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "user": this.user
            })
        });

        res = await res.json();
        return ret.lists;
    }
}

class Lists extends SQLClient {
    #lists;
    async initLists() {
        await this.initUser();
        this.lists = await this.apiGetLists();
        this.processLists();
    }

    processLists() {
        l = this.lists;
        this.lists = [];

        for (let i = 0; i < l.length; i++) {
            if (l[i].enabled == 1) {
                this.lists.push(this.lists[i].listStr.split(","));
            }
        }
    }

    async changeDocument() {
        chrome.tabs.onActivated.addListener(async info => {
            chrome.scripting.executeScript({
              target: {tabId: info.tabId},
              func: this.censure,
            }).catch(console.error);
        });          
    }
    
    censure() {
        for (let i = 0; i < this.lists.length; i++) {
            for (let j = 0; j < this.lists[i].length; j++) {
                document.body.innerHTML = document.body.innerHTML.replace(this.lists[i][j], "[censured]");
            }
        }
    }
}

c = new Lists();
c.initLists();
c.changeDocument();