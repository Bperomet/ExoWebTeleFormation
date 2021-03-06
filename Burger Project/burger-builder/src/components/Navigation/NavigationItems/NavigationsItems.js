import React from 'react';
import classes from './NavigationItems.module.css' //Evite d'utiliser la commande npm eject
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul  className={classes.NavigationItems}>
        <NavigationItem link="/" exact >Burger Builder</NavigationItem>
        {props.isAuthentificated ? <NavigationItem link="/orders" >Orders</NavigationItem> : null}
        {!props.isAuthentificated ? 
        <NavigationItem link="/auth" >Authenticate</NavigationItem>
        :
        <NavigationItem link="/logout" >Logout</NavigationItem>
    }    
    </ul>
);

export default navigationItems;