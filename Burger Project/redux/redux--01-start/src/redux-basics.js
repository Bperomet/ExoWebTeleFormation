const Redux = require('redux');
const createStore = Redux.createStore;

const initialState = {
    counter: 0
}

// REDUCER   (1 seul reducer)

const rootReducer = (state = initialState, action) => {
    if(action.type === 'INC_COUNTER'){
        return {...state, counter: state.counter - 1};
    }
    if(action.type === 'ADD_COUNTER'){
        return {...state, counter: state.counter + action.value};
    }
    return state;
};

// STORE

const store = createStore(rootReducer);

// SUBSCRIPTION

store.subscribe(()=>{
    
});

// DISPATCHING ACTION

store.dispatch({type: 'INC_COUNTER'}); //convention de nomage du type
store.dispatch({type: 'ADD_COUNTER', value: 10}); 

