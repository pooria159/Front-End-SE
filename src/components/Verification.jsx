import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useVerification } from '../hooks/useVerification';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Verification = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const navigate = useNavigate();
  console.log("given token1:")
  console.log(token);

const verify = async (e) => {
  e.preventDefault();
  try {
    const response = await useVerification(token);
    if (response.status >= 200 && response.status < 300) {
      // Successful response (status code 2xx)
      // Redirect to /login
      navigate('/login'); // Navigate to /login
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

};
  return (
    <div className="w-full mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
      <ToastContainer/>
      <form className="space-y-2"  >
        <h2 className="mb-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Your email was verified successfully.
        </h2>
        <div>
          <button
            type="button"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={verify}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Verification;