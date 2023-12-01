import axios from 'axios';
import api from './api';
const url = import.meta.env.VITE_API_URL;

const useCreateBlog = async (formData) => {
    try{    
        const response = await api.post("/create-post", JSON.stringify(formData));
        console.log(response);
        console.log("FormData :" + formData);
        return response;
    }
    catch(error){
        console.log(error);
        throw error;
    }

}

export default useCreateBlog;