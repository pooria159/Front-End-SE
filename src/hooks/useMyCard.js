import axios from 'axios';
import api from './api'


export const useMyCard = async () => {
    try{   
        const response = await api.get("/get-card-profile");
        return response;
    }
    catch(error){
        throw error;
    }


}