import React, { Component } from 'react';
import './App.css';

let tabStr = ['DICTIONNAIRE','CHAT','BROCOLI'];
let rdm = parseInt(Math.random()*(tabStr.length-0)+0);
let tabWord = tabStr[rdm].split('');
let tab = addTab(tabWord);


function addTab(tabWord){
    let tab =[];
    tabWord.forEach(element => {
        tab.push({etat: "hidden",value: element});
    });
    return tab;
}

const Td = ({ value,feedBack})=>( <td >{feedBack==='hidden'? " ": value}</td>);

function TextVide() {
  return (
    <table>
        <thead >
            <tr>
            {tab.map((elmt,index )=>(<Td key={index} value={elmt.value} feedBack ={ elmt.etat }/>))}
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