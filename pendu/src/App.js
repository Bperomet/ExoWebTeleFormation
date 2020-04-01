import React from 'react';
import './App.css';
import TextVide from './TxtAtrous';
import Input from './InputTxt';

let alphab="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
alphab=alphab.split('');

function EventInput(e){

}

function App() {
  return (
    <div className="App">
      <h1>Jeu du pendu</h1>
      <TextVide/>
      <Input onClick= {EventInput()}/>
  </div>
  );
}

export default App;
