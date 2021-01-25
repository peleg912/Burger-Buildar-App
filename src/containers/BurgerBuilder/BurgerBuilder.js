import React, {Component} from 'react';
import Aux from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spiner from '../../components/UI/Spiner/Spiner';
import  withErorHandler from '../../hoc/withErorHandler/withErorHandler';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/burgerBuilder';
import * as orederActions from '../../store/actions/order';
import * as authActions from '../../store/actions/auth';


class BurgerBuilder extends Component{

    state=  {
        isOrderd: false,
        loading: false
    }

    componentDidMount(){
        this.props.onInitIngredients();
    }


    orederHandler = ()=> {
        if(this.props.isAuth){
            this.setState({isOrderd: true});
        }else{
            this.props.onSetRedirectPath('/checkout');
            this.props.history.push('/auth');
        }

    };

    cancelOrderlHandler = ()=> {
        this.setState({isOrderd: false});
    }

    continuedOrderHandler = ()=> {
        this.props.toOrderInit();
        this.props.history.push('/checkout');
    }

    updatePurchaseState= (ingredients)=>{
        // const ingredients = {...this.state.ingredients};
        const sum = Object.keys(ingredients)
          .map((igKey)=>{ return ingredients[igKey]})
          .reduce((sum, el)=>{return sum + el},0);

       return sum > 0;
       
    }

    render(){

        const disableInfo = {...this.props.ings};
        for(let key in disableInfo){
         disableInfo[key] = disableInfo[key] <= 0
        } 
       
   

        return(
       <Aux>
           <Modal show={this.state.isOrderd} modalClosed={this.cancelOrderlHandler}>

              {this.props.ings? 
               <OrderSummary 
               ingredients = {this.props.ings}
               cancel={this.cancelOrderlHandler}
               continue={this.continuedOrderHandler}
               totalPrice={this.props.tp.toFixed(2)}/> : <Spiner/>}

           </Modal>

           {this.props.ings ? 
           <Aux>
           <Burger ingredients={this.props.ings}/> 
           <BuildControls
            isAuth={this.props.isAuth}
            add={this.props.onAddIng}
            remove={this.props.onRemoveIng}
            disableBtn = {disableInfo}
            price= {this.props.tp}
            purchaseable = {this.updatePurchaseState(this.props.ings)}
            order = {this.orederHandler}
            /> </Aux> : <Spiner/> }
           
       </Aux>
        )
    }
}

const mapStateToProps = (state)=> {
    return{
        ings : state.burgerBuilder.ingredients,
        tp : state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProp= (dispatch)=> {
    return{
        onAddIng : (name)=> dispatch(burgerBuilderActions.addIng(name)),
        onRemoveIng: (name)=> dispatch(burgerBuilderActions.removeIng(name)),
        onInitIngredients: ()=> dispatch(burgerBuilderActions.initIngredients()),
        toOrderInit : ()=> dispatch(orederActions.orderInit()),
        onSetRedirectPath:(path)=> {dispatch(authActions.setAuthRedirectPath(path))}
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(withErorHandler(BurgerBuilder, axios));