import React, { Component } from 'react';
import './App.css';
import FormConnexion from './Views/FormConnexion';
import OptionsPage from './Views/OptionsPage';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import UsersArray from './Views/UsersArray';
import FromAddUser from './Views/FormAddUser'
import ProfilUser from './Views/ProfilUser';
import { createStore } from 'redux'


function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

let store = createStore(counter)


export default class App extends Component{
  constructor(props){
    super(props);

    this.state ={
      logged: false,
      token: null,
      user: null
    }
    //setState est insincrone
  }

  swapMyProfil =()=>{
    this.props.history.push("/Views/FormConnexion");

  }

  handleUser = (data)=> {
    this.setState({user: data})
    console.log(this.state.user);

  }

  handleLogin = (data)=> {
    this.setState({logged: true, token: data})
    console.log(this.state.token);
  }
// user: this.getUser(this.state.token.idUser)
  getUser = (idToken)=>{
    fetch('http://localhost:9500/users/'+idToken,
    {
        method:"GET",
        mode: "cors", 
    })
    .then((res)=>{ 
        if(res.status ===200){
            return res.json();
        }
        else{
            throw new Error("Selection impossible"); 
        }
    })
    .then((data)=>{
        
        this.setState({user: data});
    })
    .catch(console.log)
  }

  render() {
    return (   
        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" 
              render={
                props=>( 
                  <FormConnexion {...props} handleLogin={this.handleLogin} getUser={this.getUser} logged={this.state.logged}/>)}
              />
              <Route exact path="/add" 
                render={
                  props=>( 
                    <FromAddUser {...props} handleLogin={this.handleLogin} logged={this.state.logged}/>)}
              />
              <Route exact path="/useroptions" 
                render={
                  props=>(
                    <OptionsPage  {...props} token={this.state.token} logged={this.state.logged} swapMyProfil={this.swapMyProfil}/>)}
              />
              <Route exact path="/users" 
                render={
                  props=>( 
                    <UsersArray {...props} />)}
              />
              <Route exact path="/users/:id" 
                render={
                  props=>( 
                    <ProfilUser {...props} user={this.state.user} token={this.state.token}/>)}
              />
            </Switch>
          </BrowserRouter>
        </div>
    );
  }
}
//"/users/:id" 