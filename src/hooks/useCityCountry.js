import {useState} from 'react'; 
import axios from 'axios';


const url = import.meta.env.VITE_API_URL_CITY_COUNTRY;
const accesstoken = import.meta.env.VITE_CITY_COUNTRY_TOKEN;
const email = import.meta.env.VITE_CITY_COUNTRY_EMAIL;



const fetchBearerToken = async () => {
    const headers = {
        'Accept': 'application/json',
        'api-token': `${accesstoken}`,
        'user-email': email
    };
  try {
    const response = await axios.get(`${url}/getaccesstoken/`, { headers });
    console.log(response.data);
    return response.data["auth_token"];
  } catch (error) {
    throw error;
  }
};



export const useCityCountry = async (type, country_state = null) => {
    const bearer_token = await fetchBearerToken();
    
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${bearer_token}`,
    };
    try{
        if (type == "country"){
            try {
            const response = await axios.get(`${url}/countries`, { headers });
                return response.data;
            } catch (error) {
                throw error;
            }
        } else if(type == "state"){
            try {
                const response = await axios.get(`${url}/states/${country_state}`, { headers });
                    return response.data;
                } catch (error) {
                    throw error;
            }
        } else if(type == "city"){
            try {
                const response = await axios.get(`${url}/cities/${country_state}`, { headers });
                    return response.data;
                } catch (error) {
                    throw error;
            }
        }
    } catch (error){
        throw error;
    }

}