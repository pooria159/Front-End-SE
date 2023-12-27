import axios from 'axios';
import api from './api'


export const useDeleteMyBlog = async (blogId) => {
    try{   
        const response = await api.post("", {"BlogId" : blogId});
        return response;
    }
    catch(error){
        throw error;
    }
}