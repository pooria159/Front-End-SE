import axios from 'axios';

// Assuming you have the base URL in .env or .env.local
const BASE_URL = import.meta.env.VITE_GET_CHAT_MESSAGE_COUNT_URL;

export const useGetChatMessageCount = async (id1, id2) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id1}/${id2}`);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error fetching message count:', error);
    throw error;
  }
};

