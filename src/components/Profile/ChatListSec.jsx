import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import ChatRoom from "../Chat/ChatRoom";
import defaultUserPic from "../../assets/defaultUserPic.png";
import { useGetChatList } from "../../hooks/chatApis/useGetChatList";

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
    const { HostID, announcement_id, image, isHost, username } = user;
    setSelectedChatData({
      HostID,
      announcementID:announcement_id,
      ContactImage:image,
      isHost,
      contactUsername:username,
    });
    setselectedAnyChat(true);
  };

  useEffect(() => {
    // Reset selectedAnyChat and selectedChatData when chatList changes
    setselectedAnyChat(false);
    setSelectedChatData(null);
  }, [chatList]);

  if (isLoading) {
    return <Loading />;
  }

  if (!chatList) {
    // Render a placeholder or some other UI when chatList is null
    return (
      <div className="w-full h-full flex items-start justify-center flex-row">
        <div className="w-1/2 h-[80vh] bg-gray-100 rounded-xl shadow-md flex items-center justify-center">
          <p className="text-lg text-gray-700">You have not started any chats yet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-start justify-center flex-row">
      {selectedAnyChat ? (
        <ChatRoom chatData={selectedChatData} />
      ) : (
        <div className="w-1/2 h-[80vh] bg-gray-100 rounded-xl shadow-md flex items-center justify-center">
          <p className="text-lg text-gray-700">Select a chat to see messages</p>
        </div>
      )}

      <div className="w-1/3 h-[80vh] bg-gray-100 rounded-xl shadow-md overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
        {chatList.map((user) => (
          <div
            key={user.HostID}
            className="w-full p-2 border-b-4 border-gray-200 bg-gray-100 rounded-xl shadow-md flex flex-row cursor-pointer"
            onClick={() => handleChatItemClick(user)}
          >
            <img
              className="h-16 w-16 border-4 rounded-full object-cover"
              src={user.image || defaultUserPic}
              alt="Profile"
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

// import React, { useEffect, useState } from "react";
// import ClipLoader from "react-spinners/ClipLoader";
// import ChatRoom from "../Chat/ChatRoom";
// import defaultUserPic from "../../assets/defaultUserPic.png";
// import { useGetChatList } from "../../hooks/chatApis/useGetChatList";

// const Loading = () => {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <ClipLoader color="#2563EB" size={150} />
//     </div>
//   );
// };

// const ChatList = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [chatList, setChatList] = useState(null);
//   const [chatListLoaded, setChatListLoaded] = useState(false);
//   const [selectedContactID, setSelectedContactID] = useState(null);
//   const [selectedContactImageURL, setSelectedContactImageURL] = useState(null);
//   const [selectedAnyChat, setselectedAnyChat] = useState(false);

//   useEffect(() => {
//     const fetch = async () => {
//       const res = await useGetChatList();
//       setChatList(res.data.users);
//       setChatListLoaded(true);
//     };
//     fetch();

//     if (chatList !== null) setIsLoading(false);
//   }, [chatListLoaded]);

//   const handleChatItemClick = (user) => {
//     setSelectedContactID(user.HostID);
//     setSelectedContactImageURL(user.image);
//     setselectedAnyChat(true);
//   };

//   if (isLoading) {
//     return <Loading />;
//   }

//   if (!chatList) {
//     // Render a placeholder or some other UI when chatList is null
//     return (
//       <div className="w-full h-full flex items-start justify-center flex-row">
//         <div className="w-1/2 h-[80vh] bg-gray-100 rounded-xl shadow-md flex items-center justify-center">
//           <p className="text-lg text-gray-700">You have not started any chats yet...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full h-full flex items-start justify-center flex-row">
//       {selectedAnyChat ? (
//         <ChatRoom hostId={selectedContactID} hostImage={selectedContactImageURL} />
//       ) : (
//         <div className="w-1/2 h-[80vh] bg-gray-100 rounded-xl shadow-md flex items-center justify-center">
//           <p className="text-lg text-gray-700">Select a chat to see messages</p>
//         </div>
//       )}

//       <div className="w-1/3 h-[80vh] bg-gray-100 rounded-xl shadow-md overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
//         {chatList.map((user) => (
//           <div
//             key={user.HostID}
//             className="w-full p-2 border-b-4 border-gray-200 bg-gray-100 rounded-xl shadow-md flex flex-row cursor-pointer"
//             onClick={() => handleChatItemClick(user)}
//           >
//             <img
//               className="h-16 w-16 border-4 rounded-full object-cover"
//               src={user.image || defaultUserPic}
//               alt="Profile"
//             />
//             <div className="user-info ml-6 flex items-center ">
//               <span className="text-xl  text-gray-700">{user.username}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ChatList;


