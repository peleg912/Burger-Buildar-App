import * as actionType from '../actions/actionTypes';
import  {updateObject} from '../../shared/utillity';

const initialState = {
    ingredients : null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGRIDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}

const reducer = (state = initialState, action)=> {
    switch(action.type){
        case actionType.ADD_ING:
            const updatedIng = {[action.ingName]: state.ingredients[action.ingName] + 1};
            const updatedIngs = updateObject(state.ingredients, updatedIng);
            const updatedState= {
                ingredients: updatedIngs,
                totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingName],
                building: true
            }
            return updateObject(state, updatedState);
           
        case actionType.REMOVE_ING:
            const updatedIng2 = {[action.ingName]: state.ingredients[action.ingName] - 1};
            const updatedIngs2 = updateObject(state.ingredients, updatedIng2);
            const updatedState2= {
                ingredients: updatedIngs2,
                totalPrice: state.totalPrice - INGRIDIENT_PRICES[action.ingName],
                building: true
            }
            return updateObject(state, updatedState2);
           
        case actionType.SET_INGS:
            const updatedState3 = {
                ingredients: action.ings,
                error: false,
                totalPrice:4,
                building: false
            }
            return updateObject(state, updatedState3);

         case actionType.FETCH_INGS_FAILED:
             return updateObject(state, {error: true})
                
        default:
            return state;
    }
}

export default reducer;