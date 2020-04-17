const sqlModule = require('./gestionSql');
const userMod = require('./UserModel');
let user = null;

const InitialiseDB = ()=>{
  sqlModule.CreatDB();
}

const GetData = (app)=>{
  app.get('/database', function (req, res) {
    sqlModule.getAll(function(users){
      res.send(users);
    });
 });
};

const AddData = (app)=>{
app.post('/add', function (req, res) {
   var FirstNameValue = req.body.firstname;
   var LastNameValue = req.body.lastname;
   var EmailValue = req.body.email;
   var PasswordValue = req.body.password;
   var DescriptionValue = req.body.description;
   var RoleValue = req.body.role;
   
   user = new userMod.User('',FirstNameValue,LastNameValue,EmailValue,PasswordValue,DescriptionValue,RoleValue);

   sqlModule.add( user, function(callback){
    if (callback !== null) {
      console.log(callback);
    }
    else{
      console.log('La creation a echoue');
    }
  });
 });
};

const TryConect =(app)=>{
 app.post('/connection', function (req, res) {
    var EmailValue = req.body.email;
    var PasswordValue = req.body.password;

    sqlModule.get(EmailValue,PasswordValue, function(user){
      
      if(user != null){

        //Test Update
        user = JSON.parse(user);
        user.firstname = "zebre";
        console.log(user);
        sqlModule.update(user,function(callback){
          if (callback !== null) {
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

const BonusDelete = (app)=>{
  app.post('/delete', function (req, res) {
    var IdValue = req.body.id;
    sqlModule.remove(IdValue,function(callback){
      if (callback) {
        console.log('User supprimer');
      }
      else{
        console.log('suppression impossible');
      }
    });
  });
};

const BonusUpdate = (app)=>{
  app.post('/update', function (req, res) {
    var IdValue = req.body.id;
    
    sqlModule.update(user,function(callback){
      if (callback !== null) {
        console.log(callback);
      }
      else{
        console.log('impossible de faire la modification');
      }
    });
  });
};

  module.exports = {
    get:GetData,
    add:AddData,
    connexion: TryConect,
    delete: BonusDelete,
    initialiseDB: InitialiseDB,
    update: BonusUpdate
  };
/*
curl -d "{\"firstname\" : \"Lewis\",\"lastname\" : \"Carroll\",\"email\" : \"zzzebree11ail.fr\",\"password\" : \"azertyx\",\"description\" : \"je suis une description\",\"role\" : \"Usager\"}" -H "Content-Type: application/json" -X POST "http://localhost:9500/add"
curl -d "{\"email\" : \"zzzebree11ail.fr\",\"password\" : \"azertyx\"}" -H "Content-Type: application/json" -X POST "http://localhost:9500/connection"
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