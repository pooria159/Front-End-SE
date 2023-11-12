import React, { useEffect, useState } from "react";
const wsurl = import.meta.env.VITE_WEBSOCKET_CHAT_URL;
import getDecodedToken from "../../hooks/useDecodedToken";

function ChatRoom() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const id = getDecodedToken();
    const id1 = 11;
    let firstID, secondID;
    console.log("id issss");
    console.log(id);
    if(id1>id.UserID){
      firstID=id.UserID
      secondID=id1
    }else{
      firstID=id1
      secondID=id.UserID
    }
    //const socket = new WebSocket(wsurl + "/" + firstID + "/" + secondID);
    const socket = new WebSocket(wsurl + "/2/3" );
    socket.onopen = (event) => {
      console.warn("WebSocket connection opened:", event);
      setWs(socket);  
    };

    socket.onclose = (event) => {
      console.error("WebSocket connection closed:", event);
    };

    socket.onerror = (event) => {
      console.error("WebSocket error:", event);
      
    };

    
    // Create a WebSocket connection
    // const newWebSocket = new WebSocket('wss://your-websocket-server-url');

    // newWebSocket.onopen = () => {
    //   console.log('WebSocket connection opened');
    //   setWs(newWebSocket);
    // };

    socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    // newWebSocket.onclose = () => {
    //   console.log('WebSocket connection closed');
    // };

    // return () => {
    //   if (ws) {
    //     ws.close();
    //   }
    // };
    // setMessages(sampleMessages);
  }, []);

 


  const sendMessage = () => {
    const id = getDecodedToken();
    console.log("send is called");
    if (message && ws) {
      const chatRequest = {
        message: message,
        user_id: id.UserID,
        username: id.UserName,
      };

      // Send the chat request to the server
      ws.send(JSON.stringify(chatRequest));
      console.log("send is DONE");
      // Update the local state
      // setMessages([...messages, chatRequest]);
      setMessage("");
    }
  };


  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg w-full">
      <h2 className="text-xl font-bold mb-4">Welcome !</h2>
      <div className="message-list max-h-60 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="bg-white p-2 mb-2 rounded-md shadow-md w-3/4"
          >
            <strong>{msg.username}</strong>
            <div>{msg.message} </div>
            <div className="text-sm text-right c">({msg.time})</div>
          </div>
        ))}
      </div>
      <div className="message-input mt-4 w-full flex items-center">
        <input
            type="text"
            className="flex-grow px-3 py-2 rounded-full border-2 border-gray-200 focus:outline-none focus:border-blue-500"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
        />
        <button
            className="ml-4 bg-blue-500 text-white px-2 py-2 rounded-full"
            onClick={sendMessage}
        >
            Send
        </button>
        </div>
    </div>
  );
}

export default ChatRoom;

// import React, { useEffect, useState, useCallback } from "react";

// const wsurl = import.meta.env.VITE_WEBSOCKET_CHAT_URL;
// import getDecodedToken from "../../hooks/useDecodedToken";

// function ChatRoom() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [ws, setWs] = useState(null);

//   const id = getDecodedToken();

//   const sendMessage = useCallback(() => {
//     console.log("send is called");
//     if (message && ws) {
//       const chatRequest = {
//         message: message,
//         user_id: id.UserID,
//         username: id.UserName,
//       };

//       // Send the chat request to the server
//       ws.send(JSON.stringify(chatRequest));
//       console.log("send is DONE");
//       // Update the local state
//       setMessages((prevMessages) => [...prevMessages, chatRequest]);
//       setMessage("");
//     }
//   }, [message, ws, id.UserID, id.UserName]);

//   useEffect(() => {
//     const id1 = 11;
//     let firstID, secondID;

//     console.log("id issss");
//     console.log(id);

//     if (id1 > id.UserID) {
//       firstID = id.UserID;
//       secondID = id1;
//     } else {
//       firstID = id1;
//       secondID = id.UserID;
//     }

//     const socket = new WebSocket(wsurl + "/2/3");
//     socket.onopen = (event) => {
//       console.warn("WebSocket connection opened:", event);
//       setWs(socket);
//     };

//     socket.onclose = (event) => {
//       console.error("WebSocket connection closed:", event);
//     };

//     socket.onerror = (event) => {
//       console.error("WebSocket error:", event);
//     };

//     socket.onmessage = (event) => {
//       const newMessage = JSON.parse(event.data);
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     };

//     return () => {
//       if (socket) {
//         socket.close();
//       }
//     };
//   }, [id]);

//   return (
//     <div className="bg-gray-100 p-4 rounded-lg shadow-lg w-full">
//          <h2 className="text-xl font-bold mb-4">Welcome !</h2>
//            <div className="message-list max-h-60 overflow-y-auto">
//              {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-2 mb-2 rounded-md shadow-md w-3/4"
//               >
//                 <strong>{msg.username}</strong>
//                 <div>{msg.message} </div>
//                 <div className="text-sm text-right c">({msg.time})</div>
//               </div>
//             ))}
//           </div>
//           <div className="message-input mt-4 w-full flex items-center">
//             <input
//                 type="text"
//                 className="flex-grow px-3 py-2 rounded-full border-2 border-gray-200 focus:outline-none focus:border-blue-500"
//                 placeholder="Type your message..."
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//             />
//             <button
//                 className="ml-4 bg-blue-500 text-white px-2 py-2 rounded-full"
//                 onClick={sendMessage}
//             >
//                 Send
//             </button>
//             </div>
//         </div>
//   );
// }

// export default ChatRoom;

