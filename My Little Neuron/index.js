const express = require('express');
const sqlite3 = require('sqlite3').verbose();//Pour obtenir des informations sur l'exécution des requêtes SQL (utile pour le débug)
const db = new sqlite3.Database('MyDB.db');//creation base de donnée  MyDB.db le 2eme arguments pour choisir le mode (ecriture etc)

//Creation de la table si elle n'existe pas
db.serialize(function(){
    //pour créer les colonnes
    db.run('CREATE TABLE IF NOT EXISTS datas (id TEXT, firstname TEXT, lastname TEXT)');
    //selection tt le contenu de la bd
    db.all('SELECT ID, FIRSTNAME, LASTNAME FROM datas', function (err, row) {
        if(err){
            console.log(err);
        }
        else{
            if(row.length === 0){
                var stmt = db.prepare('INSERT INTO datas VALUES (?, ?, ?)');
                var obj = [{ id:'1', firstname:'FirstName', lastname:'LastName' }];
                for(let i in obj){
                    //creation pour l'id 1
                    stmt.run(obj[i].id, obj[i].firstname, obj[i].lastname);
                }
                //envoie
                stmt.finalize();
            }
            else{
                console.log('Pas de base de donnée.');
            }
        }
    });
});


const app = express();


app.use(express.json());//Indique que ça va etre du format json

//Get All
app.get('/database', function (req, res) {
    db.all('SELECT ID, FIRSTNAME, LASTNAME FROM datas', function (err, rows) {
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
            //pour chaque ligne mettre dans le tableau
              output.push({ id: row.id, firstname: row.firstname, lastname: row.lastname });
            });
            //envoyer le tableau au resultat
            res.send(output);
          }
        }
      });
 });

//Methode POST pour add
 app.post('/add', function (req, res) {
     //recupe l'id etc
    var IdValue = req.body.id;
    var FirstNameValue = req.body.firstname;
    var LastNameValue = req.body.lastname;

    //verrif
    if ((IdValue !== '' && IdValue!== undefined)) {
        //les ? pour ajouter les varribles dans un string la fonction envoie sur err si la requete est invalide (id pas identique)
      db.each('SELECT ID FROM datas WHERE id=? UNION ALL SELECT NULL LIMIT 1', IdValue, function (err, row) {
        if (err) {
          console.log(err)
        }
        if (row.id === null) {
            //envoie la requete
          db.run('INSERT INTO datas VALUES (?, ?, ?) ', IdValue, FirstNameValue, LastNameValue, function (err, row) {
            if (err) {
              console.log(err)
            } 
            else {
              res.send('Success')
            }
          });
        } 
        else {
          res.send('ID already exists')
        }
      });
    } 
    else {
      res.send('Unable to add data. Check syntax.')
    }
  });

//Methode POST pour delete
  app.post('/delete', function (req, res) {
    var IdValue = req.body.id;
    //verrif
    if (IdValue !== '' && IdValue !== undefined) {
        //verrif si l'id match
      db.each('SELECT ID FROM datas WHERE id=? UNION ALL SELECT NULL LIMIT 1', IdValue, function (err, row) {
        if (err) {
          console.log(err);
        }
        if (row.id === null) {
          res.send('You should specify an ID');
        } 
        else {
            //lance la requete
          db.run('DELETE FROM datas WHERE id=?', IdValue, function (err) {
            if (err) {
              console.log(err);
            } 
            else {
              res.send('Success');
            }
          })
        }
      })
    } 
    else {
      res.send('Unable to delete data. Check syntax');
    }
  })

app.set('port',9000);
console.log('Le serveur ecoute sur le port ',app.get('port'));
app.listen(app.get('port'));

//node index.js

//Dans cmd pour le GET   CURL -X GET "localhost:9000/database" [{"id":"1","firstname":"FirstName","lastname":"LastName"}]

//Pour le add  curl -d {\"id\":\"2\",\"firstname\":\"Lewis\",\"lastname\":\"Carroll\"} -H "Content-Type: application/json" -X POST "http://localhost:9000/add"

//Pour le delete   curl -d {\"id\":\"1\"} -H "Content-Type: application/json" -X POST "http://localhost:9000/delete"