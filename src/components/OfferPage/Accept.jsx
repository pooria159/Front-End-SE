import React from 'react';
import {MdOutlineWarningAmber} from "react-icons/md";

const Accept = ({ closeModal, deleteCard }) => {
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
        <button onClick={() => { closeModal(); deleteCard(); }} type="button" className="inline-block rounded w-24 bg-green-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
          Yes
        </button>
        <button onClick={closeModal} type="button" className="inline-block rounded w-24 bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-red-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-red-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
          No
        </button>
      </div>
    </div>
  )
}

export default Accept
