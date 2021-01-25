import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import MyOrders from './containers/Orders/MyOrders';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as authActions from './store/actions/auth';

class App extends Component {

  componentDidMount(){
    this.props.onPageRefreshCheckAuto();
  }

  render() {
    let routes = (
      <Switch>
      <Route path="/auth" component={Auth}/>
      <Route path="/" exact component={BurgerBuilder}/>
      <Redirect to="/"/>
      </Switch>
    )

    if (this.props.isAuth){
      routes = (
        <Switch>
        <Route path="/checkout" component={Checkout}/>
        <Route path="/my-orders" component={MyOrders}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/auth" component={Auth}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/"/>
        </Switch>
      )
    }
    return (
      <div>
      <Layout>
        {routes}
      </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state)=> {
  return{
    isAuth: state.auth.token !== null
  }
}


const mapDispathToProps = (dispatch)=> {
  return{
    onPageRefreshCheckAuto: ()=> dispatch(authActions.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispathToProps)(App));
