/* eslint-disable no-useless-catch */
import axios from 'axios';
import api from './api'


export const usePublicProfile = async (username) => {
    //write a username
    try{   
        const response = await api.get(`/public-profile/${username}`);
        return response;
    }
    catch(error){
        throw error;
    }


}