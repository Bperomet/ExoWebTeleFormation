import React, { Component } from 'react';

export default class OptionsPage extends Component{
    constructor(props){
      super(props);
    }
    getProfil =()=>{
        if(this.props.token !== null){
            this.props.history.push("/users/"+this.props.token.idUser);
        }
        else{
            this.props.history.push("/");
        }
    }
    
    render() {
        return (
            <div className="App">       
                <h1>Bonjour {this.props.token!==null? this.props.token.id:'Pas de token'}</h1>
                <h1>{this.props.logged?"Connecté":"Non connecté"}</h1>
                <h4 onClick={this.getProfil}>mon Profil {this.props.user}</h4>
    
                <h5>Deconnexion</h5>
            
            </div>
          );
      
    }
}
