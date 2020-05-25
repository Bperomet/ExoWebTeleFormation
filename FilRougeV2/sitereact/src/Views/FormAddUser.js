import React, { Component } from 'react';

//zeeroundeuxs.com
//azertyx
export default class FormAddUser extends Component{
    constructor(props){
      super(props);
      
      this.state ={
        user: null,
        token: null,
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        description: ""
      }
    }

    submitAdd = (e) => {
        e.preventDefault();
        fetch('http://localhost:9500/add',
        {
            method:"POST",
            mode: "cors", 
            headers: {
               "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'firstname': this.state.firstname, 
                'lastname': this.state.lastname,
                'email': this.state.email, 
                'password': this.state.password, 
                'description': this.state.description
            })
        })
        .then((res)=>{ 
            if(res.status ===200){
               return res.json();
            }
            else{
                throw new Error("Can't created"); 
            }
        })
        .then((data)=>{
            this.successAdd(data);

        })
        .catch(console.log)
      }
    
      change = (e)=> {
         this.setState({[e.target.id]: e.target.value});
      }

      successAdd = (data)=> {

        
       this.props.handleLogin(data);
       this.props.history.push("/useroptions");
      }

      backConnexion =()=>{
        this.props.history.push("/");
      }

      render() {
        return (
            <div className="App">
                <form id="FormAddUser" onSubmit={this.submitAdd}>
                <div id="divEmail">
                    <label htmlFor="email"> Email :</label>
                    <input type="text" id="email"  onChange={this.change}/>
                </div>
                <div>
                    <label htmlFor="password"> Password :</label>
                    <input type="password" id="password" onChange={this.change}/>
                </div>
                <div>
                    <label htmlFor="firstname"> Firstname :</label>
                    <input type="text" id="firstname" onChange={this.change}/>
                </div>
                <div>
                    <label htmlFor="lastname"> Lastname :</label>
                    <input type="text" id="lastname" onChange={this.change}/>
                </div>
                <div>
                    <label htmlFor="description"> Description :</label>
                    <input type="text" id="description" onChange={this.change}/>
                </div>
                <button type="submit" value="Add" >Créer</button>
                </form>
                <button onClick={this.backConnexion} >Retour</button>
            </div>
        );
    }
}