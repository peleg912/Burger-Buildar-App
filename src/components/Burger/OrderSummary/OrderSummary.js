import React, { Component } from 'react';
import Aux from '../../../hoc/Auxi/Auxi';
import Button from '../../UI/Button/Button';

class OrederSummary extends Component{


    render(){
        const ingredients = Object.keys(this.props.ingredients)
        .map((igKey)=> { 
            return (
            <li key={igKey}> 
           <span style={{textTransform: 'capitalize'}}>{igKey}</span>
           : {this.props.ingredients[igKey]}
           </li>)}); 

    return(
        <Aux>
        <h3>Your Order</h3>
        <p>A deliciouse burger with the following ingredients:</p>
        <ul>{ingredients}</ul>
        <p><strong>Total Price: {this.props.totalPrice}$</strong></p>
        <p>Continue To Checkout?</p>
        <Button btnType='Danger' clicked={this.props.cancel}>CANCEL</Button>
        <Button btnType='Success' clicked={this.props.continue}>CONTINUE</Button>
     </Aux>

        )
    }

}

export default OrederSummary;