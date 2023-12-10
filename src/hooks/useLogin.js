import axios from 'axios';
import config from './config';
const url = config.API_URL;

export const useLogin = async (formData) => {

    
    const headers = {
        'Accept': 'application/json',
    };

    const response = await axios.post(`${url}/login`, JSON.stringify(formData), {headers});
    return response;

}