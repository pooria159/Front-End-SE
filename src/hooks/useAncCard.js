import api from './api'

const useAnncCard = async () => {
    try{    
        const response = await api.get("/get-card");
        return response;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export default useAnncCard;
