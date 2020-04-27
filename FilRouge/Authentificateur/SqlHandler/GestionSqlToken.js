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

        dbToken.run('CREATE TABLE IF NOT EXISTS tokenData (id INTEGER PRIMARY KEY AUTOINCREMENT, idUser INT,token VARCHAR(255), creationDate DATETIME, expiryDate DATETIME)');
    
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

SqlToken.prototype.Select = (user,callback)=>{
    dbToken.get('SELECT * From tokenData WHERE idUser=?', user.id, function (err, row) {
        if (err) {
            console.log(err);
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
SqlToken.prototype.SelectId = (idValue,callback)=>{
    dbToken.get('SELECT * From tokenData WHERE id=?', idValue , function (err, row) {
        if (err) {
            console.log(err);
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
        var output = [];
        if (err) {
            console.log(err);
        } 
        else {
            if (rows.length === 0) {
                callback(null);
            } 
            else {
                rows.forEach(function (row) {
                    output.push(new tokenMod.Token(row));
                });
                callback(output);
            }
        }
    });
}
// a finir
SqlToken.prototype.Create = (user, callback)=>{

    dbToken.get('SELECT ID FROM tokenData WHERE email=?', user.email, function (err, row) {
        if (err) {
            console.log(err);
        }
//dbToken.run('UPDATE userData SET firstname = ?, lastname = ?, email = ?, password = ?, description = ?, role = ? WHERE id=? AND NOT EXISTS (SELECT EMAIL FROM userData WHERE email = ? AND id != ?)', 
        if (row === undefined) {
            dbToken.run('INSERT INTO userData (firstname, lastname, email, password, description, role) VALUES (?, ?, ?, ?, ?, ?)', 
            user.firstname, user.lastname, user.email, user.password, user.description, user.role, function (err) {
            if (err) {
                console.log(err);
            } 
            else {
                 
                user.id = this.lastID;
                callback(user);
            }
          });
        }
        else{
          callback(null);
        }
      });
}
module.exports = {SqlToken: SqlToken};