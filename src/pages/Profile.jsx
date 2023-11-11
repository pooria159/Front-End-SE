import React, { useState, useEffect, useRef } from 'react';
import defaultProfilePic from "../assets/defaultUserPic.png";
import { useProfile } from '../hooks/useProfile';

// Sections:
import InfoSec from '../components/Profile/InfoSec';


const sections = ['Info', 'Edit', 'Change Pass', 'Offers', 'Blog'];

const ProfilePage = () => {


  const [formData, setFormData] = useState(null);

  useEffect(() => {
      const fetch = async () => {
          const response = await useProfile();
          setFormData(response.data);
          console.log(response.data);
      }
      fetch();
  }, []);

  const [activeSection, setActiveSection] = useState(sections[0]);
  const [image, setImage] = useState(null);

  const fileInputRef = useRef();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);

    // Clear the file input value
    event.target.value = null;
  };

  const handleRemoveImage = () => {
    setImage(null);
  }

  const handleSubmitImage = () => {

  }

  const openExplorer = () => {
    fileInputRef.current.click();
  }

  return (
    <div className="grid grid-cols-8 gap-4 p-10">
      <div className="col-span-2 bg-gray-100 p-10 rounded-2xl flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold mb-4">Mike Wasowski</h2>
        <input ref={fileInputRef} id="imageUpload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        <label onClick={openExplorer} className="cursor-pointer flex flex-col justify-center items-center relative">
            <img className="h-52 w-52 border-solid border-8 rounded-full mb-4" src={image ? image : defaultProfilePic} alt="Profile" />
        </label>
        
        <div className='flex space-x-1 mb-1'>
            <button className='w-24 p-1 rounded-md md:text-md text-red-500 border-double border-2 border-red-500 hover:text-red-300 hover:border-red-300' onClick={handleRemoveImage}>Remove</button>
            <button className='w-24 p-1 rounded-md text-indigo-500 border-double border-2 border-indigo-500 hover:text-indigo-300 hover:border-indigo-300' onClick={openExplorer}>Change</button>
        </div>

        <div className='mb-4'>
          <button className='w-48 p-1 rounded-md text-indigo-500 border-double border-2 border-indigo-500 hover:text-indigo-300 hover:border-indigo-300' onClick={handleSubmitImage}>Submit</button>
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

      </div>

      <div className="col-span-6 bg-gray-100  p-4 flex flex-col  items-center rounded-2xl">
        <h2 className="text-xl font-bold mb-4">{activeSection}</h2>
        {activeSection === 'Info' && <InfoSec formData = {formData}/>}
      </div>

    </div>
  );
};

export default ProfilePage;
