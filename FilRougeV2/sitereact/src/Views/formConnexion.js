import React, { Component } from 'react';
import {useHistory,withRouter} from 'react-router-dom';
import  { Route } from 'react-router-dom'

//import history from '../../node_modules/history';
// email: zeeroundeuxs.com
// pswd:  azertyx

/*
let email= null;
let password= null;

function submit (e,token) {
    e.preventDefault();
    fetch('http://localhost:9500/connection',
    {
        method:"POST",
        mode: "cors", 
        headers: {
           "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({'email': email, 'password': password})
    })
    .then((res)=>{ 
        if(res.status ===200){
            return res.json();
        }
        throw new Error("Id incorrect"); 
    })
    .then((data)=>{
        console.log(data);
        token = data;
    }
    )
    .catch(console.log)

}

function change (e) {
    if(e.target.id ==="email"){
        email = e.target.value;
    }
    else if(e.target.id === "password"){
        password = e.target.value;
    }
};
*/

const formConnexion = ({onSubmit,onChange})=> {
    
    return(
    <div className="App">
        <form id="FormConnexion" onSubmit={function(e){onSubmit(e)}}>
        <div id="divEmail">
            <label htmlFor="email"> Email :</label>
            <input type="text" id="email"  onChange={onChange}/>
        </div>
        <div>
            <label htmlFor="password"> Password :</label>
            <input type="password" id="password" onChange={onChange}/>
        </div>
        <button type="submit" value="Connexion" >Connexion</button>
        </form>
    </div>
    );
}

export default formConnexion;

        //var history = useHistory();
       // history.push('/optionsPage');
        //return  <Redirect to='/optionsPage'  />
        //<Route exact path="/optionsPage" />
        //props.history.push('/optionsPage');