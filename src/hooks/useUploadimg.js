/* eslint-disable no-useless-catch */
import axios from 'axios';
import api from './api'


const useUploadimg = async (formData , token , counts) => {
    try{    
        const response = await api.post(`/upload?host=${token}&count=${counts}`, formData);
        console.log("llllllllllllllllllllll" + response);
        return response;
    }
    catch(error){
        console.log(error);
        throw error;
    }
    

}

export default useUploadimg;
