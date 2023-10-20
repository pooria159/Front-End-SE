import axios from 'axios';

const url = import.meta.env.VITE_API_URL;

export const useVerification = async (token) => {
    const headers = {
        'Accept': 'application/json',
    };

    const response = await axios.get(`${url}/verify-email?token=${token}`, { headers });
    return response;
}
