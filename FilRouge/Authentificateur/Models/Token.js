const crypto = require('crypto');

function Token(_token){
    _token = _token || {};
  
    this.id = _token.id||'';
    this.idUser = _token.idUser||'';
    this.creationDate = _token.creationDate|| new Date().toLocaleString;
    this.expiryDate = _token.expiryDate||new Date(date.getFullYear(),date.getMonth(),date.getDate()+1,date.getHours(),date.getMinutes(),date.getSeconds()).toLocaleString();
    this.token = _token.token||this.TokenOutput;

}

Token.prototype.TokenOutput = ()=>{
    var hash = crypto.createHash('sha256').update(this.id).digest('hex');
    return hash;
}

module.exports ={Token: Token};
 
   /* 
    generer token table gerer la conection recuperer le token en json
  */