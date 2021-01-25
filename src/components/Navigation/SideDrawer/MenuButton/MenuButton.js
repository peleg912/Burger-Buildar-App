import React from 'react';
import classes from './MenuButton.css';

const menuButton = (props)=> (
    <div className={classes.Button} onClick={props.openSideBar}>
            <div></div> 
            <div></div> 
            <div></div> 
    </div> 
   
);


export default menuButton;