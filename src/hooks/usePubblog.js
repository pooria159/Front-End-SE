import axios from 'axios';
import api from './api'


export const usePubBlog = async (username) => {
    try{   
        const response = await api.post("/get-post-host",{"username" : username});
        return response;
    }
    catch(error){
        throw error;
    }


}