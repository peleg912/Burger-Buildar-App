import React, { Component } from "react";
import Order from '../../components/Order/Order';
import * as orderActions from '../../store/actions/order';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spiner/Spiner';

class MyOrders extends Component{


    componentDidMount(){
       this.props.toFetchOrders(this.props.token, this.props.userId);
    }


    render(){
        let orders = <Spinner/>;
        if (! this.props.loading){
            orders = 
            this.props.orders.map((order)=> {
                return(
                    <Order
                     key={order.id}
                     ingredients={order.ingredients}
                     price={+order.price}/>
                )
            });
        }

        return(
            <div>
               {orders}
            </div>
        );
    }
}

const mapStateToProps = (state)=> {
    return{
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch)=> {
    return{
    toFetchOrders: (token, userId)=> dispatch(orderActions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);