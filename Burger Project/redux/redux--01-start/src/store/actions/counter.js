import * as actionTypes from './actions';

export const increment = () =>{
    return {
        type: actionTypes.INCREMENT
    }
};
export const decrement = () =>{
    return {
        type: actionTypes.DECREMENT
    }
};
export const add = (value) =>{
    return {
        type: actionTypes.ADD,
        val: value
    }
};