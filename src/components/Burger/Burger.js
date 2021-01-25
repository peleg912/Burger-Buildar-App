import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const burger = (props)=>{
    let ingredientsArray= Object.keys(props.ingredients)
    .map((igKey)=> {return [...Array(props.ingredients[igKey])]
       .map((_, index)=>{
       return <BurgerIngredient key={igKey + index} type={igKey}/>
      });
       }).reduce((Arr, el)=>{return Arr.concat(el)}
        ,[]);

    if(ingredientsArray.length === 0){
        ingredientsArray = <p>Pleast start adding stuff to your burger!</p>
    }


    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {ingredientsArray}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;