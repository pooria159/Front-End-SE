import api from './api'

const useAnncCard = async (controlObject) => {
    let filter = ""
    if(controlObject.country != ""){
        filter = filter.concat(`&filter=country:${controlObject.country}`)
        if(controlObject.state != ""){
            filter = filter.concat(`,state:${controlObject.state}`)
            if(controlObject.city != ""){
                filter = filter.concat(`,city:${controlObject.city}`)
            }
        }
    }
    try{    
        const response = await api.get(`/get-card?page-size=${controlObject.pageSize}&page-number=${controlObject.currentPage}&sort=${controlObject.sort}${filter}`);
        console.log(response)
        return response;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export default useAnncCard;
