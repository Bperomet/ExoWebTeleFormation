import React, {useEffect, useRef} from 'react';
import classes from './Cockpit.css';
import AuthContext from '../../../Context/auth-context';

const cockpit = (props)=>{

   // const toggleBtnRef = useRef(null);

    useEffect(()=>{/*toggleBtnRef.current.click()*/},props.persons);//pour executer la fonction a chaque cycle de vie du composent apres le render

    const assignedclasses = [];
    //let btnClass =[classes.Button];
    let btnClass ='';

    if(props.showPersons){
        btnClass= classes.red;
    }

    if(props.personsLength <= 2){
      assignedclasses.push(classes.red);
    }
    if(props.personsLength <= 1){
      assignedclasses.push('bold');
    }
    //btnClass.push(classes.Red);

    return(
        <div className={classes.cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedclasses.join('  ')}>Welcome to React</p>
            <button
           // ref={toggleBtnRef}
             /*style={style}*/ 
            //className={btnClass.join('  ')} 
            //alt={this.state.showPersons} 
            onClick = {props.clicked}>toggle Persons
            </button>
            <AuthContext.Consumer>
              {(context)=>{<button onClick={context.login}>log in</button>}}
            </AuthContext.Consumer>
        </div>
    );
};

export default React.memo(cockpit);//memo utilisé pour sauvegarder le rendu > optimisation chargement sans que les données changent pas
