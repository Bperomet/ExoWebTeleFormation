import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">

      </header>
      <form id="FormConnexion">
        <div id="divEmail">
          <label> Email :</label>
          <input type="text" name="Email"/>
        </div>
        <div>
          <label> Password :</label>
          <input type="password" name="Password"/>
        </div>


          <button type="submit" value="Connexion">Connexion</button>
      </form>
    </div>
  );
}

export default App;
