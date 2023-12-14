import axios from 'axios';
import api from './api'


export const useDeleteMyCard = async (cardId) => {
    try{   
        console.log("yaAli" + cardId)
        const response = await api.post("/delete-announcement", {"CardId" : cardId});
        return response;
    }
    catch(error){
        throw error;
    }


}