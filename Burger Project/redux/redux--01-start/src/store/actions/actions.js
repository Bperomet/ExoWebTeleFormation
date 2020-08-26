export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD = 'ADD';
export const SUBSTRACT = 'SUBSTRACT';

export const increment = () =>{
    return {
        type: INCREMENT
    }
};
export const decrement = () =>{
    return {
        type: DECREMENT
    }
};
export const add = (value) =>{
    return {
        type: ADD,
        val: value
    }
};

const fonc = (value) => {
    console.log(value);
}

export const storeResult = (value) =>{
    return (dispatch, getState)=>{
    setTimeout(()=>{
       // const oldCounter = getState().val.counter;
        dispatch(fonc(value))
    },2000);
    return {
        type: ADD,
        val: value
    }
    }

};