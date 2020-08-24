import React,{Component} from 'react';
import {connect} from 'react-redux';

import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';

class Checkout extends Component{
    /*
    state = {
        ingredients: null,
        totalPrice: 0
    }
    
    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for(let param of query.entries()){
           // ingredients[]
           if(param[0]==='price'){
            price=param[1];
           }
           else{
               ingredients[param[0]] = +param[1];
           }
        }
        this.setState({ingredients: ingredients,totalPrice: price});
    }
    */
    checkoutCancelled = () =>{
        this.props.history.goBack();
    }

    checkoutContinue = () =>{
        this.props.history.replace('/checkout/contact-data');
    }

    render(){

        return (
            <div>
                <CheckoutSummary ingredients={this.props.ingrs}
                checkoutCancelled={this.checkoutCancelled}
                checkoutContinue={this.checkoutContinue}
                />
                <Route path={this.props.match.url + '/contact-data'} component={ContactData}/>

            </div>
        );
    }
}
// <Route path={this.props.match.url + '/contact-data'} render={(props)=>(<ContactData ingredients={this.props.ingrs} price={this.props.price} {...props}/>)}/>

const mapStateToProps = state => {
    return {
        ingrs: state.ingredients,
        price : state.totalPrice
    };
}

export default connect(mapStateToProps)(Checkout);