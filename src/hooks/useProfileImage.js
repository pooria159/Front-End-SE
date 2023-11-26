import axios from 'axios';
import api from './api'


const useProfileImage = async (formData) => {
    try{    
        const response = await api.post("/upload", formData);
        console.log("image")
        console.log(response);
        return response;
    }
    catch(error){
        console.log(error);
        throw error;
    }
    

}

export default useProfileImage;
