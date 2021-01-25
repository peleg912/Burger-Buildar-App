import React, { Component } from 'react';
import Aux from '../Auxi/Auxi';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component{

    state= {
        showSideDrawer: false
    }

sideDrawerClosedHandler = ()=> {
    this.setState({showSideDrawer: false});
};

sideDrawerOpenHandler= ()=> {
    this.setState({showSideDrawer: true});
}

    render(){
        return(
    <Aux>
     <Toolbar
      isAuth={this.props.isAuth}
      open={this.sideDrawerOpenHandler}/>
     <SideDrawer 
      isAuth={this.props.isAuth}
     closedSideBar={this.sideDrawerClosedHandler}
     open={this.state.showSideDrawer}/>
        <main className={classes.Content}>{this.props.children}</main>
    </Aux>

        )
    }
}

const mapStateToProps = (state)=> {
    return{
        isAuth: state.auth.token !== null
    }
}


export default connect(mapStateToProps)(Layout);