const sqlite3 = require('sqlite3').verbose();
const dbToken = new sqlite3.Database('TokenDB.db');
const tokenMod = require('../Models/Token');
const userMod = require('../Models/User');

function SqlToken(){};

SqlToken.prototype.CreatDB = ()=>{
    dbToken.serialize(function(){

        var date = new Date();
        var dateNow =date.toLocaleString();
        var dateExpi = new Date(date.getFullYear(),date.getMonth(),date.getDate()+1,date.getHours(),date.getMinutes(),date.getSeconds()).toLocaleString();

        dbToken.run('CREATE TABLE IF NOT EXISTS tokenData (id INTEGER PRIMARY KEY AUTOINCREMENT, idUser INT,token VARCHAR(255), creationDate DATE, expiryDate DATE)');
    
        dbToken.all('SELECT * FROM tokenData', function (err, row) {
            if(err){
                console.log(err);
            }
            else{
                if(row.length === 0){
                    var stmt = dbToken.prepare('INSERT INTO tokenData (idUser, token, creationDate, expiryDate) VALUES (?, ?, ?, ?)');
                    var obj = [{ idUser: 0, token:'token test', creationDate: dateNow, 
                    expiryDate:dateExpi}];
                    for(let i in obj){
    
                        stmt.run(obj[i].idUser, obj[i].token, obj[i].creationDate, obj[i].expiryDate);
                    }
                    stmt.finalize();
                }
                else{
                    console.log('Base de donnée existante.');
                }
            }
        });
    });
}

SqlToken.prototype.SelectTokensUser = (user,callback)=>{
    dbToken.all('SELECT * From tokenData WHERE idUser=?', user.id, function (err, rows) {
        if (err) {
            console.log(err);
            callback(null);
        }
        else{
            if (rows.length === 0) {
                callback(null);
            } 
            else {
                var output = [];
                rows.forEach(function (row) {
                    output.push(new tokenMod.Token(row));
                });
                callback(output);
            }
        }
    });
}
SqlToken.prototype.SelectCurrentTokenUser = (user,callback)=>{
    dbToken.all('SELECT * From tokenData WHERE idUser=? ORDER BY id DESC', user.id,function (err, rows) {
        if (err) {
            console.log(err);
            callback(null);
        }
        else{
            if (rows.length > 0) {
                callback(new tokenMod.Token(rows[0]));   
            } 
            else {
                callback(null);
            }
        }
    });
}
SqlToken.prototype.SelectIdToken = (idValue,callback)=>{
    dbToken.get('SELECT * From tokenData WHERE id=?', idValue , function (err, row) {
        if (err) {
            console.log(err);
            callback(null);
        }
        else{
        }
            if (row != null) {
                callback(new tokenMod.Token(row));
            }
            else {
                callback(null);
            }
    });
}
SqlToken.prototype.SelectAll = (callback)=>{
    dbToken.all('SELECT * FROM tokenData', function (err, rows) {
        
        if (err) {
            console.log(err);
            callback(null);
        } 
        else {
            if (rows.length === 0) {
                callback(null);
            } 
            else {
                var output = [];
                rows.forEach(function (row) {
                    output.push(new tokenMod.Token(row));
                });
                callback(output);
            }
        }
    });
}

SqlToken.prototype.Create = (user, callback)=>{
    if(user instanceof userMod.User && user.id != ''){
        var token = new tokenMod.Token();

        token.idUser = user.id;
        token.token = token.TokenOutput();

        dbToken.run('INSERT INTO tokenData (idUser, token, creationDate, expiryDate) VALUES (?, ?, ?, ?)', 
        user.id, token.token, token.creationDate, token.expiryDate, function (err) {
            if (err) {
                console.log(err);
                callback(null);
            } 
            else {
                token.id = this.lastID;
                callback(token);
            }
        }); 
    } 
}

SqlToken.prototype.Delete = (IdValue,callback)=>{
    if (IdValue !== '' && IdValue !== undefined) {
        dbToken.run('DELETE FROM tokenData WHERE id=?', IdValue, function (err) {
            if (err) {
                console.log(err);
            } 
            else {
                callback(true);
            }
        });
    } 
}

module.exports = {SqlToken: SqlToken};