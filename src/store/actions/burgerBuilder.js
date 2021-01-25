import * as actionType from './actionTypes';
import axios from '../../axios-orders';

export const addIng = (name)=> {
    return {
        type: actionType.ADD_ING,
        ingName: name
    };
};

export const removeIng = (name)=> {
    return {
        type: actionType.REMOVE_ING,
        ingName: name
    };
};

export const setIngredirnts = (ingredients)=> {
    return {
        type: actionType.SET_INGS,
        ings: ingredients
    }
}

export const fetchIngredientsFailed = ()=> {
    return {
        type: actionType.FETCH_INGS_FAILED,
    }
}


export const initIngredients = ()=> {
    return dispatch => {
         axios.get('https://react-my-burger-c84ce-default-rtdb.firebaseio.com/ingredients.json')
        .then((res)=> {
            dispatch(setIngredirnts(res.data));
        }).catch((error)=>{
            console.log(error)
            dispatch(fetchIngredientsFailed())});
    }
}