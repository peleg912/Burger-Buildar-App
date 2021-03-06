import React from 'react';
import classes from './Input.css';

const input = (props)=> {
    let inputElement = null;

    switch(props.elementType){
        case('input'):
            inputElement = 
            <input
             className={classes.InputElement}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
            />


            break;

        case('textarea'):
            inputElement = 
            <textarea
             className={classes.InputElement}
             {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
            />
            break;

         case('select'):
            inputElement = (
            <select
             className={classes.InputElement}
            value={props.value}
            onChange={props.changed}>
               {props.elementConfig.options.map((opt)=>{
                   return(
                       <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
                   )
               })}
            </select>)
            break;

        default:
            inputElement= 
            <input 
            onChange={props.changed}
            className={classes.InputElement} 
            {...props.elementConfig}
            value={props.value}/>
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Lable}>{props.lable}</label>
            {inputElement}
        </div>
    )
};

export default input;