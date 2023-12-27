import React from "react";
import { MdClose } from "react-icons/md";

import Blogpage from "./EditBlog";

const BlogEditModal = ({ fetchData, data, isVisible, onClose }) => {
  if (!isVisible) return null;

  const handelClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };


  return (
    
    <div
      className="z-50 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handelClose}
    >
      <div className="w-[40rem] h-auto flex flex-col">
      <div className="bg-white p-5 rounded-lg relative h-[40rem] overflow-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200 scrollbar-thin">
          <button
            className="text-black text-xl absolute top-0 right-0 m-2 hover:bg-gray-200 p-0.5 rounded"
            onClick={() => onClose()}
          >
            <MdClose />
          </button>
          <div className=" p-5 rounded-lg">
            <Blogpage fetchData = {fetchData} data = {data} onClose = {onClose}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogEditModal;
