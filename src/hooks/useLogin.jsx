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
        if (response.status >= 200 && response.status < 300) {
            // Successful response (status code 2xx)
            // Redirect to /login
            toast.success('Signup successful!', {
                autoClose: 1000, // Close the toast after 3 seconds
                position: toast.POSITION.TOP_LEFT,
              });
              setTimeout(() => {
                <Link to="/login"></Link>
              }, 1000);
            
        } else{
            toast.error(response.data["message"], {
                position: toast.POSITION.TOP_LEFT,
            });
        }
    } catch (error) {
        toast.error(error.message, {
            position: toast.POSITION.TOP_LEFT,
        });
        throw error;
    }
}