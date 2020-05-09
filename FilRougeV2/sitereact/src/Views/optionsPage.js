import React from 'react';

function roleHandler(params) {
    if(true){
        return <a>Gestionnaire d'utilisateurs</a>;
    }
}

const OptionsPage = props => {

      return(
        <div className="App">
                    
      <h1>Bonjour {props.token!==null? props.token:'Pas de token'}</h1>
            <h1>{props.logged?"Connecté":"Non connecté"}</h1>
            <h4>mon Profil</h4>
            <h5>Deconnexion</h5>
        
        </div>
      );
  
}

export default OptionsPage;
