import * as actionType from '../actions/actionTypes';
import axios from '../../axios-orders';

export const orderBurgerSuccess = (id,orderData)=> {
    return{
        type: actionType.ORDER_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const orderBurgerFailed = (error)=> {
    return{
        type: actionType.ORDER_BURGER_FAILED,
        error: error
    }
}

export const orderBurgerStart = ()=> {
    return{
        type: actionType.ORDER_BURGER_START,
    }
}



export const orderBurger = (orderData, token) => {
    return dispatch=> {
        dispatch(orderBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
        .then((res)=>{
            dispatch(orderBurgerSuccess(res.data.name, orderData)) 
         })
        .catch((err)=> {
            dispatch(orderBurgerFailed(err)) 
        });
    }
}

export const orderInit = ()=> {
    return {
        type: actionType.ORDER_INIT
    }
}

export const fetchOrders = (token, userId)=> {
    return dispatch=> {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"')
        .then((res)=> {
            const fetchedOrders = [];
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        }).catch((err)=> {console.log(err);
            dispatch(fetchOrdersFailed(err));
        });
    }
}

export const fetchOrdersSuccess = (orders)=> {
    return{
        type: actionType.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFailed = (error)=> {
    return{
        type: actionType.FETCH_ORDERS_FAILED,
        error: error
    }
}

export const fetchOrdersStart = ()=> {
    return{
        type: actionType.FETCH_ORDERS_START,
        
    }
}