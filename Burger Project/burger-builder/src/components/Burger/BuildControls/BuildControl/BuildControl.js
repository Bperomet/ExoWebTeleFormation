import React from 'react';
import classes from './BuildControl.module.css'

const buildControl = (props) =>(
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button 
            className={classes.Less} 
            onClick={props.removed} 
            disabled={props.disabled}/*Methode de desactivation du bouton avec boolean*/>
                Less
        </button>
        <button 
            className={classes.More} 
            onClick={props.added}>
                More
        </button>
    </div>
);

export default buildControl;