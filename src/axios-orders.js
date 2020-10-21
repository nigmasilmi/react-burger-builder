import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burgerbuilder-8d726.firebaseio.com/'
});

export default instance;