import React, { useEffect, useState, useRef } from "react";
import getDecodedToken from "../../hooks/useDecodedToken";
import { useGetChatHistory } from "../../hooks/useGetChatHistory";
import { useGetChatMessageCount } from "../../hooks/useGetChatMessageCount";
import image1 from "../../assets/baktash.jpg";
import pic from "../../assets/chat.jpg";




const wsurl = import.meta.env.VITE_WEBSOCKET_CHAT_URL;

function ChatRoom() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const myToken = getDecodedToken();
  const myID = myToken.UserID;
  const myUsername = myToken.UserName;
  let currentpage = 1;
  let messageCount = 0;
  const id1 = 1;
  const id2 = 2;
  const myImageUrl ="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
  const othersImageUrl="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
  let firstID, secondID;
  const [shouldScroll, setShouldScroll] = useState(true);

  if (id1 > id2) {
    firstID = id2;
    secondID = id1;
  } else {
    firstID = id1;
    secondID = id2;
  }

  const messageListRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countResponse = await useGetChatMessageCount(firstID, secondID);
        messageCount = countResponse.data.count;
        console.log("messages count is ", messageCount);

        const historyResponse = await useGetChatHistory(
          firstID,
          secondID,
          messageCount,
          currentpage
        );
        setMessages(historyResponse.data.reverse());

        if (messageListRef.current) {
          messageListRef.current.scrollTop =
            messageListRef.current.scrollHeight;
        }

        console.log(messages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const socket = new WebSocket(wsurl + "/" + firstID + "/" + secondID);
    setWs(socket);

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setShouldScroll(true);
      };
    }
  }, [ws]);

  useEffect(() => {
    // Scroll to the bottom of the message list after the messages have been updated
    if (messageListRef.current && shouldScroll) {
      // Use setTimeout to wait for the state to be updated before scrolling
      setTimeout(() => {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        setShouldScroll(false);
      }, 0);
    }
  }, [shouldScroll, messages]);

  const loadMoreMessages = async () => {
    try {
      // Get the current scroll position before fetching more messages
      const firstScroll = messageListRef.current.scrollTop;

      // Increment currentpage and fetch the next page
      currentpage += 1;
      const historyResponse = await useGetChatHistory(
        firstID,
        secondID,
        messageCount,
        currentpage
      );
      const fetchedMessages = historyResponse.data.reverse();

      // Update state with the new messages
      setMessages((prevMessages) => [...fetchedMessages, ...prevMessages]);

      // Set the scroll position back to the previous value + 880 pixels
      if (messageListRef.current) {
        messageListRef.current.scrollTop = firstScroll + 800;
      }
    } catch (error) {
      console.error("Error fetching more messages:", error);
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
      // Set shouldScroll to true when a message is sent
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (messageListRef.current.scrollTop === 0) {
        console.log("handle scroll is called");
        loadMoreMessages();
      }
    };

    if (messageListRef.current) {
      messageListRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (messageListRef.current) {
        messageListRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [messageListRef]);

  return (
    <div>
    <div className="flex sm:items-center justify-between py-3 border-b-2 bg-gray-300 rounded-md border-gray-200">
          <div className="relative flex items-center space-x-4">
            <div className="relative ml-4">
              <img
                src={image1}
                alt=""
                className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <div className="text-2xl mt-1 flex items-center">
                <span className="text-gray-700 mr-3">Baktash Ansari</span>
              </div>
              <span className="text-lg text-gray-600">journey Host</span>
            </div>
          </div>
        </div>
    {/* <div className="bg-gray-100 p-4 rounded-lg shadow-lg w-full h-full"> */}
    <div
          id="messages"
          className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch bg-gray-100 p-4 rounded-lg shadow-lg w-full h-full"
        >
      <div
        ref={messageListRef}
        className="message-list h-60 overflow-y-auto space-y-4"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.username === myUsername ? "right" : "left"
            }`}
          >
            <div className={`flex items-end ${msg.username === myUsername ? "justify-end" : ""}`}>
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2">
                <div>
                  <span
                    className={`px-4 py-2 rounded-lg inline-block ${
                      msg.username === myUsername
                        ? "rounded-br-none bg-blue-600 text-white"
                        : "rounded-bl-none bg-gray-300 text-gray-600"
                    }`}
                  >
                    <p class="text-sm">
                      {msg.username}
                    </p>
                    <p class="text-base">{msg.message}</p>
                    
                    <p class="text-xs">({msg.time})</p>
                  </span>
                </div>
              </div>
              <img
                src={msg.username === myUsername ? pic : image1}
                alt="Profile"
                className={`w-6 h-6 rounded-full order-${msg.username === myUsername ? 2 : 1}`}
              />
            </div>
          </div>
        ))}
      </div>
            
       
  <div className="border-t-2 border-gray-200 sm:mb-0">
  <div className="relative flex items-center p-2">
  <input
    type="text"
    placeholder="Write your message!"
    className="flex-grow focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-3 pr-2 bg-gray-200 rounded-md py-3 resize-none"
    // style={{ maxWidth: "50%" }}
    value={message}
    onChange={(e) => setMessage(e.target.value)}
  />
  <div className="flex-shrink-0 ml-2">
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
    >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6 text-gray-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
          ></path>
        </svg>
      </button>
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
        onClick={() => {
          sendMessage();
        }}
      >
        <span className="font-bold">Send</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-6 w-6 ml-2 transform rotate-90"
        >
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
        </svg>
      </button>
    </div>
  </div>
</div>
    </div>
    </div>
  );
}

export default ChatRoom;
