/* eslint-disable no-useless-catch */
import axios from 'axios';
import api from './api'


const useEditProfile = async (formData) => {
    try{    
        const response = await api.post("/edit-profile", formData);
        console.log(response);
        console.log("FormData :" + formData);
        return response;
    }
    catch(error){
        console.log(error);
        throw error;
    }


}

export default useEditProfile;
