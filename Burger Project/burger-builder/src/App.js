import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
//import Checkout from './containers/Checkout/Checkout';
//import Orders from './containers/Orders/Orders';
//import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './Store/actions/index';
import asyncConponent from './hoc/asyncComponent.js/asyncComponent';

const asyncCheckout = asyncConponent(() => {
  return import('./containers/Checkout/Checkout')
});

const asyncOrders = asyncConponent(() => {
  return import('./containers/Orders/Orders')
});

const asyncAuth = asyncConponent(() => {
  return import('./containers/Auth/Auth')
});

class App extends Component {
  
  componentDidMount(){
    this.props.onTryAutoSignup();
  }

  render(){
    let routes = (
      <Switch>
        <Route path='/auth' component={asyncAuth}/>
        <Route path='/' exact component={BurgerBuilder}/>
        <Redirect to='/'/>
      </Switch>

    );

    if(this.props.isAuthentificated){
      routes = (
        <Switch>
          <Route path='/checkout' component={asyncCheckout}/>
          <Route path='/orders' component={asyncOrders}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/auth' component={asyncAuth}/>
          <Route path='/' exact component={BurgerBuilder}/>
        </Switch>
      );
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

const mapStateToProps = state => {
  return {
      isAuthentificated: state.auth.token !== null,
  };
}

const mapDispatchToProps = dispatch =>{
  return {
      onTryAutoSignup: ()=> dispatch(actions.authCheckState()),
  };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
