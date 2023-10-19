import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const url = import.meta.env.VITE_API_URL;

export const useLogin = async (formData) => {
    const headers = {
        'Accept': 'application/json',
    };
    try{
        const response = await axios.post(`${url}/login`, JSON.stringify(formData), {headers});
        console.log(response.data)
        const { AccessToken, RefreshToken, Message } = response.data;
        localStorage.setItem('token', AccessToken);
        localStorage.setItem('refreshToken', RefreshToken);
        localStorage.setItem('islogin', "True");

    } catch (error) {
        throw error;
    }
}