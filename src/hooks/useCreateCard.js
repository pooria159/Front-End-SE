import axios from 'axios';
import api from './api';
import config from './config';
const url = config.API_URL;

export const useCreateCard = async (formData) => {
    try{    
        const response = await api.post("/create-card", JSON.stringify(formData));
        console.log(response);
        console.log("FormData :" + formData);
        return response;
    }
    catch(error){
        console.log(error);
        throw error;
    }

}