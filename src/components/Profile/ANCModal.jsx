import React from "react";
import { MdClose } from "react-icons/md";

import CreateCardForm from "../ CreateCardForm";

const ANCModal = ({ isVisible, onClose }) => {
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
      <div className="w-[35rem]  h-auto flex flex-col">
        <div className="bg-gradient-to-r from-white/60 to-indigo-600 p-5 rounded relative">
          <button
            className="text-black text-xl absolute top-0 right-0 m-2 hover:bg-gray-50 p-0.5 rounded"
            onClick={() => onClose()}
          >
            <MdClose />
          </button>
          <div className=" p-5 rounded-lg">
            <CreateCardForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ANCModal;
