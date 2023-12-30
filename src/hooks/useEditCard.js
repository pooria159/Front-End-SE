import axios from 'axios';
import api from './api';
import config from './config';
const url = config.API_URL;

export const useEditCard = async (formData) => {
    console.log("Edit FormData :");
    console.log(formData);
    try{    
        const response = await api.post("/edit-announcement", JSON.stringify(formData));
        console.log(response);
        console.log("Edit FormData :" + formData);
        return response;
    }
    catch(error){
        console.log(error);
        throw error;
    }

}