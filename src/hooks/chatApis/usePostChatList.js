import api from '../api';

export const usePostChatList = async (hostId,cardId) => {
  try {
    const requestBody = {
      hostid: hostId,
      announcementid:cardId
    };

    const response = await api.post('/chat-list', requestBody);
    console.log('Chat list called:', response);
    return response;
  } catch (error) {
    throw error;
  }
};
