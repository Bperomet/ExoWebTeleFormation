const express = require('express');
const app = express();
var cors = require('cors');
app.use(express.json());
app.use(cors());
const importModule = require('../Controllers/UserHandler');

const userHandler = new importModule.UserHandler();

userHandler.InitialiseDB();

app.get('/users', function (req, res){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    userHandler.GetUsers(req, res);
});

app.post('/connection', function (req, res){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers',  "origin");
    //res.setHeader('Access-Control-Allow-Methods: POST');
    //res.setHeader('Access-Control-Allow-Headers: POST');

    userHandler.TryConect(req, res);
});

app.post('/add', function (req, res){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers',  "origin");
    userHandler.AddData(req, res);
});

app.get('/users/:id', function (req, res){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    userHandler.SelectUser(req, res);
});

app.get('/delete/:id', function (req, res){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    userHandler.DeleteUser(req, res);
});
app.get('/update/:id', function (req, res){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    userHandler.UpdateUser(req, res);
});

app.set('port',9500);
console.log('Le serveur ecoute sur le port ',app.get('port'));
app.listen(app.get('port'));

