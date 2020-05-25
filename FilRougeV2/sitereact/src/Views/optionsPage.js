import React, { Component } from 'react';
import NavigatorBar from './NavigatorBar';

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
    getProfils =()=>{
        if(this.props.token !== null){
            this.props.history.push("/users");
        }
        else{
            this.props.history.push("/");
        }
    }
    loginLogout =()=>{
        this.props.loginLogout();
        this.props.history.push("/");
    }

    render() {
        return (
            <div className="App">
                <NavigatorBar loginLogout={this.loginLogout}/>       
                <h1>Bonjour {this.props.token!==null? this.props.token.idUser:'Pas de token'}</h1>
                <h1>{this.props.logged?"Connecté":"Non connecté"}</h1>
                <h4 onClick={this.getProfil}>mon Profil</h4>
                <h4 onClick={this.getProfils}>Gestion des Profils</h4>
            
            </div>
          );
      
    }
}
