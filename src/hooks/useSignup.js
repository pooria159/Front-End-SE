import axios from 'axios';
const url = import.meta.env.VITE_API_URL;

export const Usesignup = async (formData) => {
    
    const headers = {
        'Accept': 'application/json',
    };
    try{
        console.log(formData);
        const response = await axios.post(`${url}/signup`, formData);
        return response
    } catch (error) {
        throw error;
    }
}
    