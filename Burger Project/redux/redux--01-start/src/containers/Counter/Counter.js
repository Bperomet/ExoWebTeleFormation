import React, { Component } from 'react';
import {connect} from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from '../../store/actions/actions';
import {increment, decrement, add}  from '../../store/actions/actions';

class Counter extends Component {

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubstractCounter}  />
                <hr/>
                <button onClick={()=>this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResult.map((result, id)=>(
                        <li key={id} onClick={()=>this.props.ondDeleteResult(result.id)}>{result.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}


const mapStateToProps = state =>{
    return {
        ctr: state.ctr.counter,
        storedResult: state.res.result
    };
}

const mapDispatchToProps = dispatch =>{
    return{
        onIncrementCounter: ()=> dispatch(increment()),
        onDecrementCounter: ()=> dispatch(decrement()),
        onAddCounter: ()=> dispatch(add(10)),
        onSubstractCounter: ()=> dispatch({type: actionTypes.SUBSTRACT, val: 10}),
        onStoreResult: (result)=> dispatch({type: 'STORE_RESULT', result: result}),
        ondDeleteResult: (id)=> dispatch({type: 'DELETE_RESULT', resId: id}),

    };
}

export default connect(mapStateToProps , mapDispatchToProps)(Counter);