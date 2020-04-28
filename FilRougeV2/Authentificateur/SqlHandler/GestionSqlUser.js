
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('AuthDB.db');
const userMod = require('../Models/User');


function CreatDB(){
    db.serialize(function(){
        db.run('CREATE TABLE IF NOT EXISTS userData (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, email TEXT, password TEXT, description TEXT, role TEXT)');
    
        db.all('SELECT ID, FIRSTNAME, LASTNAME, EMAIL, PASSWORD, DESCRIPTION, ROLE FROM userData', function (err, row) {
            if(err){
                console.log(err);
            }
            else{
                if(row.length === 0){
                    var stmt = db.prepare('INSERT INTO userData (firstname, lastname, email, password, description, role) VALUES (?, ?, ?, ?, ?, ?)');
                    var obj = [{ firstname:'FirstName', lastname:'LastName', email:'email@email.ml', 
                        password:'Password', description:'Description', role:'Usager'}];
                    for(let i in obj){
    
                        stmt.run(obj[i].firstname, obj[i].lastname, obj[i].email, obj[i].password, obj[i].descrip, obj[i].role);
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

function Select(user,callback){
    db.get('SELECT * From userData WHERE email=? AND password=?', user.email, user.password, function (err, row) {
        if (err) {
            console.log(err);
        }
        else{
        }
            if (row != null) {
                
                callback(new userMod.User(row));
            }
            else {
                callback(null);
            }
    });
}
function SelectId(idValue,callback){
    //select token et redupe iduser >get user
    db.get('SELECT * From userData WHERE id=?', idValue , function (err, row) {
        if (err) {
            console.log(err);
        }
        else{
        }
            if (row != null) {
                callback(new userMod.User(row));
            }
            else {
                callback(null);
            }
    });
}
function SelectAll(callback){
    db.all('SELECT ID, FIRSTNAME, LASTNAME, EMAIL, PASSWORD, DESCRIPTION, ROLE FROM userData', function (err, rows) {
        var output = [];
        if (err) {
            console.log(err);
        } 
        else {
            if (rows.length === 0) {
            
            } 
            else {
            rows.forEach(function (row) {/*
                output.push({ id: row.id, firstname: row.firstname, lastname: row.lastname, 
                email: row.email, password: row.password, 
                description: row.description, role: row.role});*/
                output.push(new userMod.User(row));
            });
            callback(output);
            }
        }
    });
}

function Create(user, callback){

    db.get('SELECT EMAIL FROM userData WHERE email=?', user.email, function (err, row) {
        if (err) {
            console.log(err);
        }
        
        if (row === undefined) {
          db.run('INSERT INTO userData (firstname, lastname, email, password, description, role) VALUES (?, ?, ?, ?, ?, ?)', 
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

function Update(user,callback){
    // subquery
    db.run('UPDATE userData SET firstname = ?, lastname = ?, email = ?, password = ?, description = ?, role = ? WHERE id=? AND NOT EXISTS (SELECT EMAIL FROM userData WHERE email = ? AND id != ?)', 
    user.firstname, user.lastname, user.email, user.password, user.description, user.role, user.id, user.email, user.id, function (err) {
        if (err) {
            console.log(err);
            callback(null);
        } 
        else {
            callback(user);
        }
    });
}

function Delete(IdValue,callback){
  if (IdValue !== '' && IdValue !== undefined) {
    
    db.each('SELECT ID FROM userData WHERE id=? UNION ALL SELECT NULL LIMIT 1', IdValue, function (err, row) {
        if (err) {
        console.log(err);
        }
        if (row.id === null) {
        callback(false);
        } 
        else {
            
            db.run('DELETE FROM userData WHERE id=?', IdValue, function (err) {
                if (err) {
                    console.log(err);
                } 
                else {
                    callback(true);
                }
            });
        }
        });
    } 
    else {
        console.log(err);
        callback(false);
    }
}
module.exports ={
    get: Select,
    getAll: SelectAll,
    add: Create,
    update: Update,
    remove: Delete,
    CreatDB: CreatDB,
    selectId: SelectId
}
