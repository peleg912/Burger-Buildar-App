import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import {connect} from 'react-redux';
import * as authActions from '../../store/actions/auth'; 
import Spinner from '../../components/UI/Spiner/Spiner';
import {Redirect} from 'react-router-dom';


class Auth extends Component {
    state = {
        controls: {
            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false

            },
            password:{
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
    
            }
        },
        isSignUp: true
     }

     componentDidMount(){
         if(! this.props.buildingBurger && this.props.authRedirectPath !== '/'){
             this.props.onSetRedirectPath();
         }
     }

     switchAuthModeHandler = ()=> {
        this.setState(prevState => {
            return{
                isSignUp : !prevState.isSignUp
            }
        })
     };


     checkValidity(value, rules){
        let isValid= false;
        if(rules.required){
            isValid = value.trim() !== ''
        }
        return isValid;
    };

    inputChangedHandler = (event, elmnt)=> {
        const updatedControls = {
            ...this.state.controls,
            [elmnt] : {
                ...this.state.controls[elmnt],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[elmnt].validation),
                touched: true
            }
        }
        this.setState({controls: updatedControls})
    }
    
    authHandler = (event)=> {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    render(){
        const formElementsArray = [];
        for (let key in this.state.controls) {
           formElementsArray.push({
               id: key,
               config: this.state.controls[key]
           })
        };

        const form = formElementsArray.map(elmnt=> (
            <Input
            key={elmnt.id}
            elementType={elmnt.config.elementType}
            elementConfig={elmnt.config.elementConfig}
            value={elmnt.config.value}
            changed= {(event)=>{this.inputChangedHandler(event, elmnt.id)}} />
        ))

        return(
            this.props.isAuth ? <Redirect to={this.props.authRedirectPath}/> :

            this.props.loading ? <Spinner/> :
            <div className={classes.Auth}>
                <form onSubmit={this.authHandler}>
                    {form}
                    <Button btnType='Success' >SUBMIT</Button>
                </form>
                    <Button btnType='Danger' 
                    clicked= {this.switchAuthModeHandler}>
                    SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>

        )
    }
}

const mapStateToProps = (state)=> {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
};


const mapDispatchToProps = (dispatch) => {
    return{
        onAuth: (email,password, isSignUp)=> dispatch(authActions.auth(email, password, isSignUp)),
        onSetRedirectPath: ()=> dispatch(authActions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);