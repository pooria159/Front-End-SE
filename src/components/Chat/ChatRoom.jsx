// import React, { useEffect, useState, useRef } from "react";
// import getDecodedToken from "../../hooks/useDecodedToken";
// import { useGetChatMessageCount } from "../../hooks/useGetChatMessageCount";
// import { useGetChatHistory } from "../../hooks/useGetChatHistory";

// const wsurl = import.meta.env.VITE_WEBSOCKET_CHAT_URL;

// function ChatRoom() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [ws, setWs] = useState(null);
//   const myToken = getDecodedToken();
//   const myID = myToken.UserID;
//   const myUsername = myToken.UserName;
//   let currentpage = 1;

//   const messageListRef = useRef(null);

//   useEffect(() => {
//     const id1 = 1;
//     const id = 2;
//     let firstID, secondID;

//     if (id1 > id) {
//       firstID = id;
//       secondID = id1;
//     } else {
//       firstID = id1;
//       secondID = id;
//     }

//     const fetchData = async () => {
//       try {
//         const countResponse = await useGetChatMessageCount(firstID, secondID);
//         const messageCount = countResponse.data.count;
//         console.log("messages count is ", messageCount);

//         const historyResponse = await useGetChatHistory(
//           firstID,
//           secondID,
//           messageCount,
//           currentpage
//         );
//         setMessages(historyResponse.data.reverse());
//         console.log(messages);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();

//     const socket = new WebSocket(wsurl + "/" + firstID + "/" + secondID);
//     setWs(socket);

//     return () => {
//       // Close the WebSocket connection when the component unmounts
//       if (ws) {
//         ws.close();
//       }
//     };
//   }, []); // Empty dependency array to ensure this effect runs only once

//   useEffect(() => {
//     if (ws) {
//       ws.onmessage = (event) => {
//         console.log("new on message");
//         console.log(event.data);
//         const newMessage = JSON.parse(event.data);
//         setMessages((prevMessages) => [...prevMessages, newMessage]);
//       };
//     }
//   }, [ws]);

//   useEffect(() => {
//     // Scroll to the bottom of the message list when messages change
//     if (messageListRef.current) {
//       messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const sendMessage = () => {
//     if (message && ws) {
//       const chatRequest = {
//         message: message,
//         user_id: myID,
//         username: myUsername,
//       };

//       ws.send(JSON.stringify(chatRequest));
//       setMessage("");
//     }
//   };

//   return (
//     <div className="bg-gray-100 p-4 rounded-lg shadow-lg w-full">
//       <div ref={messageListRef} className="message-list h-60 overflow-y-auto space-y-4">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`chat-message ${
//               msg.username === myUsername ? "right" : "left"
//             }`}
//           >
//             <div className="flex items-end justify-end">
//               <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1">
//                 <div>
//                   <span
//                     className={`px-4 py-2 rounded-lg inline-block ${
//                       msg.username === myUsername
//                         ? "rounded-br-none bg-blue-600 text-white"
//                         : "rounded-bl-none bg-gray-300 text-gray-600"
//                     }`}
//                   >
//                     <div>
//                       <strong>{msg.username}</strong>
//                     </div>
//                     {msg.message}
//                     <div className="text-sm text-right c">({msg.time})</div>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
//         <div className="relative flex">
//           <input
//             type="text"
//             placeholder="Write your message!"
//             className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//           <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
//             <button
//               type="button"
//               className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
//               // onClick={sendMessage}
//             >
//               {/* ... (send icon SVG) */}
//             </button>
//             <button
//               type="button"
//               className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
//               onClick={sendMessage}
//             >
//               <span className="font-bold">Send</span>
//               {/* ... (send icon SVG) */}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatRoom;

import React, { useEffect, useState, useRef } from "react";
import getDecodedToken from "../../hooks/useDecodedToken";
import { useGetChatHistory } from "../../hooks/useGetChatHistory";
import { useGetChatMessageCount } from "../../hooks/useGetChatMessageCount";


const wsurl = import.meta.env.VITE_WEBSOCKET_CHAT_URL;

function ChatRoom() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const myToken = getDecodedToken();
  const myID = myToken.UserID;
  const myUsername = myToken.UserName;
  let currentpage = 1;
  let messageCount=0;
  const id1 = 1;
  const id2 = 2;
  let firstID, secondID;

  if (id1 > id2) {
    firstID = id2;
    secondID = id1;
  } else {
    firstID = id1;
    secondID = id2;
  }

  const messageListRef = useRef(null);

  useEffect(() => {
    
    // currentpage=0;
    const fetchData = async () => {
      try {
        const countResponse = await useGetChatMessageCount(firstID, secondID);
        messageCount = countResponse.data.count;
        console.log("messages count is ", messageCount);

        const historyResponse = await useGetChatHistory(firstID,secondID,messageCount,currentpage);
        setMessages(historyResponse.data.reverse());
        console.log(messages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const socket = new WebSocket(wsurl + "/" + firstID + "/" + secondID);
    setWs(socket);

    return () => {
      // Close the WebSocket connection when the component unmounts
      if (ws) {
        ws.close();
      }
    };
  }, []); // Empty dependency array to ensure this effect runs only once

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      };
    }
  }, [ws]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (messageListRef.current) {
        messageListRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [messageListRef]);

  useEffect(() => {
    // Scroll to the bottom of the message list when messages change
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);
  const loadMoreMessages = async () => {
    try {
      // Get the current scroll position before fetching more messages
      const firstScroll = messageListRef.current;
  
      // Increment currentpage and fetch the next page
      currentpage += 1;
      const historyResponse = await useGetChatHistory(firstID, secondID, messageCount, currentpage);
  
      // Update state with the new messages
      setMessages((prevMessages) => [...historyResponse.data.reverse(), ...prevMessages]);
  
      // Set the scroll position back to the previous value
      // if (messageListRef.current) {
      //   messageListRef.current.scrollTop = currentScrollTop + messageListRef.current.scrollHeight;
      // }
    } catch (error) {
      console.error("Error fetching more messages:", error);
    }
  };
  
  // const loadMoreMessages = async () => {
  //   try{
  //     // Increment currentpage and fetch the next page
  //     currentpage += 1;
  //     const historyResponse = await useGetChatHistory(firstID, secondID, messageCount, currentpage);

  //     // Update state with the new messages
  //     setMessages((prevMessages) => [...historyResponse.data.reverse(), ...prevMessages]);

  //     // Update current page
  //     // currentpage = nextPage;
  //   } catch (error) {
  //     console.error("Error fetching more messages:", error);
  //   }
  // };

  const handleScroll = () => {
    if (messageListRef.current.scrollTop ===0) {
      console.log("handle scroll is called");
      loadMoreMessages();
    }
  };

  const sendMessage = () => {
    if (message && ws) {
      const chatRequest = {
        message: message,
        user_id: myID,
        username: myUsername,
      };

      ws.send(JSON.stringify(chatRequest));
      setMessage("");
      }
    };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg w-full">
      <div ref={messageListRef} className="message-list h-60 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.username === myUsername ? "right" : "left"
            }`}
          >
            <div className="flex items-end justify-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1">
                <div>
                  <span
                    className={`px-4 py-2 rounded-lg inline-block ${
                      msg.username === myUsername
                        ? "rounded-br-none bg-blue-600 text-white"
                        : "rounded-bl-none bg-gray-300 text-gray-600"
                    }`}
                  >
                    <div>
                      <strong>{msg.username}</strong>
                    </div>
                    {msg.message}
                    <div className="text-sm text-right c">({msg.time})</div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div className="relative flex">
          <input
            type="text"
            placeholder="Write your message!"
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              // onClick={sendMessage}
            >
              {/* ... (send icon SVG) */}
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
              onClick={sendMessage}
            >
              <span className="font-bold">Send</span>
              {/* ... (send icon SVG) */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
