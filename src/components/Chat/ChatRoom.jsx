import React, { useEffect, useState } from "react";

function ChatRoom({ username }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Create a WebSocket connection
    // const newWebSocket = new WebSocket('wss://your-websocket-server-url');

    // newWebSocket.onopen = () => {
    //   console.log('WebSocket connection opened');
    //   setWs(newWebSocket);
    // };

    // newWebSocket.onmessage = (event) => {
    //   const newMessage = JSON.parse(event.data);
    //   setMessages((prevMessages) => [...prevMessages, newMessage]);
    // };

    // newWebSocket.onclose = () => {
    //   console.log('WebSocket connection closed');
    // };

    // return () => {
    //   if (ws) {
    //     ws.close();
    //   }
    // };
    setMessages(sampleMessages);
  }, []);

  const sendMessage = () => {
    if (message && ws) {
      const newMessage = {
        username,
        text: message,
        timestamp: new Date().toLocaleTimeString(),
      };

      // Send the message to the server
      ws.send(JSON.stringify(newMessage));

      // Update the local state
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const sampleMessages = [
    {
      username: "User1",
      text: "Hello, how are you?",
      timestamp: "10:00 AM",
    },
    {
      username: "User2",
      text: "I am good, thanks! How about you?",
      timestamp: "10:05 AM",
    },
    {
      username: "User1",
      text: "I am doing well too.",
      timestamp: "10:10 AM",
    },
    {
      username: "User1",
      text: "I am doing well too.",
      timestamp: "10:10 AM",
    },
    {
      username: "User1",
      text: "I am doing well too.ffdgfdffd ghfgfhf ytuytuytyut ytyuytuyt",
      timestamp: "10:10 AM",
    },
    {
      username: "User1",
      text: "I am doing well too.",
      timestamp: "10:10 AM",
    },
    {
      username: "User1",
      text: "I am doing well too.",
      timestamp: "10:10 AM",
    },
  ];

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
            <div>{msg.text} </div>
            <div className="text-sm text-right c">({msg.timestamp})</div>
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
