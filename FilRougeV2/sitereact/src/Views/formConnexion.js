import React, { Component } from 'react';

//zeeroundeuxs.com
//azertyx
export default class FormConnexion extends Component{
    constructor(props){
      super(props);
      
      this.state ={
        user: null,
        token: null,
        email: "",
        password: ""
      }
    }

    submitConnect = (e) => {
        e.preventDefault();
        fetch('http://localhost:9500/connection',
        {
            method:"POST",
            mode: "cors", 
            headers: {
               "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({'email': this.state.email, 'password': this.state.password})
        })
        .then((res)=>{ 
            if(res.status ===200){
               return res.json();
            }
            else{
                throw new Error("Id incorrect"); 
            }
        })
        .then((data)=>{
            this.successConnect(data);

        })
        .catch(console.log)
      }
    
      change = (e)=> {
         this.setState({[e.target.id]: e.target.value});
      }

      successConnect = (data)=> {
       this.props.handleLogin(data);
       this.props.getUser(data.idUser);
       this.props.history.push("/useroptions");
      }

      clickSub = ()=> {
        this.props.history.push("/add");
       }
       
      render(props) {
        return (
            <div className="App">
                <form id="FormConnexion" onSubmit={this.submitConnect}>
                <div id="divEmail">
                    <label htmlFor="email"> Email :</label>
                    <input type="text" id="email"  onChange={this.change}/>
                </div>
                <div>
                    <label htmlFor="password"> Password :</label>
                    <input type="password" id="password" onChange={this.change}/>
                </div>
                <button type="submit" value="Connexion" >Connexion</button>
                </form>
                <button  value="Inscription" onClick={this.clickSub}>Inscription</button>

            </div>
        );
    }
}
