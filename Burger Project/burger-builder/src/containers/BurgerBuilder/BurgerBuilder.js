import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES ={
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
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
    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map((igKey)=>{
            return ingredients[igKey];
        }).reduce((sum,el)=>{
            return sum+el;
        },0);
        this.setState({purchasable: sum > 0});
    }

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

    purchaseHandle = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandle = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandle = () => {

        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+'='+ encodeURIComponent(this.state.ingredients[i])); //pour faire un tableau uri
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render(){
        const disableInfo = {
            ...this.state.ingredients
        };
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = <OrderSummary 
            ingredients={this.state.ingredients} 
            purchaseCancelHandle={this.purchaseCancelHandle} 
            purchaseContinueHandle={this.purchaseContinueHandle}
            price={this.state.totalPrice.toFixed(2)}
            />;
        if(this.state.loading){
            orderSummary = <Spinner/>;
        }
        let burger = <Spinner/>;
        if(this.state.ingredients){
            burger= (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.RemoveIngredientHandler}
                    disabled={disableInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandle}/>
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

export default withErrorHandler(BurgerBuilder, axios);