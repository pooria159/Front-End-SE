import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import defaultProfilePic from "../assets/defaultUserPic.png";
import { usePrivateProfile } from '../hooks/usePrivateProfile';
import ANCModal from '../components/Profile/ANCModal';
import { useParams } from "react-router-dom";


// Sections:
import InfoSec from '../components/Profile/InfoSec';
import EditSec from '../components/Profile/EditSec';
import ChangePassSec from '../components/Profile/ChangePassSec';
import MyAnncSec from '../components/Profile/MyAnnouncementsSec';

const sections = ['Info', 'Blog'];

const skeleton = () => {
  return(
    <div role="status" class="max-w-sm animate-pulse">
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <span class="sr-only">Loading...</span>
    </div>
  )
}




const PrivateProfile = () => {

    let { username } = useParams();
    const [formData, setFormData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [isModalOpen, setISModalOpen] = useState(false);

    const [activeSection, setActiveSection] = useState(sections[0]);
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const fileInputRef = useRef();

  useEffect(() => {
      const fetch = async () => {
        try{
          const response = await usePrivateProfile(username);
          setFormData(response.data);
          setPreviewImage(response.data.image)
          setIsLoading(false);
          console.log(response.data);
        }catch(error){
            toast.error(error.response.data.message);
            throw error;
        }
      }
      fetch();
  }, []);








  const openExplorer = () => {
    fileInputRef.current.click();
  }



  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = defaultProfilePic;
  }

  return (
    <div className='w-full h-full'>
      <ANCModal isVisible={isModalOpen} onClose={() => {setISModalOpen(false)}}/>
      
      <div className="grid grid-cols-8 gap-4 p-10">
        <div className="col-span-2 bg-gray-100 p-10 rounded-2xl flex flex-col justify-center items-center">
          { isLoading ? (skeleton()) :
          <div className='w-full h-full flex flex-col justify-center items-center'>
            <h2 className="text-xl font-bold mb-4">{formData.FirstName} {formData.LastName}</h2>
            <label onClick={openExplorer} className="cursor-pointer flex flex-col justify-center items-center relative">
                <img className="h-52 w-52 border-solid border-8 rounded-full mb-4" src={previewImage!=null && previewImage!="" ? previewImage : defaultProfilePic} onError={handleError} alt="Profile" />
            </label>
            
            

          

            <div className='w-full h-full mt-14'>
            {sections.map(section => (
              <button
                key={section}
                className={`flex border-solid border-[1px] border-indigo-500 justify-center items-center block w-full text-left mb-2 p-2 rounded-lg ${section === activeSection ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                onClick={() => setActiveSection(section)}
              >
                {section}
              </button>
            ))}
            </div>


          </div>
          }

        </div>

        <div className="col-span-6 bg-gray-100  p-4 flex flex-col  items-center rounded-2xl">
          <h2 className="text-xl font-bold mb-4">{activeSection}</h2>
          {activeSection === 'Info' && <InfoSec formData = {formData}/>}
        </div>

      </div>
    </div>
  );
};

export default PrivateProfile;
