import {useReducer, useCallback} from 'react';

const initialState = {
    loading: false, 
    error: null, 
    data: null, 
    extra: null, 
    identifier: null
};

const httpReducer = (curhttpState, action)=> {
    switch (action.type) {
      case 'SEND':   
        return {loading: true, error: null, data: null, extra: action.extra};
      case 'RESPONSE':
        return {...curhttpState ,loading: false, data: action.responseData, extra: action.extra, identifier: action.identifier};
      case 'ERROR':
        return  {loading: false, error: action.errorMessage};
      case 'CLEAR':
        return  initialState;
      default:
        throw new Error('Should not get there');
        break;
    }
}
 
const useHttp = () => {
    const [httpState, dispatchHttp] = useReducer(httpReducer,{loading: false, error: null, data: null, extra: null, identifier: null});

    const clear = useCallback(() => {
        dispatchHttp({type: 'CLEAR'});
    },[]);

//`https://hook-a3306.firebaseio.com/ingredients/${ingredientId}.json`
    const sendRequest = useCallback((url, method, body, reqExtra, reqIdentifier) => {
        dispatchHttp({type: 'SEND', reqIdentifier});
        fetch(url, {
            method: method,
            body: body,
            headers: {'Content-Type': 'application/json'}
          }).then(response=>{
            return response.json();
          }).then((responseData)=>{
            dispatchHttp({type: 'RESPONSE', responseData: responseData, extra: reqExtra, identifier: reqIdentifier });
          }).catch(error =>{
            dispatchHttp({type: 'ERROR', errorMessage: error.message});
          });
    },[]);
    return {
        isLoading: httpState.loading,
        data: httpState.data,
        error: httpState.error,
        sendRequest: sendRequest,
        reqExtra: httpState.extra,
        reqIdentifier: httpState.identifier,
        clear: clear
    };
};

 export default useHttp;