import React, { useEffect, useState } from "react";
const wsurl = import.meta.env.VITE_WEBSOCKET_CHAT_URL;
import getDecodedToken from "../../hooks/useDecodedToken";

function ChatRoom() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);

  useState(() => {
    // const id = getDecodedToken();
    /////needs to be changed
    const id1 = 3;
    const id = 2;
    ///////
    let firstID, secondID;

    if (id1 > id.UserID) {
      firstID = id.UserID;
      secondID = id1;
    } else {
      firstID = id1;
      secondID = id.UserID;
    }
    ////////////needs to be changed
    const socket = new WebSocket(wsurl + "/"+firstID+"/"+secondID);
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

    socket.onmessage = (event) => {
      console.log("new on message");
      console.log(event);
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []); // Empty dependency array to run this effect only once

  const sendMessage = () => {
    const id = getDecodedToken();
    // console.log("send is called");
    if (message && ws) {
      const chatRequest = {
        message: message,
        user_id: id.UserID,
        username: id.UserName,
      };

      // Send the chat request to the server
      ws.send(JSON.stringify(chatRequest));
      // console.log("send is DONE");
      // Update the local state
      // setMessages([...messages, chatRequest]);
      setMessage("");
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg w-full">
      <h2 className="text-xl font-bold mb-4">Welcome !</h2>
      <div className="message-list h-60 overflow-y-auto">
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
        {/* <input
  type="text"
  className="flex-grow px-3 py-2 rounded-full border-2 border-gray-200 focus:outline-none focus:border-blue-500"
  placeholder="Type your message..."
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  onKeyPress={(e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  }}
/> */}
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
