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
  const [selectedContactID, setSelectedContactID] = useState(null);
  const [selectedContactImageURL, setSelectedContactImageURL] = useState(null);
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
    setSelectedContactID(user.HostID);
    setSelectedContactImageURL(user.image);
    setselectedAnyChat(true);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="w-full h-full flex items-start justify-center flex-row">
      {selectedAnyChat ? (
        <ChatRoom hostId={selectedContactID} hostImage={selectedContactImageURL} />
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

// import React from "react";
// import defaultImage from "../../assets/person.png"; // Default image in case a user does not have a profile photo
// import ClipLoader from "react-spinners/ClipLoader";
// import image from "../../assets/person.png";
// import { useEffect, useState } from "react";
// import ChatRoom from "../Chat/ChatRoom";
// import image1 from "../../assets/baktash.jpg";
// import image2 from "../../assets/fall.jpg";
// import defaultUserPic from "../../assets/defaultUserPic.png";
// import { useGetChatList } from "../../hooks/chatApis/useGetChatList";
// // import ChatRoom from "../Chat/ChatRoom";

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
//   const[selectedContactID,setSelectedContactID]=null;
//   const[selectedContactImageURL,setSelectedContactImageURL]=null;
//   const[selectedAnyChat,setselectedAnyChat]=false;

//   useEffect(() => {
//     const fetch = async () => {
//       const res = await useGetChatList();
//       setChatList(res.data.users);
//       setChatListLoaded(true);
//   }
//   fetch();

//     if (chatList !== null) setIsLoading(false);

//   }, [chatListLoaded]);

//   // Sample data for users (replace this with actual user data)
//   const users = [
//     { id: 1, name: "John Doe", photo: image1 },
//     { id: 2, name: "Jane Smith", photo: defaultUserPic },
//     { id: 1, name: "John Doe", photo: image1 },
//     { id: 1, name: "John Doe", photo: image2 },
//     { id: 1, name: "John Doe", photo: image1 },
//     { id: 2, name: "Jane Smith", photo: defaultUserPic },
//     { id: 1, name: "John Doe", photo: image1 },
//     { id: 1, name: "John Doe", photo: image2 },
//     // Add more users as needed
//   ];

//   return isLoading ? (
//     <Loading />
//   ) : (
    
//     <div className=" w-full h-full flex items-start justify-center flex-row">
//       <ChatRoom hostId={selectedContactID} hostImage={selectedContactImageURL}/>
//       <div className=" w-1/3 h-[80vh] bg-white rounded-xl shadow-md overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
//         {chatList.map((user) => (
//           <div className="w-full p-2 border-b-4 border-gray-200 bg-white rounded-xl shadow-md flex flex-row">
//             <img
//               className="h-16 w-16 border-4 rounded-full object-cover"
//               src={user.image}
//               alt="Profile"
//             />
//             <div className="user-info ml-6 flex items-center ">
//               <span className="text-xl  text-gray-700">{user.HostID}</span>
//             </div>
//           </div>
//         ))}
//       </div>

      
//     </div>
//   );
// };

// export default ChatList;
