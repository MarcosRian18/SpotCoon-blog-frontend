import axios from 'axios';


  
const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': localStorage.getItem('crsf_token')
    }
});

export default api;