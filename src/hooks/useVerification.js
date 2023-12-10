import axios from 'axios';
import config from './config';
const url = config.API_URL;

export const useVerification = async (token) => {
    const headers = {
        'Accept': 'application/json',
    };

    const response = await axios.get(`${url}/verify-email?token=${token}`, { headers });
    return response;
}
