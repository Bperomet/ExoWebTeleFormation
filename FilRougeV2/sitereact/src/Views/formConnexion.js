import React, { Component } from 'react';

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
        fetch('http://localhost:9500/connection',
        {
            method:"POST",
          //  mode: "cors", 
         //   cache: "no-cache", 
          //  credentials: "same-origin", 
            headers: {
               "Accept": "application/json",
                "Content-Type": "application/json",
            },

            body: JSON.stringify({'password': this.state.password})
        })
        .then(res=> res.json())
        .then((data)=>console.log(data))
        .catch(console.log)

       /* fetch('http://localhost:9500/Users')
        .then(res=> res.json())
        .then((data)=>console.log(data))
        .catch(console.log)*/
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
