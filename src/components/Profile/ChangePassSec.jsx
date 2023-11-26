import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';

import useEditProfile from "../../hooks/useEditProfile";


const ChangePassSec = () => {

    const [credentials, setCredentials] = useState({
        currentpassword: '',
        newpassword: '',
        confirmnewpassword: ''
    });

    const [showCPassword, setShowCPassword] = useState(false);
    const [showNPassword, setShowNPassword] = useState(false);
    const [showCNPassword, setShowCNPassword] = useState(false);

    const handleShowCPassword = (e) => {
        setShowCPassword(!showCPassword);
    }
    const handleShowNPassword = (e) => {
        setShowNPassword(!showNPassword);
    }
    const handleShowCNPassword = (e) => {
        setShowCNPassword(!showCNPassword);
    }

    const handleChange = (e) => {
        setCredentials({
          ...credentials,
          [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let form_password = {};
        if ((credentials.newpassword == credentials.confirmnewpassword)){
            form_password = { currentpassword: credentials.currentpassword,newpassword: credentials.newpassword};
            try{
                const response = await useEditProfile(form_password);
                console.log(response.status);
                if (response.status >= 200 && response.status < 300) {
                  toast.success("Password changed successfully!");
                  
                } else{
                    toast.error("password is not correct!");
                }
            }catch(error){
                toast.error(error.response.data.message);
                throw error;
            }
        } else{
            toast.error("Password doesn't match!");
        }
        
    }

    

    return (
        <form className='flex flex-col  items-center space-y-5 w-full h-full' onSubmit={handleSubmit}>
            <div className="p-6 w-5/6 mx-auto bg-white rounded-xl shadow-md flex flex-col items-center justify-center">
                <div className="flex flex-col w-1/2 items-center justify-center text-gray-500 mb-4">
                    <div className="text-gray-700">Current Password </div> 

                    <div className='relative w-full'>
                        <input 
                            type={showCPassword ? 'text' : 'password'} 
                            required 
                            className='rounded-xl w-full text-gray-700'
                            value={credentials.currentpassword}
                            onChange={handleChange}
                            id="currentpassword"
                            name="currentpassword"
                        />
                        <div className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'>
                            {showCPassword ? (
                            <svg onClick={handleShowCPassword} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                            ) : (
                            <svg onClick={handleShowCPassword} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            )}
                        </div>
                    </div>

                </div>
                <div className="flex flex-col w-1/2 items-center justify-center text-gray-500 mb-4">
                    <div className="text-gray-700">New Password </div> 
                    <div className='relative w-full'>
                        <input 
                            type={showNPassword ? 'text' : 'password'} 
                            required 
                            className='rounded-xl w-full text-gray-700' 
                            value={credentials.newpassword}
                            onChange={handleChange}
                            id="newpassword"
                            name="newpassword"
                        />
                        <div className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'>
                            {showNPassword ? (
                            <svg onClick={handleShowNPassword} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                            ) : (
                            <svg onClick={handleShowNPassword} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            )}
                        </div>
                    </div>
                    
                </div>
                <div className="flex flex-col w-1/2 items-center justify-center text-gray-500 mb-4">
                    <div className="text-gray-700">Confirm New Password </div>
                    <div className='relative w-full'> 
                        <input 
                            type={showCNPassword ? 'text' : 'password'} 
                            required className='rounded-xl w-full text-gray-700' 
                            value={credentials.confirmnewpassword}
                            onChange={handleChange}
                            id="confirmnewpassword"
                            name="confirmnewpassword"
                        />
                        <div className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'>
                            {showCNPassword ? (
                            <svg onClick={handleShowCNPassword} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                            ) : (
                            <svg onClick={handleShowCNPassword} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            )}
                        </div>
                    </div>
                    
                </div>

            <button type="submit" className='w-1/4 mt-5 p-1 rounded-md text-indigo-500 border-double border-2 border-indigo-500 hover:text-indigo-300 hover:border-indigo-300'>Submit</button>
            </div>

        </form>
    );

};


export default ChangePassSec;
