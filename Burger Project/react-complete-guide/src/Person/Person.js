import React from 'react';
//import Radium from 'radium';
import styled from 'styled-components';
import './Person.css';

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

const person = (props)=>{
    /*const style = {
        '@media(min-width: 500px)':{
            width: '450px',
            color: 'purple'
        }
      }
    */
    return (
        //<div className='Person' style={style}>
        <StyledDiv>
            <h1 onClick={props.click}>I'm a Person my name is { props.name }, i'm { props.age } </h1>
            <p>{ props.children }</p>
            <input type='text' onChange={props.changed}/>
        </StyledDiv>
        //</div>
    )
}
export default person;
//export default Radium(person);