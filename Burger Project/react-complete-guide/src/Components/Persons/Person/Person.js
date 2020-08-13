import React, { Component } from 'react';

import PropTypes from 'prop-types';

//import Radium from 'radium';
import styled from 'styled-components';
import './Person.css';
import Auxiliary from '../../../hoc/Auxiliary';
// props.children mot reservé pour recuperer entre les 2 balises


const StyledDiv = styled.div`
    width: 60%;
    margin: 16px auto;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 16px;
    text-align: center;

    @media(min-width: 500px){   
            width: 450px;
    }
`;
const style = {
    '@media(min-width: 500px)':{
        width: '450px',
        color: 'purple'
    }
  }
class Person extends Component{

    constructor(props){
        super(props);
        this.inputElementRef = React.createRef();
    }

    componentDidMount(){
        //this.inputElement.focus();
        this.inputElementRef.current.focus();
    }

    render(){
        return (
          //  <div className='Person' style={style}>
         // <Auxiliary>  PAREIL que le FRAGMENT
        <React.Fragment>
            <StyledDiv>
                <h1 onClick={this.props.click}>My name is { this.props.name }, i'm { this.props.age } </h1>
                <p>{ this.props.children }</p>
                <input 
                type='text'
                ref={this.inputElementRef} 
                //ref={(inputEl=>{this.inputElement=inputEl})} 
                onChange={this.props.changed}/>
            </StyledDiv>
        </React.Fragment>
           // </Auxiliary>
         //   </div>
        )
        /*
        //Tableau d'elements jsx non encapsulés
            render(){
                return [

                        <h1 key="i1" onClick={this.props.click}>My name is { this.props.name }, i'm { this.props.age } </h1>,
                        <p key="i2">{ this.props.children }</p>,
                        <input type='text' key="i3" onChange={this.props.changed}/>

                    ]
    
        */
    }
} 
Person.propTypes ={
    click: PropTypes.func,
    changed: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.string
};

export default Person;
//export default Radium(person);
//// props.children mot reservé pour recuperer entre les 2 balises

/*= (props)=>{
    const style = {
        '@media(min-width: 500px)':{
            width: '450px',
            color: 'purple'
        }
      }
    
   return (
    <div className='Person' style={style}>
    <StyledDiv>
        <h1 onClick={props.click}>My name is { props.name }, i'm { props.age } </h1>
        <p>{ props.children }</p>
        <input type='text' onChange={props.changed}/>
    </StyledDiv>
    </div>
)


*/