import React,{ Component } from "react";
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spiner from '../../../components/UI/Spiner/Spiner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import * as orderActions from '../../../store/actions/order';

class ContactData extends Component{
    state = {
         orderForm: {
            name: {
                elementType: 'input',
                elementCofig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                validaion: {
                    required: true
                },
                valid: false
            },
            street: {
                elementType: 'input',
                elementCofig: {
                    type: 'text',
                    placeholder: 'Your Street',
                },
                value: '',
                validaion: {
                    required: true
                },
                valid: false
            },
            zipCode:{
                elementType: 'input',
                elementCofig: {
                    type: 'text',
                    placeholder: 'Zip Code',
                },
                value: '',
                validaion: {
                    required: true
                },
                valid: false
            },
            country: {
                elementType: 'input',
                elementCofig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validaion: {
                    required: true
                },
                valid: false
            },
            email:{
                elementType: 'input',
                elementCofig: {
                    type: 'email',
                    placeholder: 'Your Email',
                },
                value: '',
                validaion: {
                    required: true
                },
                valid: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementCofig: {
                   options: [
                       {value: 'fastest', displayValue: 'Fastest'},
                       {value: 'cheapest', displayValue: 'Cheapest'}
                   ]
                },
                value: 'fastest',
                validaion: {},
                valid: true
               
            }
         },
        formIsValid: false
    }

    checkValidity(value, rules){
        let isValid= false;
        if(rules.required){
            isValid = value.trim() !== ''
        }
        return isValid;
    };

    orderHandler = (event)=> {
        event.preventDefault();
        const formData = {};
        for (const formEl in this.state.orderForm) {
            formData[formEl] = this.state.orderForm[formEl].value
        }

    
        const order = {
            ingredients: this.props.ings,
            price: this.props.tp,
            orderData: formData,
            userId: this.props.userId
        }

       this.props.onOrderBurger(order, this.props.token);
     

     
    }

    inputChangedHandler= (event, inputIdentifier)=> {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validaion);
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});

    }

    render(){
        const formElementsArray= [];
        for (let key in this.state.orderForm) {
          formElementsArray.push({
              id: key,
              config: this.state.orderForm[key]
          });
        };

        let form =  (
            <form onSubmit={this.orderHandler}>
               {formElementsArray.map((formEl)=> {
                   return(
                    <Input 
                    key={formEl.id}
                    elementType={formEl.config.elementType}
                    elementConfig={formEl.config.elementCofig}
                    value={formEl.config.value}
                    changed={(event)=>this.inputChangedHandler(event, formEl.id)}/>
                   );
               })}

                <Button btnType="Success" >ORDER</Button>
            </form>
        ) ;
        
        if (this.props.loading){
           form = <Spiner/>
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}


const mapStateToProps = (state)=> {
    return{
        ings : state.burgerBuilder.ingredients,
        tp: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
       
    }
}

const mapDispatchToProps = (dispatch)=> {
    return{
    onOrderBurger : (orderData, token)=> dispatch(orderActions.orderBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);