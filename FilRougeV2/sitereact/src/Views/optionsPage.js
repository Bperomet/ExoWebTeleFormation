import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

function roleHandler(params) {
    if(true){
        return <a>Gestionnaire d'utilisateurs</a>;
    }
    
}
//<roleHandler/>
function optionsPage({user}) {
      return(
        <div className="App">
            <head>
                <h1>Bonjour {user}</h1>
            </head>
            <div>
                <a>mon Profil</a>
                
                <a>Deconnexion</a>
            </div>
        </div>
      );
  
}

export default optionsPage;
