import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css' //Evite d'utiliser la commande npm eject
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

    state={
        showSideDrawer: false,
    }
    
    sideDrawerClosedHandler= () =>{
        this.setState({showSideDrawer: false});
    }
    
    sideDrawerToggleHandler= () =>{
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render(){
        return(
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} isAuthentificated={this.props.isAuthentificated}/>
                <SideDrawer 
                    isAuth={this.props.isAuthentificated}
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
} 

const mapStateToProps = state => {
    return {
        isAuthentificated : state.auth.token !== null
    };
}
/*
const mapDispatchToProps = dispatch =>{
    return {
        onOrderBurger: (orderData, token)=> dispatch(actions.purchaseBurger(orderData, token)),
    };
}
*/
export default connect(mapStateToProps)(Layout);