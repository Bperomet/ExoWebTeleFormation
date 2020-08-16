import React from 'react';
import classes from './NavigationItems.module.css' //Evite d'utiliser la commande npm eject
import NavigationItem from './NavigationItem/NavigationItem'
const navigationItems = (props) => (
    <ul  className={classes.NavigationItems}>
        <NavigationItem link="/" active={true}>Burger Builder</NavigationItem>
        <NavigationItem link="/" >Checkout</NavigationItem>
    </ul>
);

export default navigationItems;