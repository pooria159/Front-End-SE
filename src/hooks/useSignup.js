import axios from 'axios';
import config from './config';
const url = config.API_URL;

export const Usesignup = async (formData) => {
    
    const headers = {
        'Accept': 'application/json',
    };
    try{
        const response = await axios.post(`${url}/signup`, formData);
        return response
    } catch (error) {
        throw error;
    }
}
    