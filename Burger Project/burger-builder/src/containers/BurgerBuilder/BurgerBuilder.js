import React, { Component } from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../Store/actions/index';

class BurgerBuilder extends Component{
    state = {
       // error: false,
        purchasing: false,
        //loading: false
    }
/*
    componentDidMount(){
        axios.get('/posts')
        .then(response => {
            this.setState({ingredients: response.data, purchasing: false});
        }).catch(error=> {
            this.setState({loading: false, purchasing: false});
        });
    }
*/

    componentDidMount(){
        this.props.onInitIngredients();
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map((igKey)=>{
            return ingredients[igKey];
        }).reduce((sum,el)=>{
            return sum+el;
        },0);
        //this.setState({purchasable: sum > 0});
        return sum > 0 ;
    }
/*
    addIngredientHandler= (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    RemoveIngredientHandler= (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount-1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }
*/
    purchaseHandle = () => {
        if(this.props.isAuthentificated){
            this.setState({purchasing: true});
        }
        else{
            this.props.onSetAuthRedirectPath('checkout');
            this.props.history.push('auth');
        }
    }

    purchaseCancelHandle = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandle = () => {
        /*
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+'='+ encodeURIComponent(this.state.ingredients[i])); //pour faire un tableau uri
        }
        queryParams.push('price='+this.props.price);
        */
        this.props.onInitPurchase();

        const queryParams = [];

        const queryString = queryParams.join('&');
        
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render(){
        const disableInfo = {
            ...this.props.ingrs
        };
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = <OrderSummary 
            ingredients={this.props.ingrs} 
            purchaseCancelHandle={this.purchaseCancelHandle} 
            purchaseContinueHandle={this.purchaseContinueHandle}
            price={this.props.price.toFixed(2)}
            />;
/*
        if(this.state.loading){
            orderSummary = <Spinner/>;
        }
*/
        let burger = <Spinner/>;
        if(this.props.ingrs){
            burger= (
                <Aux>
                    <Burger ingredients={this.props.ingrs}/>
                    <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disableInfo}
                    purchasable={this.updatePurchaseState(this.props.ingrs)}
                    price={this.props.price}
                    ordered={this.purchaseHandle}
                    isAuth={this.props.isAuthentificated}/>
                </Aux>);
        }


        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandle}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingrs: state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthentificated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch =>{
    return {
        onIngredientAdded: (ingName)=> dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName)=> dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: ()=> dispatch(actions.initIngredients()),
        onInitPurchase: ()=> dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path)=> dispatch(actions.setAuthRedirectPath(path)),

       // onIngredientRemoved: (ingName)=> dispatch({type: actionTypes.REMOVE_INGREDIENT,ingredientName: ingName})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));