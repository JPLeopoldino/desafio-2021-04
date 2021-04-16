import axios from 'axios';

const apikey = '925eba28';

const api = axios.create({
    baseURL: `http://www.omdbapi.com/?apikey=${apikey}&`
});

export default api;