import React, { Component } from 'react';


function TextVide(props) {
  return (
    <ul>
        <li >Connection</li>
        <li >Options utilisateur</li>
        <li onClick={props.loginLogout}>Deconnection</li>
    </ul>
  );
}

export default TextVide;
//onClick={() => history.push('/')}
//onClick={() => history.push('/useroptions')}
//onClick={() => history.push('/')}