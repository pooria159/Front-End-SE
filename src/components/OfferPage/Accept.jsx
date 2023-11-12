import React from 'react';
import {MdOutlineWarningAmber} from "react-icons/md";

const Accept = ({ closeModal, deleteCard }) => {

  const handleYesClick = () => {
    closeModal();
    deleteCard();
  };
  const handleNoClick = () => {
    closeModal();
  };


  return (
    <div className="block rounded-lg bg-white p-6">
    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800" style={{ display: 'flex', alignItems: 'center' }}>
      <MdOutlineWarningAmber className='text-yellow-400 text-3xl'/>
      <span style={{ marginLeft: '10px' }}>Warning</span>
    </h5>
      <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
      Are you sure you want to give this user hosting access?      
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={handleYesClick} type="button" className="inline-block w-24 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Yes
        </button>
        <button onClick={handleNoClick} type="button" className="inline-block w-24 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          No
        </button>
      </div>
    </div>
  )
}

export default Accept
