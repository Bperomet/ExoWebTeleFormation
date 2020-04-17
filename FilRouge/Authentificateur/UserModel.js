function User(id,surname,lastname,email,password,descrip,role){
    this.id = id||'';
    this.firstname = surname||'';
    this.lastname = lastname||'';
    this.email = email||'';
    this.password = password||'';
    this.description = descrip||'';
    this.role = role||'Usager';
  }

  module.exports ={User: User};