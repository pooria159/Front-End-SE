/* eslint-disable no-useless-catch */
import axios from 'axios';
import api from './api'


export const useProfile = async () => {
    //write a username
    try{   
        // const response = await api.get("/profile/" + username);
        const response = await api.get("/profile");
        console.log(response.data)
        return response;
    }
    catch(error){
        throw error;
    }


}