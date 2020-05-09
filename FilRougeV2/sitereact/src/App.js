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

export default class App extends Component{
  constructor(props){
    super(props);

    this.state ={
      logged: false,
      token: null
    }
  }

  handleLogin = (data)=> {
    this.setState({logged: true, token: JSON.stringify(data)})
    console.log(this.state.token);

  }

  render() {
    return (   
        <div className="App">
          <BrowserRouter>
          <Switch>
            <Route exact path="/" 
            render={
              props=>( 
                <FormConnexion {...props} handleLogin={this.handleLogin} logged={this.state.logged}/>)}
            />
            <Route exact path="/add" 
              render={
                props=>( 
                  <FromAddUser {...props} handleLogin={this.handleLogin} logged={this.state.logged}/>)}
            />
            <Route exact path="/useroptions" 
            render={
              props=>(
                <OptionsPage  {...props} token={this.state.token} logged={this.state.logged}/>)}
            />
            <Route exact path="/users" 
              render={
                props=>( 
                  <UsersArray {...props} />)}
            />
          </Switch>
          </BrowserRouter>
        </div>
    );
  }
}
