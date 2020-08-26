import * as actionTypes from './actions';

export const storeResult = (value) =>{
    // return function(dispatch)
     //setTimeout(()=>{},2000);
     return {
         type: ADD,
         val: value
     }
 };