import React, { Component } from 'react';
import './App.css';

class formConnexion extends Component {
    state = {
        email: null,
        password: null
    };

    change = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    submit = e =>{
        e.preventDefault();
        console.log(this.state);
    }

    render(){
      return(
        <div className="App">
            <form id="FormConnexion" onSubmit={this.submit}>
            <div id="divEmail">
                <label htmlFor="email"> Email :</label>
                <input type="text" id="email" onChange={this.change}/>
            </div>
            <div>
                <label htmlFor="password"> Password :</label>
                <input type="password" id="password" onChange={this.change}/>
            </div>
            <button type="submit" value="Connexion" >Connexion</button>
            </form>
        </div>
      );
  }
}

export default formConnexion;
