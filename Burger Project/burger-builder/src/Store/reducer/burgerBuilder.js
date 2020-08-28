import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    ingredients: {
        salad: null,
        bacon: null,
        cheese: null,
        meat: null
    },
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES ={
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const reducer = (state = initialState, action) =>{
    
    switch (action.type) {
        //methode simplifier
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {                
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            };

            return updateObject(state, updatedState);
            break;

        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
            };
            break;
        case actionTypes.SET_INGREDIENT:
            console.log(action.ingredients);
            return{
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: 4,
                building: false    
            };
            break;
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error: true           
            };
            break;
        default:
            return state;
            break;
    }
};

export default reducer;