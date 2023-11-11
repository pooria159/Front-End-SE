import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faVenusMars, faLanguage, faInfoCircle, faTags, faCoins, faCalendar } from '@fortawesome/free-solid-svg-icons';

const Genders = [" ", "Man" , "Woman", "Other"]
const Intrests = ['Coding', 'Traveling', 'Photography', 'Reading']

const InfoSec = ({ formData }) => {
  return (
    formData && <div className="p-6 w-5/6 mx-auto bg-white rounded-xl shadow-md flex flex-wrap">
      <div className="w-full sm:w-1/2 flex flex-col">
        <div className="flex items-center text-gray-500 mb-4">
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          <div className='flex gap-1'>Username: <p className='text-gray-600'>{formData.UserName}</p></div>
        </div>
        <div className="flex items-center text-gray-500 mb-4">
          <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
          <div className='flex gap-1'>Email: <p className='text-gray-600'>{formData.Email}</p></div>
        </div>
        <div className="flex items-center text-gray-500 mb-4">
          <FontAwesomeIcon icon={faVenusMars} className="mr-2" />
          <div className='flex gap-1'>Gender: <p className='text-gray-600'>{Genders[formData.Gender]}</p></div>
        </div>
        <div className="flex items-center text-gray-500 mb-4">
          <FontAwesomeIcon icon={faLanguage} className="mr-2" />
          {/* <div>Preferred Languages: {formData.languages.join(', ')}</div> */}
          <div className='flex gap-1'>Preferred Languages: <p className='text-gray-600'>English</p></div>
        </div>
        <div className="flex items-center text-gray-500 mb-4">
          <FontAwesomeIcon icon={faCalendar} className="mr-2" />
          <div className='flex gap-1'>Joining Date: <p className='text-gray-600'>{formData.JoiningDate}</p></div>
        </div>
        <div className="flex items-center text-gray-500 mb-4">
          <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
          <div className='flex gap-1'>Country: <p className='text-gray-600'>{formData.Country}</p></div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 flex flex-col">
        <div className="flex items-center text-gray-500 mb-4">
          <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
          <div className='flex gap-1'>Bio: <p className='text-gray-600'>{formData.Bio}</p></div>
        </div>
        <div className="flex items-center text-gray-500 mb-4">
          <FontAwesomeIcon icon={faTags} className="mr-2" />
          <div>Interests:
            <div className="flex flex-wrap ml-2">
              {Intrests.map((interest, index) => (
                <span key={index} className="m-1 bg-blue-200 text-blue-800 p-1 rounded">{interest}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center text-gray-500 mb-4">
          <FontAwesomeIcon icon={faCoins} className="mr-2" />
          <div className='flex gap-1'>Number of Coin: <p className='text-gray-600'>54</p></div>
        </div>
        <div className="flex items-center text-gray-500 mb-4">
          <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
          <div className='flex gap-1'>City: <p className='text-gray-600'>{formData.City}</p></div>
        </div>
        <div className="flex items-center text-gray-500 mb-4">
          <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
          <div className='flex gap-1'>State: <p className='text-gray-600'>{formData.State.length <= 1 ? "Haven't been set yet!" : formData.State}</p></div>
        </div>
      </div>
    </div>
  );
};

export default InfoSec;
