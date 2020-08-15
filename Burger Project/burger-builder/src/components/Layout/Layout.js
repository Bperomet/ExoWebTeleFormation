import React from 'react';
import Aux from '../../hoc/Aux'
import Toolbar from '../Navigation/Toolbar';
import classes from './Layout.module.css' //Evite d'utiliser la commande npm eject

const layout = (props) => (
    <Aux>
        <Toolbar/>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;