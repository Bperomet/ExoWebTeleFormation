function User(_user){
  _user = _user || {};

  this.id = _user.id||'';
  this.firstname = StringVerification(_user.firstname)||'';
  this.lastname = StringVerification(_user.lastname)||'';
  this.email = _user.email||'';
  this.password = _user.password||'';
  this.description = _user.description||'';
  this.role = _user.role||'Usager';
}

function StringVerification(text){
  if(typeof text === 'string'){
     return text.replace(/[.*+?^$<>{}()|[\]\\]/g, '');
  }
  return '';
};

  module.exports ={User: User};