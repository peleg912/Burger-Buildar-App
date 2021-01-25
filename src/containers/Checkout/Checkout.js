import React, { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component{


    cancelClickedHandler= ()=> {
        this.props.history.goBack();
    };

    continueClickedHandler = ()=> {
        this.props.history.replace('/checkout/contact-data');
    };

    render(){

       const purchased = this.props.purchased ? <Redirect to="/"/> : null;
       
       
        return(
           this.props.ings ?
            <div>
                {purchased}
            <CheckoutSummary 
            ingredients={this.props.ings}
            clickCancel={this.cancelClickedHandler}
            clickContinue={this.continueClickedHandler} />
            <Route 
             path={this.props.match.path + '/contact-data'}
             component={ContactData}/>
            </div> : <Redirect to="/"/>
            
        )
    }
}

const mapStateToProps = (state)=> {
    return{
        ings : state.burgerBuilder.ingredients,
        purchased: state.order.purchased
       
    }
}




export default connect(mapStateToProps)(Checkout);