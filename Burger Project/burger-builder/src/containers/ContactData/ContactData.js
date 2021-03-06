import React,{Component} from 'react';
import {connect} from 'react-redux';

import Button from '../../components/UI/Button/Button'
import classes from './ContactData.module.css';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../Store/actions/index';

class ContactData extends Component{
    state={
        orderForm:{
                name:{
                    elementType: 'input',
                    elementConfig: {
                        type:  'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false
                },
                email:{
                    elementType: 'input',
                    elementConfig: {
                        type:  'email',
                        placeholder: 'Your Email'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false
                },
                street:{
                    elementType: 'input',
                    elementConfig: {
                        type:  'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false
                },
                zipcode:{
                    elementType: 'input',
                    elementConfig: {
                        type:  'text',
                        placeholder: 'ZIP Code'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false
                },
                country:{
                    elementType: 'input',
                    elementConfig: {
                        type:  'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false
                },
                deliveryMethod:{
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    validation: {
                        required: true
                    },
                    value: 'cheapest'
                }
                
        },
        //loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
    //    this.setState({loading: true});

        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order ={
            ingredients: this.props.ingrs,
            //recalculer le prix sur le serveur
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onOrderBurger(order, this.props.token);
/*
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
        }).catch(error=> {
            console.log(error);
            this.setState({loading: false});
        });
        */
    }

    inputChangedHandler = (event, inputIdentifier)=>{
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        this.setState({orderForm: updatedOrderForm});
    }

    checkValidity(value, rules){
        let isValid = true;
        if(rules.required){
            isValid = value.trim() === '';
        }
        if(rules.minLenght){

        }
        return isValid;
    }

    render(){

        const formElementsArray = [];

        for(let key in this.state.orderForm){
            formElementsArray.push(
                {
                    id: key,
                    config: this.state.orderForm[key]
                }
            );
        }

        let form =(            
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement=>(
                    <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig} 
                    value={formElement.config.value}
                    changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                    invalid={formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    />
                ))}
                <Button btnType='Success' /* disable={si formulaire pas valide}*/>ORDER</Button>
            </form>);
//console.log(formElement)
        if(this.props.loading){
            form = <Spinner/>;
        }

        return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>);
    }
}
const mapStateToProps = state => {
    return {
        ingrs: state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch =>{
    return {
        onOrderBurger: (orderData, token)=> dispatch(actions.purchaseBurger(orderData, token)),
        //onIngredientRemoved: (ingName)=> dispatch(burgerBuilderActions.removeIngredient(ingName)),
      //  onInitIngredients: ()=> dispatch(burgerBuilderActions.initIngredients()),

       // onIngredientRemoved: (ingName)=> dispatch({type: actionTypes.REMOVE_INGREDIENT,ingredientName: ingName})
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));