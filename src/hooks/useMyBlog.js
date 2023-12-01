import axios from 'axios';
import api from './api'


export const useMyBlog = async () => {
    try{   
        const response = await api.get("/get-my-post");
        return response;
    }
    catch(error){
        throw error;
    }


}