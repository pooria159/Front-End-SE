import axios from 'axios';
import api from './api'


export const useCarousel = async () => {
    try{   
        const response = await api.get("");
        return response;
    }
    catch(error){
        throw error;
    }
}