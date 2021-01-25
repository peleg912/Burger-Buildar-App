import * as actionType from '../actions/actionTypes';
import {updateObject} from '../../shared/utillity';

const initialState =  {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const reducer = (state = initialState, action)=> {
    switch(action.type){
        case actionType.AUTH_START:
            return updateObject(state, {error: null, loading: true});

        case actionType.AUTH_SUCCESS:
            return updateObject(state, {token: action.token,
            userId: action.userId, error: null, loading: false});

        case actionType.AUTH_FAILED:
            return updateObject(state, {error: action.error, loading: false});
            
        case actionType.AUTH_LOGOUT:
            return updateObject(state, {token: null, userId: null});

        case actionType.SET_AUTH_REDIRECT_PATH:
            return updateObject(state, {authRedirectPath : action.path})

        default: return state;
    }
}

export default reducer;