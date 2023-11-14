import React,{useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faVenusMars, faLanguage, faInfoCircle, faTags, faChild, faCalendar, faPhone, faAddressCard, faDog, faSmoking, faBed } from '@fortawesome/free-solid-svg-icons';
import { Chip } from '@material-tailwind/react';
import ClipLoader from "react-spinners/ClipLoader";

const Genders = [" ", "Man" , "Woman", "Other"]
const Intrests = ['Coding', 'Traveling', 'Photography', 'Reading']
const Languages = ['English', 'Spanish', "Farsi"]

const Chips = ({text}) => {
  return(
    <div class="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-blue-700 bg-blue-100 border border-blue-300 ">
        <div class="text-s font-normal leading-none max-w-full flex-initial">{text}</div>
    </div>
  );
}

const Loading = () => {
  return (
      <div className="flex justify-center items-center h-screen">
          <ClipLoader color="#2563EB" size={150} />
      </div>
  );
};


const InfoSec = ({ formData }) => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(formData !== null)
      setIsLoading(false);
  }, [formData]);

  return (
    isLoading ? <Loading/> : 
    <div className='space-y-5 w-full h-full'>
      <div className="p-6 w-5/6 mx-auto bg-white rounded-xl shadow-md flex flex-wrap">
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
            <FontAwesomeIcon icon={faCalendar} className="mr-2" />
            <div className='flex gap-1'>Joining Date: <p className='text-gray-600'>{formData.JoiningDate}</p></div>
          </div>
          
        </div>
        <div className="w-full sm:w-1/2 flex flex-col">
          <div className="flex items-center text-gray-500 mb-4">
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
            <div className='flex gap-1'>Country: <p className='text-gray-600'>{formData.Country}</p></div>
          </div>
          <div className="flex items-center text-gray-500 mb-4">
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
            <div className='flex gap-1'>State: <p className='text-gray-600'>{formData.State == null || formData.State.length <= 1 ? "Haven't been set yet!" : formData.State}</p></div>
          </div>
          <div className="flex items-center text-gray-500 mb-4">
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
            <div className='flex gap-1'>City: <p className='text-gray-600'>{formData.City == null || formData.City.length <= 1 ? "Haven't been set yet!" : formData.City}</p></div>
          </div>
        </div>
      </div>

      <div className='flex flex-col justify-center items-center'>
        <div className='text-xl font-bold mb-2'>Host Section</div>
        <div className="p-6 w-5/6 mx-auto bg-white rounded-xl shadow-md flex flex-wrap">
          <div className="w-full sm:w-1/2 flex flex-col">

            <div className="items-center text-gray-500 mb-4">
              <FontAwesomeIcon icon={faLanguage} className="mr-2" />
              {/* <div>Preferred Languages: {formData.languages.join(', ')}</div> */}
              Preferred Languages:
              <div>
                  <div className="flex flex-wrap ml-2">
                    {Languages.map((language, index) => {
                      return <Chips key={index} text = {language}/>
                    })}
                  </div>
              </div>
            </div>
            <div className="items-center text-gray-500 mb-4">
              <FontAwesomeIcon icon={faAddressCard} className="mr-2" />
              {/* <div>Preferred Languages: {formData.languages.join(', ')}</div> */}
              Address:
              <div className="break-words">
                <p>Your Address here</p>
              </div>
            </div>
            <div className="flex items-center text-gray-500 mb-4">
              <FontAwesomeIcon icon={faSmoking} className="mr-2" />
              <div className='flex gap-1'>Smoking Allowed: <p className='text-gray-600'>No</p></div>
            </div>
            <div className="flex items-center text-gray-500 mb-4">
              <FontAwesomeIcon icon={faBed} className="mr-2" />
              <div className='flex gap-1'>Room Number: <p className='text-gray-600'>5</p></div>
            </div>
          </div>
          <div className="w-full sm:w-1/2 flex flex-col">
            <div className="flex items-center text-gray-500 mb-4">
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              <div className='flex gap-1'>Phone Number: <p className='text-gray-600'>++989362478663</p></div>
            </div>
            <div className="items-center text-gray-500 mb-4">
              <FontAwesomeIcon icon={faTags} className="mr-2" />
              Interests:
              <div>
                  <div className="flex flex-wrap ml-2">
                    {Intrests.map((Intrests, index) => {
                      return <Chips key={index} text = {Intrests}/>
                    })}
                  </div>
              </div>
            </div>
            <div className="flex items-center text-gray-500 mb-4">
              <FontAwesomeIcon icon={faDog} className="mr-2" />
              <div className='flex gap-1'>Pet Friendly: <p className='text-gray-600'>Yes</p></div>
            </div>
            <div className="flex items-center text-gray-500 mb-4">
              <FontAwesomeIcon icon={faChild} className="mr-2" />
              <div className='flex gap-1'>Kids Friendly: <p className='text-gray-600'>No</p></div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col space-y-10 p-6 w-5/6 mx-auto bg-white rounded-xl shadow-md justify-content items-center'>
          <div className='text-xl font-bold'>Bio</div>
          <p>{formData.Bio == null || formData.Bio.length <= 1 ? "Please Write a Biography in the Edit section!" : formData.Bio}</p>
      </div>
    </div>
  );
};

export default InfoSec;
