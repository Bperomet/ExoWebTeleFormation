const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('AuthDB.db');

db.serialize(function(){

    db.run('CREATE TABLE IF NOT EXISTS userData (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, email TEXT, password TEXT, description TEXT, role TEXT)');

    db.all('SELECT ID, FIRSTNAME, LASTNAME, EMAIL, PASSWORD, DESCRIPTION, ROLE FROM userData', function (err, row) {
        if(err){
            console.log(err);
        }
        else{
            if(row.length === 0){
                var stmt = db.prepare('INSERT INTO userData VALUES ( ?, ?, ?, ?, ?, ?)');
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

const app = express();
app.use(express.json());

app.get('/database', function (req, res) {
    db.all('SELECT ID, FIRSTNAME, LASTNAME, EMAIL, PASSWORD, DESCRIPTION, ROLE FROM userData', function (err, rows) {
        var output = [];
        if (err) {
          console.log(err)
        } 
        else {
          if (rows.length === 0) {
            res.send('Empty database')
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

 app.post('/add', function (req, res) {
   //var IdValue = req.body.id;
   var FirstNameValue = req.body.firstname;
   var LastNameValue = req.body.lastname;
   var EmailValue = req.body.email;
   var PasswordValue = req.body.password;
   var DescriptionValue = req.body.description;
   var RoleValue = req.body.role;

    db.each('SELECT EMAIL FROM userData WHERE email=? UNION ALL SELECT NULL LIMIT 1', EmailValue, function (err, row) {
    if (err) {
        console.log(err)
    }
    if (row.email === null) {
        db.run('INSERT INTO userData VALUES (?, ?, ?, ?, ?, ?) ', 
        FirstNameValue, LastNameValue, EmailValue, PasswordValue, DescriptionValue, RoleValue, function (err, row) {
        if (err) {
            console.log(err)
        } 
        else {
            res.send('Success')
        }
        });
    } 
    else {
        res.send('Email already exists')
    }
    });

 });

app.set('port',9500);
console.log('Le serveur ecoute sur le port ',app.get('port'));
app.listen(app.get('port'));
//curl -d {\"firstname\":\"Lewis\",\"lastname\":\"Carroll\",\"email\":\"test@email.fr\",\"password\":\"azerty\",\"description\":\"je suis une description\",\"role\":\"Usager\"} -H "Content-Type: application/json" -X POST "http://localhost:9500/add"
/*
curl -d 
{
\"firstname
\":\"
Lewis\",
\"lastname
\":\"
Carroll\",
\"email
\":\"
test@email.fr\",
\"password
\":\"
azerty\",
\"description
\":\"
je suis une description\",
\"role
\":\"
Usager\"} -H "Content-Type: application/json" -X POST "http://localhost:9500/add"
*/
