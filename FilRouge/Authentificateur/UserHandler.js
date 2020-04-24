const sqlModule = require('./gestionSql');
const userMod = require('./User');
var user = null;

function UserHandler(){}

UserHandler.prototype.InitialiseDB = ()=>{
  sqlModule.CreatDB();
}

UserHandler.prototype.GetData = (app)=>{
  app.get('/users', function (req, res) {
    sqlModule.getAll(function(users){
      res.send(JSON.stringify(users));
    });
 });
};

UserHandler.prototype.BonusSelect = (app)=>{
  app.get('/users/:id', function (req, res) {
    
    sqlModule.selectId(req.params.id,function(callbackUser){
      if (callbackUser instanceof userMod.User) {
        res.send(JSON.stringify(callbackUser));
      }
      else{
        res.send({"error":"User not found"});
      }
    });
  });
};

UserHandler.prototype.AddData = (app)=>{
app.post('/add', function (req, res) {

   user = new userMod.User(req.body);
   console.log(user);
   sqlModule.add( user, function(callbackUser){
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

UserHandler.prototype.TryConect =(app)=>{
 app.post('/connection', function (req, res) {

    user = new userMod.User(req.body);
    sqlModule.get(user, function(callbackUser){
      
      if(callbackUser instanceof userMod.User){

        //Test Update
        console.log(callbackUser);
        //res.send({"error":"Creation failed"});

        //Token   retour json + token (cha256)

        callbackUser.firstname = "zebre";

        sqlModule.update(callbackUser ,function(callback){
          if (callbackUser instanceof userMod.User) {
            console.log(callback);
          }
          else{
            console.log(callback +" pas update");
          }
        });
      }
    });
  });
};

UserHandler.prototype.BonusDelete = (app)=>{
  app.post('/delete', function (req, res) {
    var IdValue = req.body.id;

    sqlModule.remove(IdValue,function(callback){
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

UserHandler.prototype.BonusUpdate = (app)=>{
  app.post('/update', function (req, res) {
    
    sqlModule.update(user,function(callbackUser){
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
    UserHandler:UserHandler,
  };
/*
curl -d "{\"firstname\" : \"ajout\",\"lastname\" : \"did??{ier??\",\"email\" : \"zeeroundeux.com\",\"password\" : \"azertyx\",\"description\" : \"je suis une description\",\"role\" : \"Usager\"}" -H "Content-Type: application/json" -X POST "http://localhost:9500/add"
curl -d "{\"email\" : \"sdsd@email.fr\",\"password\" : \"azertyx\"}" -H "Content-Type: application/json" -X POST "http://localhost:9500/connection"
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


*/