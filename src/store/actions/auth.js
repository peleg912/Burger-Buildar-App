import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = ()=> {
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuscces = (token, userId)=> {
    return{
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFailed = (error)=> {
    return{
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const logOut = ()=> {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId')
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkTokenTimeout = (expTime)=> {
    return dispatch=> {
        setTimeout(()=> {
            dispatch(logOut());
        }, expTime * 1000);
    }
}

export const auth = (email, password, isSignUp)=> {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            email: email, 
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA6i8NiNPmFeEu66e5SojytFEUM_JFd9tY';
      
        if (!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA6i8NiNPmFeEu66e5SojytFEUM_JFd9tY';
        };

        axios.post(url, authData)
        .then((res)=> {
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('expirationTime', new Date(new Date().getTime() + res.data.expiresIn * 1000));
            localStorage.setItem('userId', res.data.localId);
            dispatch(authSuscces(res.data.idToken, res.data.localId));
            dispatch(checkTokenTimeout(res.data.expiresIn));
        }).catch((error)=> {
            dispatch(authFailed(error.response.data.error.errors[0].message));
        })
    }
}


export const setAuthRedirectPath = (path)=> {
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = ()=> {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token){
            dispatch(logOut());
        } else{
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            if (expirationTime <= new Date()){
                dispatch(logOut());
            } else{
                dispatch(authSuscces(token, localStorage.getItem('userId')));
                dispatch(checkTokenTimeout((expirationTime.getTime()-  new Date().getTime()) / 1000));
            }

        }

    }
}