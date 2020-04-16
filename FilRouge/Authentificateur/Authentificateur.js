const sqlModule = require('./gestionSql');

function User(id,surname,lastname,email,password,descrip,role){
  this.idUser = id||'';
  this.surnameUser = surname||'';
  this.lastnameUser = lastname||'';
  this.emailUser = email||'';
  this.passwordUser = password||'';
  this.descriptionUser = descrip||'';
  this.roleUser = role||'Usager';
}

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

  sqlModule.add(FirstNameValue, LastNameValue, EmailValue, PasswordValue, DescriptionValue, RoleValue, function(callback){
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
      console.log(user);
      if(user != null){
        //console.log(user);
//Test Update
        user ={
          id: user.id,
          firstname: user.firstname,
          lastname: "bambam",
          email: "email@new.ml",
          password: user.password,
          description: user.description,
          role: "Admine", 
        };

        sqlModule.update(user,function(callback){
          if (callback !== null) {
            console.log('User modifier');
          }
          else{
            console.log(callback +" pas update");
          }
        });
      }
    });
  });
};

const BonusDelete =(app)=>{
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

const BonusUpdate =(app)=>{
  app.post('/update', function (req, res) {
    var IdValue = req.body.id;
    
    sqlModule.update(user,function(callback){
      if (callback != null) {
        console.log('User modifier');
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
curl -d "{\"firstname\" : \"Lewis\",\"lastname\" : \"Carroll\",\"email\" : \"test@email.fr\",\"password\" : \"azertyx\",\"description\" : \"je suis une description\",\"role\" : \"Usager\"}" -H "Content-Type: application/json" -X POST "http://localhost:9500/add"
curl -d "{\"email\" : \"email@new.ml\",\"password\" : \"azertyx\"}" -H "Content-Type: application/json" -X POST "http://localhost:9500/connection"
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
     }*/