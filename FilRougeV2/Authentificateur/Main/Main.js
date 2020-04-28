const express = require('express');
const app = express();
app.use(express.json());
const importModule = require('../Controllers/UserHandler');

const routerUser = new importModule.UserHandler();

routerUser.InitialiseDB();

app.get('/users', function (req, res){
    routerUser.GetUsers(req, res);
});

app.get('/users/:id', function (req, res){
    routerUser.SelectUser(req, res);
});

app.post('/connection', function (req, res){
    routerUser.TryConect(req, res);
});

app.post('/add', function (req, res){
    routerUser.AddData(req, res);
});

app.set('port',9500);
console.log('Le serveur ecoute sur le port ',app.get('port'));
app.listen(app.get('port'));

