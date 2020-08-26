import * as actionTypes from '../actions/actions';

const initialState ={
    result: []
};

const reducer = (state = initialState,action)=>{
    if(action.type === 'STORE_RESULT'){
        return {
            ...state,
            result: state.result.concat({id: new Date() ,value: action.result})//return un new tableau pour imuable mieu que push
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