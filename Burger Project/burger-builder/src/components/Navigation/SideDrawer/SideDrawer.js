import React from 'react';
import classes from './SideDrawer.module.css'; //Evite d'utiliser la commande npm eject
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationsItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo /*height="11%"*/ /> 
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>

    );
};

export default sideDrawer;