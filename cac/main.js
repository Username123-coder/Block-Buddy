var sql = require('sqlite3').verbose();
var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.json());

class Database {
    db;
    init_Arrays = "CREATE TABLE IF NOT EXISTS Arrays (username TEXT, listName TEXT, enable INTEGER, listStr TEXT);";
    init_Users = "CREATE TABLE IF NOT EXISTS Users (username TEXT, hash TEXT);";
    constructor() {
        this.db = new sql.Database("./sql.db", sql.OPEN_READWRITE, (err) => {
            if (err) return console.error(error.message);
        });
        this.db.serialize(() => {
            this.db.run(this.init_Arrays);
            this.db.run(this.init_Users);
        });
    };

    auth(user, hash, res) {
        this.db.all("Select * From Users Where username = ? And hash = ?;", [user, hash], (err, vals) => {
            if (err) return console.error(err);
            res.json({"res": vals.length != 0});
        });
    };

    removeList(user, name) {
        this.db.run("Delete From Arrays Where username = ? And listName = ?;", [user, name], (err) => {
            if (err) return console.error(err);
        });
    };

    removeUser(user) {
        this.db.serialize( () => {
            this.db.run("Delete From Users Where username = ?;", [user], (err) => {
                if (err) return console.error(err);
            });
            this.db.run("Delete From Arrays Where username = ?;", [user], (err) => {
                if (err) return console.error(err);
            });
        });
    };

    register(user, hash) {
        this.db.run("Insert Into Users(username, hash) Values (?, ?);", [user, hash], (err) => {
            if (err) return console.error(err);
        });
        this.addList(user, "List 1", 1, "");
    };

    addList(user, name, enabled, lStr) {
        this.db.serialize(() => {
            this.db.run(`Insert Into Arrays(username, listName, enable, listStr) Values (?,?,?,?);`, [user, name, enabled, lStr], (err) => {
                if (err) return console.error(err);
            });
        })
    };

    getUserLists(user, res) {
        this.db.all("Select listName, listStr, enable From Arrays Where username = ?;", [user], (err, vals) => {
            if (err) return console.error(err);
            console.log(vals);
            res.json({"lists": vals});
        });
    };

    getOneList(user, name, res) {
        this.db.all("Select listStr, enable From Arrays Where username = ? And listName = ?;", [user, name], (err, vals) => {
            if (err) return console.error(err);
            console.log(vals);
            res.json({"lists": vals});
        });
    };

    modifyList(user, name, lStr, enabled) {
        this.db.run("Update Arrays Set listStr = ?, enable = ? Where username = ? And listName = ?;", [lStr, enabled, user, name], (err) => {
            if (err) return console.error(err);
        });
    };

    getAllLists(res) {
        this.db.all("Select username, listStr From Arrays;", (err, vals) => {
            if (err) return err;
            else {
                console.log(vals);
                res.json({"lists": vals});
            }
        });
    };
}

var database = new Database();
// database.getUserLists("user", null);

app.post("/register", (req, res) => {
    database.register(req.body.user, req.body.hash);
});

app.post("/auth", (req, res) => {
    database.auth(req.body.user, req.body.hash, res);
});

app.post("/getLists", (req, res) => {
    if (req.body.user && req.body.name) {
        database.getOneList(req.body.user, req.body.name, res);
    } else if (req.body.user) {
        database.getUserLists(req.body.user, res);
    } else {
        database.getAllLists(res);
    }
});

app.post("/changeList", (req, res) => {
    database.modifyList(req.body.user, req.body.name, req.body.list, req.body.enabled);
});

app.post("/removeUser", (req, res) => {
    database.removeUser(req.body.user);
});

app.post("/removeList", (req, res) => {
    database.removeList(req.body.user, req.body.name);
});

app.post("/addList", (req, res) => {
    database.addList(req.body.user, req.body.name, req.body.enabled, req.body.list);
});

var server = app.listen(8081);
