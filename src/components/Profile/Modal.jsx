import React from 'react'
import {MdClose} from "react-icons/md";

import CreateCardForm from '../ CreateCardForm';

const Modal = ({isVisible , onClose}) => {
  if (!isVisible) return null;

  const handelClose = (e) =>{
    if(e.target.id === 'wrapper') onClose();
  }

  return (
    <div className="z-50 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" id='wrapper' onClick={handelClose}>
      <div className="w-[35rem]  h-auto flex flex-col">
        <div className="bg-pallate-primary p-5 rounded relative">
          <button className="text-black text-xl absolute top-0 right-0 m-2 hover:bg-gray-50 p-0.5 rounded" onClick={() => onClose()}><MdClose/></button>
          <CreateCardForm/>
        </div>
      </div>
    </div>
  )
}

export default Modal
