import React from 'react'

const Modal = ({isVisible , onClose}) => {
  if (!isVisible) return null;

  const handelClose = (e) =>{
    if(e.target.id === 'wrapper') onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" id='wrapper' onClick={handelClose}>
      <div className="w-[600px] flex flex-col">
        <button className="text-red-700 text-xl place-self-end" onClick={() => onClose()}>X</button>
        <div className="bg-white p-2 rounded">
          test
        </div>
      </div>
    </div>
  )
}

export default Modal

