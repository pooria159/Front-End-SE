import React, { useState } from 'react'
import {MdClose} from "react-icons/md";
import Accept from './Accept';
import Decline from './Decline';

const Modal = ({isVisible , onClose , isAccept}) => {

  if (!isVisible) return null;

  const handelClose = (e) =>{
    if(e.target.id === 'wrapper') onClose();
  }

  return (
    <div className="z-50 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" id='wrapper' onClick={handelClose}>
      <div className="w-[20rem] h-[20rem] flex flex-col">
        <div className="bg-white p-5 rounded relative">
          <button className="text-black text-xl absolute top-0 right-0 m-2 hover:bg-gray-300 p-0.5 rounded" onClick={() => onClose()}><MdClose/></button>
            {isAccept ? <Accept /> : <Decline />}
        </div>
      </div>
    </div>
  )
}

export default Modal
