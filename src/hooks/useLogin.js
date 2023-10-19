import axios from 'axios';

const url = import.meta.env.VITE_API_URL;

export const useLogin = async (formData) => {
    const headers = {
        'Accept': 'application/json',
    };

    const response = await axios.post(`${url}/login`, JSON.stringify(formData), {headers});
    return response;

}