
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux'; // lancer redux au démarrage de l'application
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//import reducer from './store/reducer'; reducer separer
import counterReducer from './store/reducers/counter'
import resultReducer from './store/reducers/result'

const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer
});

//const store = createStore(reducer);
const store = createStore(rootReducer);

//provider avec le store pour connecter redux avec l'appli react
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
