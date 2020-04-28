const express = require('express');
const app = express();
app.use(express.json());
const importModule = require('../Controllers/UserHandler');

const authentificateur = new importModule.UserHandler();

authentificateur.InitialiseDB();
authentificateur.GetUsers(app);
authentificateur.TryConect(app);
authentificateur.AddData(app);
authentificateur.DeleteUser(app);
authentificateur.SelectUser(app);

const importModuleToken = require('../Controllers/TokenHandler');
const tokenHandler = new importModuleToken.TokenHandler();

tokenHandler.GetTokens(app);


app.set('port',9500);
console.log('Le serveur ecoute sur le port ',app.get('port'));
app.listen(app.get('port'));

//const importModule = require('./Authentificateur')(app);
