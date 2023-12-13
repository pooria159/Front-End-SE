import React from "react";
import defaultImage from "../../assets/person.png"; // Default image in case a user does not have a profile photo
// import { setState } from "@vitest/expect";
import ClipLoader from "react-spinners/ClipLoader";
import image from "../../assets/person.png";
import { useEffect, useState } from "react";
import ChatRoom from "../Chat/ChatRoom";
import image1 from "../../assets/baktash.jpg";
import image2 from "../../assets/fall.jpg";
import defaultUserPic from "../../assets/defaultUserPic.png";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#2563EB" size={150} />
    </div>
  );
};

const ChatList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [FormData, setFormData] = useState("hi");

  useEffect(() => {
    if (FormData !== null) setIsLoading(false);
  }, [FormData]);

  // Sample data for users (replace this with actual user data)
  const users = [
    { id: 1, name: "John Doe", photo: image1 },
    { id: 2, name: "Jane Smith", photo: defaultUserPic },
    { id: 1, name: "John Doe", photo: image1 },
    { id: 1, name: "John Doe", photo: image2 },
    { id: 1, name: "John Doe", photo: image1 },
    { id: 2, name: "Jane Smith", photo: defaultUserPic },
    { id: 1, name: "John Doe", photo: image1 },
    { id: 1, name: "John Doe", photo: image2 },
    // Add more users as needed
  ];

  return isLoading ? (
    <Loading />
  ) : (
    <div className="h-screen space-y-5 w-full h-full flex items-center justify-center">
      <div className="p-6 w-1/2 h-screen bg-white rounded-xl shadow-md overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
        {users.map((user) => (
          <div className="w-full p-2 border-b-4 border-gray-200 bg-white rounded-xl shadow-md flex flex-row">
            <img
              className="h-24 w-24 border-4 rounded-full"
              src={user.photo}
              alt="Profile"
            />
            <div className="user-info ml-6 flex items-center ">
              <text className="text-xl  text-gray-700">{user.name}</text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
