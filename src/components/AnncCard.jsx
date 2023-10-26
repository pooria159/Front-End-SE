import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faFlag, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

import bakimg from "../assets/baktash.jpg";

const Card = () => {
  return (
    <div className="max-w-md mx-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-l m-5">
      <div className="md:flex">
        <div className="md:flex-shrink-0 ">
          <img className="h-full w-full object-cover md:w-48 transform transition duration-500 hover:scale-110" src={bakimg} alt="An image"/>
        </div>
        <div className="p-5">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Baktash</div>
          
          <ul className="mt-3 text-gray-600 space-y-1">
            <li className='text-sm '><FontAwesomeIcon icon={faGlobe} /> Languages: English, Dutch</li>
            <li className='text-sm border-t'><FontAwesomeIcon icon={faFlag} /> State: Drenthe</li>
            <li className='text-sm border-t'><FontAwesomeIcon icon={faGlobe} /> Country: Netherlands</li>
            <li className='text-sm border-t'><FontAwesomeIcon icon={faCalendarAlt} /> Start Date: 01/01/2023</li>
            <li className='text-sm'><FontAwesomeIcon icon={faCalendarAlt} /> End Date: 31/12/2023</li>
          </ul>
          <p className="mt-2 text-gray-500 text-sm border-t">Your description goes here. Make it catchy! Your description goes here. Make it catchy!</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
