var sqlite3 = require('sqlite3').verbose();
module.exports = {
    getAllDepts: function(callback) {
        let db = new sqlite3.Database("db/smartfarm.db");
        let sql = `SELECT * FROM dept`;
        db.all(sql, function(err, rows) {
            if (err) {
                console.error('getAllDepts DB 오류', err);
                return;
            }
            callback(rows);
        });
        db.close();
    },
    getDept: function(did, callback) {
        let db = new sqlite3.Database("db/smartfarm.db");
        let sql = `SELECT * FROM dept where did=?`;
        let stmt= db.prepare(sql);
        stmt.get(did, function(err, row) {
            if (err) {
                console.error('getDepts DB 오류', err);
                return;
            }
            callback(row);
        });
        stmt.finalize();
        db.close();
    },
    getAllUsers: function(callback) {
        let db = new sqlite3.Database("db/smartfarm.db");
        let sql = `SELECT l.uid, l.name, r.name deptName, l.tel, strftime('%Y-%m-%d', regDate, 'localtime') ts from user l inner join dept r on l.deptId=r.did;`;
        db.all(sql, function(err, rows) {
            if (err) {
                console.error('getAllUsers DB 오류', err);
                return;
            }
            callback(rows);
        });
        db.close();
    },
    registerUser: function(uid, password, name, deptId, tel, callback){
        let db = new sqlite3.Database("db/smartfarm.db");
        let sql = `INSERT INTO user(uid, password, name, deptId, tel) values(?,?,?,?,?)`;
        let stmt = db.prepare(sql);
        stmt.run(uid, password, name, deptId, tel, function(err, rows) {
            if (err) {
                console.error('getAllDepts DB 오류', err);
                return;
            }
            callback();
        });
        stmt.finalize();
        db.close();
    }
}