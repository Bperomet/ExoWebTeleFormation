const crypto = require('crypto');

function Token(_token){
    _token = _token || {};
  
    this.id = _token.id||'';
    this.idUser = _token.idUser||'';
    this.creationDate = _token.creationDate|| new Date().toLocaleString();
    this.expiryDate = _token.expiryDate||this.GetDateExpiry();
    this.token = _token.token||'';

}
Token.prototype.GetDateExpiry = ()=>{
    var date = new Date();
    return new Date(date.getFullYear(),date.getMonth(),date.getDate()+1,date.getHours(),date.getMinutes(),date.getSeconds()).toLocaleString();
}

Token.prototype.TokenOutput = ()=>{
    var hash = crypto.createHash('sha256').update(this.id+"007"+this.creationDate).digest('hex');
    return hash;
}


module.exports ={Token: Token};
   /* 
    generer token table gerer la conection recuperer le token en json
  */