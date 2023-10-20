/* eslint-disable no-useless-catch */
import axios from 'axios';
import api from './api'


export const useProfile = async () => {
    try{    
        const response = await api.get("/profile");
        return response;
    }
    catch(error){
        throw error;
    }


}