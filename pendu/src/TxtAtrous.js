import React, { Component } from 'react';
import './App.css';

const Td = ({ value,feedBack})=>( <td >{feedBack==='hidden'? "_": value}</td>);

function TextVide({tableau}) {
  return (
    <table>
        <thead >
            <tr>
            {tableau.map((elmt,index )=>(<Td key={index} value={elmt.value} feedBack ={ elmt.etat }/>))}
            </tr>
        </thead>
    </table>
  );
}

export default TextVide;

/*
function CreateTd(){
    let elemTd =[];
    for (let index = 0; index < tabStr[rdm].length; index++) {
        var td = React.createElement('td',{}," ");
        td.key = index;
        elemTd.push(td);
       //elemTd.push(<lettre ltr={tabStr[rdm][index]} feedBack="ded"/>);
    }
   return elemTd;
   Lettre = new Lettre(elmt,feedBack="")
}*/