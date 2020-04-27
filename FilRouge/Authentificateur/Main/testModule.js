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


app.set('port',9500);
console.log('Le serveur ecoute sur le port ',app.get('port'));
app.listen(app.get('port'));

//const importModule = require('./Authentificateur')(app);
