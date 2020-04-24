function Token(_token){
    _token = _token || {};
  
    this.id = _token.id||'';
    this.idUser = _token.idUser||'';
    this.email = _token.email||'';
    this.email = _token.email||'';
    this.password = _token.password||'';

}
  
module.exports ={Token: Token};
 
  /* 
    id token  date creation  date expiration table relier avec l'id

    generer token table gerer la conection recuperer le token en json
  */