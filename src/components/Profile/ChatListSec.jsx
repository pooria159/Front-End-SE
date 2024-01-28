import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import ChatRoom from "../Chat/ChatRoom";
import defaultUserPic from "../../assets/defaultUserPic.png";
import { useGetChatList } from "../../hooks/chatApis/useGetChatList";
import { Avatar } from '@mui/material';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#2563EB" size={150} />
    </div>
  );
};

const ChatList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [chatList, setChatList] = useState(null);
  const [chatListLoaded, setChatListLoaded] = useState(false);
  const [selectedChatData, setSelectedChatData] = useState(null);
  const [selectedAnyChat, setselectedAnyChat] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const res = await useGetChatList();
      setChatList(res.data.users);
      setChatListLoaded(true);
    };
    fetch();

    if (chatList !== null) setIsLoading(false);
  }, [chatListLoaded]);

  const handleChatItemClick = (user) => {
    console.log("selected user");
    console.log(user);
    const { HostID, annoucement_id, image, isHost, username,status } = user;
    setSelectedChatData({
      HostID,
      announcementID:annoucement_id,
      ContactImage:image,
      isHost,
      contactUsername:username,
      status
    });
    setselectedAnyChat(true);
    console.log("selected data");
    console.log(selectedChatData);
  };

  useEffect(() => {
    // Reset selectedAnyChat and selectedChatData when chatList changes
    setselectedAnyChat(false);
    setSelectedChatData(null);
  }, [chatList]);

  if (isLoading) {
    return <Loading />;
  }

  const refreshChatList = async () => {
    console.log("chat list is refreshiiing");
    setIsLoading(true); // Show loading indicator while fetching new data
    try {
      const res = await useGetChatList();
      setChatList(res.data.users); // Update chat list with new data
      setChatListLoaded(true); // You might need to manage this state based on your needs
    } catch (error) {
      console.error("Failed to refresh chat list:", error);
      // Handle error appropriately (e.g., show error message)
    }
    setIsLoading(false); // Hide loading indicator after fetching data
  };

  if (!chatList) {
    // Render a placeholder or some other UI when chatList is null
    return (
      
        <div>
          <div className="mt-[100%] text-2xl">You have not started any chats yet...</div>
        </div>
        
    );
  }

  return (
    <div className="w-full h-full flex items-start justify-center flex-row">
      {selectedAnyChat ? (
        <ChatRoom
        chatData={selectedChatData} 
        refresh={refreshChatList} 
        />
      ) : (
        <div className="w-1/2 h-[80vh] bg-gray-100 rounded-xl shadow-md flex items-center justify-center">
          <p className="text-lg text-gray-700">Select a chat to see messages</p>
        </div>
      )}

      <div className="w-1/3 h-[80vh] bg-gray-100 rounded-xl shadow-md overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
        {chatList.map((user) => (
          <div
            key={user.HostID}
            // className="w-full p-2 border-b-4 border-gray-200 bg-gray-100 rounded-xl shadow-md flex flex-row cursor-pointer"
            bg-slate-500
            className={`w-full p-2 border-b-4 border-gray-200 ${user.status === 2 ? 'blur-sm' : 'bg-gray-100'} rounded-xl shadow-md flex flex-row cursor-pointer`}
            onClick={() => handleChatItemClick(user)}
            
          >
            {/* <img
              className="h-16 w-16 border-4 rounded-full object-cover"
              src={user.image || defaultUserPic}
              alt="Profile"
            /> */}
            <Avatar
              src={user.image || defaultUserPic}
              sx={{ width: 64, height: 64, borderRadius: '50%' }}
            />
            <div className="user-info ml-6 flex items-center ">
              <span className="text-xl  text-gray-700">{user.username}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;