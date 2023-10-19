import axios from 'axios';

const url = import.meta.env.VITE_API_URL;

export const useForgetPassword = async (formData) => {
    const headers = {
        'Accept': 'application/json',
    };

    const response = await axios.post(`${url}/forget-password`, JSON.stringify(formData), {headers});
    return response;

}