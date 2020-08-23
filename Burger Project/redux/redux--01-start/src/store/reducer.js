import * as actionTypes from './actions';

const initialState ={
    counter: 0,
    result: []
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
        return {
            ...state,
            counter: state.counter - action.val
        };
    }
    if(action.type === 'STORE_RESULT'){
        return {
            ...state,
            result: state.result.concat({id: new Date() ,value: state.counter})//return un new tableau pour imuable mieu que push
        };
    }
    if(action.type === 'DELETE_RESULT'){
        /*
        2 methodes modification array

        const newArray = [...state.result];
        newArray.splice(,);

        OU
        */

        const updatedArray = state.result.filter((result)=>(
            action.resId !== result.id
        ));
        return {
            ...state,
            result: updatedArray //newArray//return un new tableau pour imuable mieu que push
        };
    }
    return state;
};

export default reducer;