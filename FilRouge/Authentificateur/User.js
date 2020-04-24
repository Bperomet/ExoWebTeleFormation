function User(_user){
  _user = _user || {};

  this.id = _user.id||'';
  this.firstname = this.StringVerification(_user.firstname)||'';
  this.lastname = this.StringVerification(_user.lastname)||'';
  this.email = _user.email||'';
  this.password = _user.password||'';
  this.description = _user.description||'';
  this.role = _user.role||'Usager';
}

User.prototype.StringVerification();///////////////////////////////

function StringVerification(text){
  if(typeof text === 'string'){
     return text.replace(/[.*+?^$<>{}()|[\]\\]/g, '');
  }
  return '';
};

  module.exports ={User: User};
  /* 
    id token  date creation  date expiration table relier avec l'id

    generer token table gerer la conection recuperer le token en json
  */