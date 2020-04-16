const express = require('express');
const app = express();
app.use(express.json());
const importModule = require('./Authentificateur');
//const importModule = require('./Authentificateur')(app);
importModule.initialiseDB();
importModule.get(app);
importModule.connexion(app);
importModule.add(app);
importModule.delete(app);


app.set('port',9500);
console.log('Le serveur ecoute sur le port ',app.get('port'));
app.listen(app.get('port'));