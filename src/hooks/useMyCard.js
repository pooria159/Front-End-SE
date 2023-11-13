/* eslint-disable no-useless-catch */
import axios from 'axios';
import api from './api'


export const useMyCard = async () => {
    //write a username
    try{   
        // const response = await api.get("/profile/" + username);
        const response = await api.get("/get-card-profile");
        return response;
    }
    catch(error){
        throw error;
    }


}