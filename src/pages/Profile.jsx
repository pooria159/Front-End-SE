import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import defaultProfilePic from "../assets/defaultUserPic.png";
import { useProfile } from '../hooks/useProfile';

import ANCModal from '../components/Profile/ANCModal';



// Sections:
import InfoSec from '../components/Profile/InfoSec';
import EditSec from '../components/Profile/EditSec';
import ChangePassSec from '../components/Profile/ChangePassSec';
import MyAnncSec from '../components/Profile/MyAnnouncementsSec';

import useProfileImage from '../hooks/useProfileImage';

const sections = ['Info', 'Edit', 'Change Pass', 'My Announcements', 'Blog'];

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

const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
          resolve(fileReader.result);
      };

      fileReader.onerror = (err) => {
          reject(err);
      };
  });
};


const ProfilePage = () => {


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
          const response = await useProfile();
          setFormData(response.data);
          setPreviewImage(response.data.image)
          setIsLoading(false);
          console.log(response.data);
        }catch(error){
          toast.error(error);
          throw error;
        }
      }
      fetch();
  }, []);



  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file); // Store the file object
  
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result); // Store the data URL for previewing the image
    };
    reader.readAsDataURL(file);
  
    event.target.value = null; // Clear the file input value
  };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     const size_mb = file.size / 1024 ** 2;
//     const size_kb = size_mb * 1000;
//     if (size_kb <= 500) {
//         const base64Image = await convertFileToBase64(file);
//         setPreviewImage(base64Image ? base64Image : "");
//     } else {
//         toast.warning("Image size can not be more than 500kb.");
//     }
//     e.target.value = null; // Clear the file input value
// }

  const handleRemoveImage = () => {
    setImage("");
    setPreviewImage("");
  }

  const handleSubmitImage = () => {
    const postImage = async () => {
      // console.log(previewImage)
      const formData = new FormData();
      formData.append('image', image);
      if(previewImage){
        try{
          const response = await useProfileImage(formData)
          if (response.status >= 200 && response.status < 300) {
            toast.success("Profile picture changed successfully!");
          } else{
            toast.error("Something went wrong!");
          }
        }catch(error){
          
          throw error;
        }
        
      }else{
        toast.error("Please set an image");
      }
    }
    postImage();
  }

  const openExplorer = () => {
    fileInputRef.current.click();
  }

  // Callback function to update formData
  const updateFormData = (newFormData) => {
    setFormData(newFormData);
  };

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
            <input ref={fileInputRef} id="imageUpload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            <label onClick={openExplorer} className="cursor-pointer flex flex-col justify-center items-center relative">
                <img className="h-52 w-52 border-solid border-8 rounded-full mb-4" src={previewImage!=null && previewImage!="" ? previewImage : defaultProfilePic} onError={handleError} alt="Profile" />
            </label>
            
            <div className='flex flex-col justify-center items-center w-full space-x-1 mb-1'>
                <div className='flex w-full justify-center items-center gap-1'>
                  <button className='w-2/6 p-1 rounded-md md:text-md text-red-500 border-double border-2 border-red-500 hover:text-red-300 hover:border-red-300' onClick={handleRemoveImage}>Remove</button>
                  <button className='w-2/6 p-1 rounded-md text-indigo-500 border-double border-2 border-indigo-500 hover:text-indigo-300 hover:border-indigo-300' onClick={openExplorer}>Change</button>
                </div>
            </div>

            <div className='mb-4 w-full flex flex-col items-center'>
              <button className='w-4/6 p-1 rounded-md text-indigo-500 border-double border-2 border-indigo-500 hover:text-indigo-300 hover:border-indigo-300' onClick={handleSubmitImage}>Submit</button>
            </div>

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

            <div className='w-full mt-16'>
            <button
              className="flex border-solid border-[1px] bg-white border-red-500 justify-center items-center block w-full text-left mb-2 p-2 rounded-lg "
              onClick={() => {setISModalOpen(true)}}
              >
                New Announcement
              </button>
            
            </div>

          </div>
          }

        </div>

        <div className="col-span-6 bg-gray-100  p-4 flex flex-col  items-center rounded-2xl">
          <h2 className="text-xl font-bold mb-4">{activeSection}</h2>
          {activeSection === 'Info' && <InfoSec formData = {formData}/>}
          {activeSection === 'Edit' && <EditSec formData = {formData} updateFormData={updateFormData}/>}
          {activeSection === 'Change Pass' && <ChangePassSec/> }
          {activeSection === 'My Announcements' && <MyAnncSec/> }
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
