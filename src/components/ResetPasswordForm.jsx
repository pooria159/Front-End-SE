import React, { useState } from 'react';
import { useResetPassword } from "../hooks/useResetPassword";
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const navigate = useNavigate();
  // console.log("given token1:")
  // console.log(token);

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const passConfirm = (e) => {

    if ((formData.password !== formData.confirmPassword)) {
      toast.error("Passwords do not match!", {
        position: toast.POSITION.TOP_LEFT
      });
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!passConfirm(e)) { 
      return; 
    }
    try {
      const response = await useResetPassword(token,formData.password);
      if (response.data["message"]=="Password updated successfully") {
        toast.success('your password successfully changed .', {
          autoClose: 1000, // Close the toast after 3 seconds
          position: toast.POSITION.TOP_LEFT,
        });

        setTimeout(() => {
          navigate('/login'); // Navigate to /login after displaying the toast
        }, 1000);
        // navigate('/login'); // Navigate to /login


      } else{
        console.log(response.data["message"])
          toast.error(response.data["message"], {
              position: toast.POSITION.TOP_LEFT,
          });
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_LEFT,
      });
      throw error;
    }
   
   return;
  };

    return(
        <div className="mt-10 h-[22.5rem] sm:mx-auto sm:w-full sm:max-w-sm">
          <ToastContainer/>
        <h2 className="mb-5  text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset Password
        </h2>
        <form className="space-y-6 mt-10" action="#" method="POST" onSubmit={handleSubmit}>
            <div class="w-full px-3 mb-6 md:mb-0">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    New Password
                </label>
                
                <div className="">
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="on"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                </div>
            </div>
              <div className="w-full px-3 mb-6 md:mb-0">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm New Password
                </label>
                
                <div className="">
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="off"
                    value={formData.confirmPassword}
                    onChange={handleChange}
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
              Reset Password
            </button>
          </div>
          <p className="mt-5 mb-5 text-center text-sm text-gray-500">

          Did you change your mind?              

        <a href="/login" className="font-semibold text-indigo-600 text-center hover:text-indigo-500">
                  back to login
                </a> 
        </p>
        </form>
      </div>
    );
}

export default ResetPassword;