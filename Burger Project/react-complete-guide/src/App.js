import React, { Component } from 'react';
//import './App.css';

import classes from './App.css';
//import Radium, {StyleRoot} from 'radium';
//import styled from 'styled-components';

import Persons from './Components/Persons/Persons';
import Cockpit from './Components/Persons/Cockpit/Cockpit';
import WithClass from './hoc/WithClass';

import AuthContext from './Context/auth-context';
//${} pour inserer dynamiquement en js
/*const StyledButton = styled.button`
  background-color: ${props => props.alt ? 'red': 'green'}; 
  color:white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color:  ${props => props.alt ? 'salmon': 'lightgreen'};
    color: black;
  }
`;*/

class App extends Component {

  constructor(props){
    super(props);
  }

  state = {
    persons:[
      {id:1, name:"Max", age:"27"},
      {id:2, name:"Boby", age:"30"},
      {id:3, name:"betty", age:"45"},
    ],
    showPersons: false,
    changecounter: 0,
    authenticated: false,
  }

  static getDerivedStateFromProps(props,state){
    return state;
  }

  deletePersonHandler = (personIndex) => {
   const persons = [...this.state.persons];
   persons.splice(personIndex,1);
   this.setState({persons: persons});
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p=>{
      return p.id===id;
    });

    const person ={...this.state.persons[personIndex]};
    person.name = event.target.value;
    
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    //maj d'etat dependant de l'ancien état
    this.setState((prevState,props)=>{
      return  {persons: persons, changecounter: this.state.changecounter+1}
    }
    );
  }

  togglePersonsHandler = () => {
    this.setState({showPersons: !this.state.showPersons});
  }

  loginHandler=()=>{
    this.setState({authenticated: true});
  }
  render() {
    
    /* const style = {
      backgroundColor: 'green',
      color:'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover':{
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }
    */
    let persons = null;

    if(this.state.showPersons){
      persons = (     
        <Persons 
        persons={this.state.persons} 
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler}
        />
      );
     /* style.backgroundColor = 'red';
      style[':hover']={
        backgroundColor: 'salmon',
        color: 'black'
      }*/
    }

    //  classes = ['red','bold'].join['  '];
    return (
      //title={this.props.title} this pour recupe le props d'une classe
        <WithClass classes={classes.App}>
          <AuthContext.Provider value={{
            authenticated: this.state.authenticated, 
            login: this.loginHandler}}>
            <Cockpit 
            title={this.props.title} 
            login={this.loginHandler} 
            showPersons={this.state.showPersons} 
            personsLenght={this.state.persons.length} 
            clicked={this.togglePersonsHandler}/>
            {persons}
          </AuthContext.Provider>
        </WithClass>
      
    );
  }
}

export default App;
//<StyledButton/>
//export default Radium(App); <StyleRoot></StyleRoot>

/*this.state.showPersons? :null
  <button onClick = {this.switchNameHandler.bind(this,'by bind (Best method)')}>Switch Bind</button>
  <button onClick = {()=>{this.switchNameHandler('by anonymous')}}>Switch anonymous fonction</button>
  <Person name= {this.state.persons[0].name} age={this.state.persons[0].age}/>
  <Person name= {this.state.persons[1].name} age={this.state.persons[1].age} click={this.switchNameHandler} changed={this.nameChangedHandler}>My Hobbies: Racing</Person>
*/
