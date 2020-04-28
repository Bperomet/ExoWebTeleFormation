const sqlTokens = require('../SqlHandler/GestionSqlToken');
const sqlToken = new sqlTokens.SqlToken();

function TokenHandler(){};

TokenHandler.prototype.GetTokens = (app)=>{
    app.get('/tokens', function (req, res) {
      sqlToken.SelectAll(function(tokens){
        res.send(JSON.stringify(tokens));
      });
   });
};

module.exports = { TokenHandler:TokenHandler };