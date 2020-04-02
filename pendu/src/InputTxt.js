import React, { Component } from 'react';



function Input({value, onClick,classBtn}) {
  return (
  <button className = {classBtn}  onClick= {function(e) {onClick(value,e)}}  value= {value}>{value}</button>
  );
}

export default Input;