import api from '../api'


export const useRejectOffer = async (hostId,announcementID) => {
    const requestBody = {
        HostId: hostId,
        AnnouncementId:announcementID
      };
    try{   
        const response = await api.post("/reject-offer",requestBody);
        console.log("chat list called");
        console.log(response);
        return response;
    }
    catch(error){
        throw error;
    }


}