import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'https://bobthecoder.org',
    headers: {
        'content-type': 'application/json'
    }
});

export default httpClient;