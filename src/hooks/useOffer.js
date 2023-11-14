import axios from 'axios';
import api from './api'


const useOffer = async (formData) => {
    try{    
        const response = await api.post("/get-offer", formData);
        console.log(response);
        console.log("FormData :" + formData);
        return response;
    }
    catch(error){
        console.log(error);
        throw error;
    }
    

}

export default useOffer;
