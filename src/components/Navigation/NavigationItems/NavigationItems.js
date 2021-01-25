import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem';

const navigationItems = (props)=>(
   <ul className={classes.NavigationItems}>

       <NavigationItem link="/">Burger Builder</NavigationItem>

       {props.isAuth ?  <NavigationItem link="/my-orders">My Orders</NavigationItem> : null}

       {props.isAuth ? <NavigationItem link="/logout">Logout</NavigationItem> :
       <NavigationItem link="/auth">Login</NavigationItem>}
       
   </ul>
);

export default navigationItems;