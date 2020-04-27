const express = require('express');
const app = express();
app.use(express.json());
const importModule = require('../Controllers/Handler');

const authentificateur = new importModule.Handler();

authentificateur.InitialiseDB();
authentificateur.GetData(app);
authentificateur.TryConect(app);
authentificateur.AddData(app);
authentificateur.BonusDelete(app);
authentificateur.BonusSelect(app);

const importModuleToken = require('../Controllers/TokenHandler');
const tokenHandler = new importModuleToken.TokenHandler();

tokenHandler.GetDataTokens(app);


var date = new Date();
var dateNow =date.toLocaleString();
var dateExpi = new Date(date.getFullYear(),date.getMonth(),date.getDate()+1,date.getHours(),date.getMinutes(),date.getSeconds()).toLocaleString();

console.log(dateNow);
console.log(dateExpi);



app.set('port',9500);
console.log('Le serveur ecoute sur le port ',app.get('port'));
app.listen(app.get('port'));

//const importModule = require('./Authentificateur')(app);
