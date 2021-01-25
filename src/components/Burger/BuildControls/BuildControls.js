import React from 'react';
import classes from './BuildControls.css';
import BuildControl from '../BuildControls/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
]

const buildControls = (props)=>
   ( <div className={classes.BuildControls}>
       <p>Curren Price: <strong>{props.price.toFixed(2)}$</strong></p>
       {controls.map((control)=> (
            <BuildControl
             key={control.label} 
             label={control.label}
             add={()=> props.add(control.type)}
             remove= {()=> props.remove(control.type)}
             disableBtn = {props.disableBtn[control.type]}
             />     
      ))}

      
      <button
       className={classes.OrderButton}
       disabled={!props.purchaseable}
       onClick={props.order}>
           {props.isAuth ? 'ORDER NOW!' : 'FIRST SIGN UP...'}
           </button> 
    </div>
);

export default buildControls;