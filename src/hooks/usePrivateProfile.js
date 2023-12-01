import axios from 'axios';
import api from './api'


export const usePrivateProfile = async (username) => {
    //write a username
    try{   
        const response = await api.post(`/public-profile-host`,{"Username" : username});
        return response;
    }
    catch(error){
        throw error;
    }


}