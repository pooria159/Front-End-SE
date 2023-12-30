
import api from '../api'


export const useGetChatList = async () => {
    try{   
        const response = await api.get("/chat-list");
        console.log("chat list called");
        console.log(response);
        return response;
    }
    catch(error){
        throw error;
    }


}