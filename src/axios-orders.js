import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-fc124.firebaseio.com/'
});

export default instance;