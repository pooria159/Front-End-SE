import axios from 'axios';
import config from '../config';
// Assuming you have the base URL in .env or .env.local
const BASE_URL = config.GET_CHAT_MESSAGE_COUNT_URL;

export const useGetChatMessageCount = async (id1, id2) => {
  try {
    console.log("chat count url",`${BASE_URL}/${id1}/${id2}`);
    const response = await axios.get(`${BASE_URL}/${id1}/${id2}`);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error fetching message count:', error);
    throw error;
  }
};

