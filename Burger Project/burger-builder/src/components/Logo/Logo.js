import React from 'react';
import classes from './Logo.module.css' //Evite d'utiliser la commande npm eject
import burgerLogo from '../../assets/Images/burger-logo.png';
const logo = (props) => (
    <div className={classes.Logo} /*style={{height: props.height}}*/>
        <img src={burgerLogo} alt='MyBurger'/>
    </div>
);

export default logo;