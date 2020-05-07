import React, { Component } from 'react';
import './App.css';
import FormConnexion from './Views/formConnexion';
import optionsPage from './Views/optionsPage';
import {
  BrowserRouter, Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
//import userModel from './Models/User';

export default class App extends Component{
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
    console.log(this.state.email);
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
        throw new Error("Id incorrect"); 
    })
    .then((data)=>{
        console.log(data);
        this.setState({token: data});
    }
    )
    .catch(console.log)
  }

  change = (e)=> {
    if(e.target.id ==="email"){

       this.setState({email: e.target.value});

       console.log(e.target.value);
    }
    else if(e.target.id === "password"){
      this.setState({password: this.state.password + e.target.value});
    }
  }


  render() {
    return (   
        <div className="App">
          <BrowserRouter>
          {this.state.token === null? 
            <Route exact path="/" component ={() => <FormConnexion onSubmit={this.submitConnect} onChange={this.change}/>}/>:
            <Route exact path="/useroptions" component ={() => <optionsPage user={this.state.token}/>}/>
          }

          </BrowserRouter>
        </div>
    );
  }
}

 /* ProtectedComponent = () => {
    if (this.state.token===null){
      return <Redirect to='/' component ={() => <FormConnexion onSubmit={this.submitConnect} onChange={this.change}/>} />
    }
    else{
      return <Redirect to='/useroptions' component ={() => <optionsPage props={this.state.user}/>} />
    }
  }*/

//<BrowserRouter>
/*
  ProtectedComponent = () => {
    if (this.state.token===null){
      return <Redirect to='/' component ={() => <FormConnexion onSubmit={this.submitConnect} onChange={this.change}/>} />
    }
    else{
      return <Redirect to='/useroptions' component ={() => <optionsPage props={this.state.user}/>} />
    }
  }
    
*/