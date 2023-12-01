import axios from 'axios';

// Assuming you have the base URL in .env or .env.local
const BASE_URL = import.meta.env.VITE_GET_CHAT_HISTORY_URL;

export const useGetChatHistory = async (id1, id2, count, page) => {
  try {
    const response = await axios.get(`${BASE_URL}${id1}/${id2}?count=${count}&page=${page}`);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error fetching message history', error);
    throw error;
  }
};

// 200/300?count=17&page=1