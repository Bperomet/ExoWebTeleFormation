import axios from 'axios';

const instance = axios.create({
   // baseURL:'https://jsonplaceholder.typicode.com'
   baseURL:'https://react-my-burger-2e0ce.firebaseio.com/'
});

export default instance;