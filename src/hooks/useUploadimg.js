/* eslint-disable no-useless-catch */
import axios from 'axios';
import api from './api'


const useUploadimg = async (formData) => {
    try{    
        const response = await api.post("/upload-host-house-image", formData);
        return response;
    }
    catch(error){
        console.log(error);
        throw error;
    }
    

}

export default useUploadimg;
