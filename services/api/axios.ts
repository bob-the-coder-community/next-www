import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'content-type': 'application/json'
    }
});

export default httpClient;