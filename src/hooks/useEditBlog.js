import axios from 'axios';
import api from './api';
import config from './config';
const url = config.API_URL;

export const useEditBlog = async (formData) => {
    try{    
        const response = await api.post("", JSON.stringify(formData));
        return response;
    }
    catch(error){
        console.log(error);
        throw error;
    }

}