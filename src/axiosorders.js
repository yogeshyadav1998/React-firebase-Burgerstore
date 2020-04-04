import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgurbuilder-ecde8.firebaseio.com/'
})

export default instance;