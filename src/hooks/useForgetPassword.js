import axios from 'axios';
import config from './config';
const url = config.API_URL;

export const useForgetPassword = async (formData) => {
    const headers = {
        'Accept': 'application/json',
    };

    const response = await axios.post(`${url}/forget-password`, JSON.stringify(formData), {headers});
    return response;

}