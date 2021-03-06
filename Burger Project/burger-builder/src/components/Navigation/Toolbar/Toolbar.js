import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationsItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className={classes.Logo}>
            <Logo height="80%"/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems  isAuthentificated={props.isAuthentificated}/>
        </nav>
    </header>
);

export default toolbar;