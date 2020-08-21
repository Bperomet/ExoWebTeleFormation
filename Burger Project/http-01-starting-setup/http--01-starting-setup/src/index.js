import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

//pour definir par default les parametres
//axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
//axios.defaults.headers.common['Authorization']= 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type']= 'application/json';

axios.interceptors.request.use(request=>{
    console.log(request);
    //can edit request config
    return request;
},error=>{
    console.log(error);
    //renvoye la requete sur son composant pour la gerer autre part
    return Promise.reject(error);
});

axios.interceptors.response.use(response=>{
    console.log(response);
    //can edit request config
    return response;
},error=>{
    console.log(error);
    //renvoye la requete sur son composant pour la gerer autre part
    return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
