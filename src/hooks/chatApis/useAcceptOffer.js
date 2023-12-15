import api from '../api'

export const useAcceptOffer = async (hostId,announcementID) => {
    const requestBody = {
        HostId: hostId,
        AnnouncementId:announcementID
      };
    try{   
        const response = await api.post("/accept-offer",requestBody);
        console.log("chat list called");
        console.log(response);
        return response;
    }
    catch(error){
        throw error;
    }
}