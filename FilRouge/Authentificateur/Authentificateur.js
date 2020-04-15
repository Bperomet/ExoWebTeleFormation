

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('AuthDB.db');

function User(id,surname,lastname,email,password,descrip,role){
    this.idUser = id||'';
    this.surnameUser = surname||'';
    this.lastnameUser = lastname||'';
    this.emailUser = email||'';
    this.passwordUser = password||'';
    this.descriptionUser = descrip||'';
    this.roleUser = role||'Usager';
}

let user;

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

                    stmt.run(obj[i].firstname, obj[i].lastname, obj[i].email, obj[i].password, obj[i].description, obj[i].role);
                }
                stmt.finalize();
            }
            else{
                console.log('Base de donnée éxistante.');
            }

        }
    });
});

const GetData = (app)=>{
app.get('/database', function (req, res) {
    db.all('SELECT ID, FIRSTNAME, LASTNAME, EMAIL, PASSWORD, DESCRIPTION, ROLE FROM userData', function (err, rows) {
        var output = [];
        if (err) {
          console.log(err);
        } 
        else {
          if (rows.length === 0) {
            res.send('Empty database');
          } 
          else {
            rows.forEach(function (row) {
              output.push({ id: row.id, firstname: row.firstname, lastname: row.lastname, 
                email: row.email, password: row.password, 
                description: row.description, role: row.role});
            });
            res.send(output);
          }
        }
      });
 });
}
const AddData = (app)=>{
app.post('/add', function (req, res) {
   var FirstNameValue = req.body.firstname;
   var LastNameValue = req.body.lastname;
   var EmailValue = req.body.email;
   var PasswordValue = req.body.password;
   var DescriptionValue = req.body.description;
   var RoleValue = req.body.role;

  db.each('SELECT EMAIL FROM userData WHERE email=? UNION ALL SELECT NULL LIMIT 1', EmailValue, function (err, row) {
    if (err) {
        console.log(err);
    }
    if (row.email === null) {
      db.run('INSERT INTO userData (firstname, lastname, email, password, description, role) VALUES (?, ?, ?, ?, ?, ?)', 
      FirstNameValue, LastNameValue, EmailValue, PasswordValue, DescriptionValue, RoleValue, function (err, row) {
        if (err) {
            console.log(err);
        } 
        else {
            res.send('Success');
        }
      });
    }
    else{
      res.send('Email deja existant')
    }
  });
 });
}
const TryConect =(app)=>{
 app.post('/connection', function (req, res) {
    var EmailValue = req.body.email;
    var PasswordValue = req.body.password;
 
     db.each('SELECT ID FROM userData WHERE email=? AND password=? UNION ALL SELECT NULL LIMIT 1', EmailValue, PasswordValue, function (err, row) {
     if (err) {
         console.log(err);
     }
     //si ça matche
     if (row.id != null) {
        user = new User(row.id,row.surname,row.lastname,row.email,row.password,row.descrip,row.role);

     //   app.set('view engine','ejs');
        if(user.roleUser==='administrateur'){
         // res.render('/AdminPage');
        //  res.send('Vous etes dans la zone de gestion faite pour les administrateur!');
          
        }
        else{
         // res.render('index.html');

         // res.send('Vous etes dans la zone faite pour les utilisateur!');
        }
     } 
     else {
         res.send('Identifiants non existant');
     }
     });
 
  });
}
const BonusDelete =(app)=>{
  app.post('/delete', function (req, res) {
    var IdValue = req.body.id;
    //verrif
    if (IdValue !== '' && IdValue !== undefined) {
        //verrif si l'id match
      db.each('SELECT ID FROM userData WHERE id=? UNION ALL SELECT NULL LIMIT 1', IdValue, function (err, row) {
        if (err) {
          console.log(err);
        }
        if (row.id === null) {
          res.send('You should specify an ID');
        } 
        else {
            //lance la requete
          db.run('DELETE FROM userData WHERE id=?', IdValue, function (err) {
            if (err) {
              console.log(err);
            } 
            else {
              res.send('Success');
            }
          })
        }
      });
    } 
    else {
      res.send('Unable to delete data. Check syntax');
    }
  });
}
  module.exports = {
    get:GetData,
    add:AddData,
    connexion: TryConect,
    delete: BonusDelete
  };
/*
curl -d "{\"firstname\" : \"Lewis\",\"lastname\" : \"Carroll\",\"email\" : \"test@email.fr\",\"password\" : \"azertyx\",\"description\" : \"je suis une description\",\"role\" : \"Usager\"}" -H "Content-Type: application/json" -X POST "http://localhost:9500/add"
curl -d "{\"email\" : \"test@email.fr\",\"password\" : \"azertyx\"}" -H "Content-Type: application/json" -X POST "http://localhost:9500/connection"
*/
