import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
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

      const response = await useLogin(credentials);
      console.log(response.status);
      if (response.status >= 200 && response.status < 300) {
        // Successful response (status code 2xx)
        // Redirect to /login
        const { AccessToken, RefreshToken, Message } = response.data;
        localStorage.setItem('token', AccessToken);
        localStorage.setItem('refreshToken', RefreshToken);
        localStorage.setItem('islogin', "True");
        toast.success('Welcome!', {
          autoClose: 2000, // Close the toast after 3 seconds
          position: toast.POSITION.TOP_LEFT,
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
        
      } else{
          toast.error("Email or password are not correct!", {
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
        <h2 className="mb-5 mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="on"
                value={credentials.email}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="on"
                required
                value={credentials.password}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="mt-1 text-sm">
                <a href="/forget-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-5 mb-5 text-center text-sm text-gray-500">
          Not a member?{' '}
          <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Signup
          </a>
        </p>
      </div>
    );
}

export default LoginForm;