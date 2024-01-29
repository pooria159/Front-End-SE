import axios from 'axios';
import api from './api'


export const use2PBlog = async (anncId) => {
    try{   
        const response = await api.post("/host-info", {"AnnouncementId" : anncId});
        return response;
    }
    catch(error){
        throw error;
    }


}

export default use2PBlog;