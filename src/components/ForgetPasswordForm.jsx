import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {useForgetPassword } from '../hooks/useForgetPassword';

const ForgetPassword = () => {
  const [credentials, setCredentials] = useState({
    email: ''
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add form submission logic here
    try{

      const response = await useForgetPassword(credentials);
      console.log(response.status);
      if (response.status >= 200 && response.status < 300) {
        // Successful response (status code 2xx)
        
        toast.success('check your email for reset password link.', {
          autoClose: 1000, // Close the toast after 3 seconds
          position: toast.POSITION.TOP_LEFT,
        });

      } else{
        toast.error(response.data["message"], {
            position: toast.POSITION.TOP_LEFT,
        });
    }
      
    }  catch(error){
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_LEFT,
      });
      throw error;
    }
  };

    return(
        <div className="mt-10 h-[22.5rem] sm:mx-auto sm:w-full sm:max-w-sm">
          <ToastContainer/>
        <h2 className="mb-5  text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Forgot your password?
        </h2>
        <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
        <div class="flex flex-wrap -mx-3 mb-6">
        </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email Address
            </label>
            <div >
              <input
                id="email"
                name="email"
                type="email"
                value={credentials.email}
                onChange={handleChange}
                autoComplete="on"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        <div className="flex items-center justify-center">
            <button
              type="submit"
              className="flex w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get link
            </button>
          </div>
          <p className="mt-5 mb-5 text-center text-sm text-gray-500">
          Enter your account email to take reset password link
        </p>
        </form>
      </div>
    );
}

export default ForgetPassword;