import * as actionTypes from '../actions/actions';
import {updateObject} from '../utility'

const initialState ={
    counter: 0
};

const reducer = (state = initialState,action)=>{
    if(action.type === actionTypes.INCREMENT){
        return {
            ...state,
            counter: state.counter + 1
        };
    }
    if(action.type === actionTypes.DECREMENT){
        return {
            ...state,
            counter: state.counter - 1
        };
    }
    if(action.type === actionTypes.ADD){
        return {
            ...state,
            counter: state.counter + action.val
        };
    }
    if(action.type === actionTypes.SUBSTRACT){
        //autre methode
        return updateObject(state, {counter: state.counter - action.val})
    }
    return state;
};

export default reducer;