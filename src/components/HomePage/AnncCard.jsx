import {React, useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faFlag, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import defaultProfilePic from "../../assets/defaultUserPic.png";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import useCreateOffer from '../../hooks/useCreateOffer';

import bakimg from "../../assets/baktash.jpg";

// MUI
import { Avatar } from '@mui/material';

const Chips = ({text}) => {
  return(
    <div class="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-blue-700 bg-blue-100 border border-blue-300 ">
        <div class="text-s font-normal leading-none max-w-full flex-initial">{text}</div>
    </div>
  );
}


const Card = ({data}) => {

  const fetch = async () => {
    try{
      const response = await useCreateOffer(data.CardId);
      if (response.status >= 200 && response.status < 300) {
        toast.success("Your offer has submited successfully!")
      }
    }catch(error){
      toast.error(error.response.data.message);
      throw(error);
    }
  }

  const handleSubmitOffer = () => {
    fetch();
  }

  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = defaultProfilePic;
  }

  return (
    <div className="max-w-md border border-gray-300 h-1/2 w-1/2 mx-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-[30rem] m-2">
      <div className="md:flex h-full">
        <div className="xl:block 2xl:block  md:flex-shrink-0 overflow-hidden">
          <Link to={`/public/${data.UserUsername}`} >
            
            {/* <img className="h-full w-full md:w-48 transform transition duration-500 hover:scale-110" src={data.Image} onError={handleError} alt="An image"/> */}
            <div className='w-full h-full'>
              <Avatar
                src={data.Image}
                onError={handleError}
                alt={data.UserUsername}
                sx={{
                  width: '15rem', 
                  height: '26rem', 
                  md: { width: '12rem' },
                  borderRadius: 0,
                  transform: 'scale(1)',
                  transition: 'transform 500ms',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              />
            </div>
            

          </Link>
        </div>
        
          <div className="p-5">
            <Link to={`/public/${data.UserUsername}`} > 
              <div className="uppercase tracking-wide text-md text-indigo-500 font-semibold">{data.UserUsername && data.UserUsername}</div>
              <div className='uppercase  text-sm text-indigo-500 font-semibold'>{data.NumberOfTravelers} Travelers</div>
              <ul className="mt-3 text-gray-600 space-y-1">
                <li className='text-sm '><FontAwesomeIcon icon={faGlobe} /> Languages:</li>
                <div className='flex text-sm '>
                  {data.PreferredLanguages.map((item, index) => (
                    <Chips key={index} text={item} />
                  ))}
                </div>
                                                                                          
                                                                                        
                <li className='text-sm border-t'><FontAwesomeIcon icon={faFlag} /> State: {data.DestinationState}</li>
                <li className='text-sm border-t'><FontAwesomeIcon icon={faFlag} /> City: {data.DestinationCity}</li>
                <li className='text-sm border-t'><FontAwesomeIcon icon={faGlobe} /> Country: {data.DestinationCountry}</li>
                <li className='text-sm border-t'><FontAwesomeIcon icon={faCalendarAlt} /> Start Date: {data.StartDate}</li>
                <li className='text-sm'><FontAwesomeIcon icon={faCalendarAlt} /> End Date: {data.EndDate}</li>
              </ul>
              <p className="h-[3rem] mt-2 text-gray-500 text-sm border-t">{data.Description && data.Description.substring(0, 90) + (data.Description.length > 90 ? "..." : "")}</p>
            </Link>
            <button className="mt-4 bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-[0.75rem] px-3 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" type="button" style={{ transition: "all .15s ease" }} onClick={handleSubmitOffer}>Make an Offer</button>
          </div>
        
      </div>
    </div>
  );
};



export default Card;
