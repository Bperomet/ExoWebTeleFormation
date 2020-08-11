import React, { Component } from 'react';
import './App.css';
//import Radium, {StyleRoot} from 'radium';
//import styled from 'styled-components';
import Person from './Person/Person';

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

  state = {
    persons:[
      {id:1, name:"Max", age:"27"},
      {id:2, name:"Boby", age:"30"},
      {id:3, name:"betty", age:"45"},
    ],
    showPersons: false
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

    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    this.setState({showPersons: !this.state.showPersons});
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
      <div>
        {
          this.state.persons.map((person, index)=>{
            return <Person 
            name={person.name} 
            age={person.age} 
            key={person.id} 
            click={()=>this.deletePersonHandler(index)} 
            changed={(event)=> this.nameChangedHandler(event,person.id)}
            />
          })
        }
      </div>
      );
     /* style.backgroundColor = 'red';
      style[':hover']={
        backgroundColor: 'salmon',
        color: 'black'
      }*/
    }

    //  classes = ['red','bold'].join['  '];

    const classes = [];

    if(this.state.persons.length <= 2){
      classes.push('red');
    }
    if(this.state.persons.length <= 1){
      classes.push('bold');
    }

    return (
      
        <div className="App">
            <p className={classes.join('  ')}>Welcome to React</p>
            <button /*style={style}*/alt={this.state.showPersons} onClick = {this.togglePersonsHandler}>toggle Persons</button>
            {persons}
        </div>
      
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
