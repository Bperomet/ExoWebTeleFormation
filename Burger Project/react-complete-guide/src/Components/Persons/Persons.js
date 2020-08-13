import React, {PureComponent} from 'react';
import Person from './Person/Person';
//import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

class Persons extends PureComponent {
/*
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.persons !== this.props.persons ||nextProps.changed !== this.props.changed || nextProps.clicked !== this.props.clicked){
            return true;
        }
        else{
            return false;
        }
    }
*/
    render(){
        return(
             this.props.persons.map((person, index)=>{
                return (
                <Person 
                key={person.id}
                name={person.name} 
                age={person.age}  
                click={()=>this.props.clicked(index)} 
                changed={(event)=> this.props.changed(event,person.id)}
                />
                );
            })
        )
    }
} 


export default Persons;

/*
<ErrorBoundary key={person.id}>
</ErrorBoundary>

    (props)=> props.persons.map((person, index)=>{
        return <Person 
        key={person.id}
        name={person.name} 
        age={person.age}  
        click={()=>props.clicked(index)} 
        changed={(event)=> props.changed(event,person.id)}
        />
    }

*/