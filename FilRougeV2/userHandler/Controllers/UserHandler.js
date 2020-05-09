const sqlUser = require('../SqlHandler/GestionSqlUser');
const sqlTokens = require('../SqlHandler/GestionSqlToken');
const userMod = require('../Models/User');
const tokenMod = require('../Models/Token');
const sqlToken = new sqlTokens.SqlToken();

var user = null;
var tokenUser = null;

function UserHandler(){}

UserHandler.prototype.InitialiseDB = ()=>{
  sqlUser.CreatDB();
  sqlToken.CreatDB();
}

UserHandler.prototype.GetUsers = (req, res)=>{
    sqlUser.getAll(function(users){

      if(users !== undefined){
        res.status(200).send(JSON.stringify(users));
      }
      else{
        res.status(418).send({"error":"I'm a teapot"});
      }
    });
};

UserHandler.prototype.SelectUser = (req, res)=>{
    if(tokenUser instanceof tokenMod.Token && tokenUser.token != null){

      sqlUser.selectId(req.params.id,function(callbackUser){
        if (callbackUser instanceof userMod.User && callbackUser.id === tokenUser.idUser) {
          res.status(200).send(JSON.stringify(callbackUser));
        }
        else{
          res.status(418).send({"error":"User not found"});
        }
      });
    }
    else
    {
      res.send({"error":"Token not found"});
    }
};

UserHandler.prototype.AddData = (req, res)=>{
   user = new userMod.User(req.body);
   //console.log(user);
   sqlUser.add( user, function(callbackUser){

    if (callbackUser instanceof userMod.User) {
      
        sqlToken.SelectCurrentTokenUser(callbackUser,function(callbackToken){

          if (callbackToken instanceof tokenMod.Token && new Date().getTime()<new Date(callbackToken.expiryDate).getTime()) {
            tokenUser = callbackToken;

            res.status(200).send(JSON.stringify(callbackToken));    
          }
          else{
            sqlToken.Create(callbackUser,function(callbackNewToken){
              if (callbackNewToken instanceof tokenMod.Token) {
                tokenUser = callbackToken;

                res.status(200).send(JSON.stringify(callbackNewToken));
              }
              else{
                tokenUser = callbackToken;
                res.status(418).send({"error":"I'm a teapot or not"});
              }
            });
          }
        });
    }
    else{
      res.status(418).send({"error":"Creation failed"});
    }
  });
};

UserHandler.prototype.TryConect =(req, res)=>{
    user = new userMod.User(req.body);
    sqlUser.get(user, function(callbackUser){

      if(callbackUser instanceof userMod.User){
        sqlToken.SelectCurrentTokenUser(callbackUser,function(callbackToken){

          if (callbackToken instanceof tokenMod.Token && new Date().getTime()<new Date(callbackToken.expiryDate).getTime()) {
            tokenUser = callbackToken;

            res.status(200).send(JSON.stringify(callbackToken));    
          }
          else{
            sqlToken.Create(callbackUser,function(callbackNewToken){
              if (callbackNewToken instanceof tokenMod.Token) {
                tokenUser = callbackToken;

                res.status(200).send(JSON.stringify(callbackNewToken));
              }
              else{
                tokenUser = callbackToken;
                res.status(418).send({"error":"I'm a teapot"});
              }
            });
          }
        });
      }
      else{
        res.status(401).send({"error":"connection failed"});
      }
    });
};

UserHandler.prototype.DeleteUser = (req, res)=>{
    var IdValue = req.body.id;

    sqlUser.remove(IdValue,function(callback){
      if (callback) {
        res.status(200).send({"action":"User deleted"});
      }
      else{
        res.status(418).send({"error":"I'm a teapot"});
      }
    });
};

UserHandler.prototype.UpdateUser = (req, res)=>{
    sqlUser.update(user,function(callbackUser){
      if (callbackUser instanceof userMod.User) {

        console.log(callbackUser);
        res.status(200).send(JSON.stringify(callbackUser));    
      }
      else{
        res.status(418).send({"error":"Impossible to modify"});
      }
    });
};

module.exports = {
  UserHandler:UserHandler,
};

/*
curl -d "{\"firstname\" : \"ajout\",\"lastname\" : \"did??{ier??\",\"email\" : \"zeeroundeuxs.com\",\"password\" : \"azertyx\",\"description\" : \"je suis une description\",\"role\" : \"Usager\"}" -H "Content-Type: application/json" -X POST "http://localhost:9500/add"
curl -d "{\"email\" : \"zeeroundeuxs.com\",\"password\" : \"azertyx\"}" -H "Content-Type: application/json" -X POST "http://localhost:9500/connection"
curl -d "{\"id\" : \"20\"}" -H "Content-Type: application/json" -X POST "http://localhost:9500/delete"
*/
