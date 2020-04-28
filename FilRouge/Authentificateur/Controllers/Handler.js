const sqlUser = require('../SqlHandler/GestionSqlUser');
const sqlTokens = require('../SqlHandler/GestionSqlToken');
const userMod = require('../Models/User');
const tokenMod = require('../Models/Token');
const sqlToken = new sqlTokens.SqlToken();

var user = null;
var tokenUser = null;

function Handler(){}

Handler.prototype.InitialiseDB = ()=>{
  sqlUser.CreatDB();
  sqlToken.CreatDB();
}

Handler.prototype.GetUsers = (app)=>{
  app.get('/users', function (req, res) {
    sqlUser.getAll(function(users){
      res.send(JSON.stringify(users));
    });
 });
};

Handler.prototype.SelectUser = (app)=>{
  app.get('/users/:id', function (req, res) {

    if(tokenUser instanceof tokenMod.Token && tokenUser.token != null){

      sqlUser.selectId(req.params.id,function(callbackUser){
        if (callbackUser instanceof userMod.User && callbackUser.id === tokenUser.idUser) {
          res.send(JSON.stringify(callbackUser));
        }
        else{
          res.send({"error":"User not found"});
        }
      });
    }
    else
    {
      res.send({"error":"Token not found"});
    }
  });
};

Handler.prototype.AddData = (app)=>{
app.post('/add', function (req, res) {

   user = new userMod.User(req.body);

   sqlUser.add( user, function(callbackUser){
    if (callbackUser instanceof userMod.User) {

      res.send(JSON.stringify(callbackUser));    
    }
    else{
      console.log('La creation a echoue');
      res.send({"error":"Creation failed"});
    }
  });
 });
};

Handler.prototype.TryConect =(app)=>{
 app.post('/connection', function (req, res) {

    user = new userMod.User(req.body);
    sqlUser.get(user, function(callbackUser){

      if(callbackUser instanceof userMod.User){

        sqlToken.SelectCurrentTokenUser(callbackUser,function(callbackToken){

          if (callbackToken instanceof tokenMod.Token && new Date().toLocaleString()<callbackToken.expiryDate) {
            tokenUser = callbackToken;
console.log(tokenUser);

            res.send(JSON.stringify(callbackToken));    
          }
          else{
            sqlToken.Create(callbackUser,function(callbackNewToken){
              if (callbackNewToken instanceof tokenMod.Token) {
                tokenUser = callbackToken;
                res.send(JSON.stringify(callbackNewToken));    
              }
              else{
                tokenUser = callbackToken;
                console.log('La creation a echoue');
                res.send({"error":"Creation failed"});
              }
            });
          }
        });
      }
    });
  });
};

Handler.prototype.DeleteUser = (app)=>{
  app.post('/delete', function (req, res) {
    var IdValue = req.body.id;

    sqlUser.remove(IdValue,function(callback){
      if (callback) {
        console.log('User supprimer');
        res.send({"action":"User deleted"});
      }
      else{
        console.log('suppression impossible');
        res.send({"error":"Deletion failed"});

      }
    });
  });
};

Handler.prototype.UpdateUser = (app)=>{
  app.post('/update', function (req, res) {
    
    sqlUser.update(user,function(callbackUser){
      if (callbackUser instanceof userMod.User) {

        console.log(callbackUser);
        res.send(JSON.stringify(callbackUser));    
      }
      else{
        console.log('impossible de faire la modification');
        res.send({"error":"Impossible to modify"});
      }
    });
  });
};

module.exports = {
  Handler:Handler,
};
/*
curl -d "{\"firstname\" : \"ajout\",\"lastname\" : \"did??{ier??\",\"email\" : \"zeeroundeux.com\",\"password\" : \"azertyx\",\"description\" : \"je suis une description\",\"role\" : \"Usager\"}" -H "Content-Type: application/json" -X POST "http://localhost:9500/add"
curl -d "{\"email\" : \"zeeroundeux.com\",\"password\" : \"azertyx\"}" -H "Content-Type: application/json" -X POST "http://localhost:9500/connection"
curl -d "{\"id\" : \"20\"}" -H "Content-Type: application/json" -X POST "http://localhost:9500/delete"
*/
     //   app.set('view engine','ejs');
    // user =null;
   //  console.log(user)
   /* if(user !== null){
      if(user.role==='administrateur'){
        // res.render('/AdminPage');
       //  res.send('Vous etes dans la zone de gestion faite pour les administrateur!');
       }
       else{
        // res.render('index.html');
        // res.send('Vous etes dans la zone faite pour les utilisateur!');
       }
     }

        //Test Update
        //res.send({"error":"Creation failed"});

        //Token   retour json + token (cha256)

  /*      callbackUser.firstname = "zebre";

        sqlUser.update(callbackUser ,function(callback){
          if (callbackUser instanceof userMod.User) {
            console.log(callback);
          }
          else{
            console.log(callback +" pas update");
          }
        });*/

