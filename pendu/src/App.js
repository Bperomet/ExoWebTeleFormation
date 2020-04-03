import React, { Component } from 'react';
import './App.css';
import TextVide from './TxtAtrous';
import Input from './InputTxt';

const tabStr = ['DICTIONNAIRE','CHAT','BROCOLI'];

export default class App extends Component{
  constructor(props){
    super(props);
    
    this.state ={
      tab: this.tabCreat(),
      alph: this.addClass(),
      faute: 0,
    }
  }
  addClass(){
    let tbl = [];
    let alphab = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(let a of alphab){
      tbl.push({lettre: a ,value:"nclique"});
    }
    return tbl;
  }

  tabCreat(){
    let rdm= parseInt(Math.random()*(tabStr.length-0)+0);
    let tabWord= tabStr[rdm].split('');
    return this.addTab(tabWord);
  }

  addTab(tabWord){
    let tab =[];
    tabWord.forEach(element => {
        tab.push({etat: "hidden",value: element});
    });
    return tab;
  }


  EventInput = (ltr,e)=>{

    var alphTab = this.state.alph;
    for(let al of alphTab){
      if(al.lettre === ltr){
        al.value = "cliquer";
      }
    }
    this.setState({alph: alphTab});
    console.log(this.state.alph);
    var fin = true;
    var valide = false;
    var a = this.state.tab;

    for(let c of a){
      
      if(c.etat ==="hidden" && c.value ===ltr){
        c.etat="trouver"
        valide = true;
      }

      if(c.etat ==="hidden"){
        fin = false;
      }
    }
    this.setState({tab: a});

    if(valide == false){
      var f = this.state.faute+1;
      this.setState({faute: f});
      if(this.state.faute == 4){
        if(window.confirm("Perdu! Voulez-vous rejouer?")){

          console.log(this.state.btnClass);
          this.setState( {tab: this.tabCreat(),faute: 0, alph: this.addClass()});
          console.log(this.state.btnClass);
        }
      }
    }

    if(fin){
      if(window.confirm("Gagnier! Voulez-vous rejouer?")){
        this.setState( {tab: this.tabCreat(),faute: 0, alph: this.addClass()});
      }
    }

  }

  render() {
    return (
      <div className="App">
        <h1>Jeu du pendu</h1>
        <TextVide tableau={this.state.tab}/>
        <h4>Faute = {this.state.faute}</h4>
        <div className ='zoneBtn'>
        {this.state.alph.map((elemt,index)=>(
          <Input key={index}  value={elemt.lettre} onClick= {this.EventInput} classBtn ={elemt.value}/>
        ))}
        </div>

    </div>
    );
  }
}



