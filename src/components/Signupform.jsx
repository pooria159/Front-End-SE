import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCityCountry } from '../hooks/useCityCountry';
import Select from 'react-select';


const Validate = (formData) => {

  const passConfirm = () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!", {
        position: toast.POSITION.TOP_LEFT
      });
      return false;
    }
    return true;
  }

  const validateusername = () => {
    const usernameRegex = /^[a-zA-Z0-9_]{5,30}$/ ;
    if (usernameRegex.test(formData.username)) {
      return true;
    }
    toast.error("username is not valid!", {
      position: toast.POSITION.TOP_LEFT
    });
    return false;
  }

  const validatefirstname = () => {
    const firstnameRegex = /^[A-Za-z]{1,30}$/;
    if (firstnameRegex.test(formData.firstname)){
      return true;
    }
    toast.error("Your first name is not valid!", {
      position: toast.POSITION.TOP_LEFT
    });
    return false;
  }
  
  const validatelastname = () => {
    const lastnameRegex = /^[A-Za-z]{1,50}$/;
    if (lastnameRegex.test(formData.lastname)){
      return true;
    }
    toast.error("Your last name is not valid!", {
      position: toast.POSITION.TOP_LEFT
    });
    return false;
  }

  if (passConfirm() && validateusername() && validatefirstname() && validatelastname()){
    return true;
  }

  return false;
}

// Function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const SignupForm =  () => {


    const [formData, setFormData] = useState({
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      country: '',
      state: '',
      birthdate: '',
      gender: 0
    });

    const [isLoading, setIsLoading] = useState(false);
    const [countries, setCountries] = useState(null);
    const [states, setStates] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    
    useEffect(() => {
      const fetch = async () => {
        const response = await useCityCountry("country");
        setCountries(response)
      }
      fetch();
    }, []);

    useEffect(() => {
      setSelectedState("")
      const fetch = async () => {
        console.log(selectedCountry);
        const response = await useCityCountry("state", selectedCountry.value);
        setStates(response)
      }
      fetch();
    }, [selectedCountry]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      // If the input is a date input, format the value
      const formattedValue = e.target.type === 'date' ? formatDate(value) : value;
      setFormData({ ...formData, [name]: formattedValue });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Add form submission logic here
      if (Validate(formData)){
        console.log(formData)
      }
      return;
    };

    return(
        <div className="mt-5 h-[22.5rem] sm:mx-auto sm:w-full sm:max-w-sm">
        <ToastContainer/>
        <h2 className="mb-5  text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
        </h2>
        <form className="space-y-2" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="firstname">
                First Name
            </label>
            <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                id="firstname" 
                type="text" 
                name="firstname"
                placeholder="Jane"
                autoComplete="on"
                value={formData.firstname}
                onChange={handleChange}
                required
            />
            </div>
            <div className="w-full md:w-1/2 px-3">
            <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="lastname">
                Last Name
            </label>
            <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="lastname" 
                name="lastname"
                type="text"
                placeholder="Doe"
                autoComplete="on"
                value={formData.lastname}
                onChange={handleChange}
                required
             />
            </div>
        </div>

        <div className="flex flex-wrap  -mx-3 mb-6">
          {/* Calender */}
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="dob">
              Date of Birth
            </label>
            <input 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              type="date" 
              id="birthdate" 
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full md:w-1/2 px-3">
              <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="gender">
                  Gender
              </label>
              <select 
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                  id="gender" 
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
              >
                  <option value="">Select Gender</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                  <option value="3">Other</option>
              </select>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="country">
              Country
            </label>
            <Select
              id="country"
              name="country"
              options= {countries && countries.map(country => ({
                value: country.country_name,
                label: country.country_name,
              }))}
              value={selectedCountry}
              onChange={(selectedCountry) => {
                setSelectedCountry(selectedCountry)
                setFormData({ ...formData, ["country"]:  selectedCountry.value});
              }}
              isSearchable
              placeholder="Select a country"
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="city">
              State
            </label>
            <Select
              id="state"
              name="state"
              options= {states && states.map(state => ({
                value: state.state_name,
                label: state.state_name,
              }))}
              value={selectedState}
              onChange={(selectedState) => {
                setSelectedState(selectedState)
                setFormData({ ...formData, ["state"]:  selectedState.value});
              }}
              isSearchable
              isDisabled = {selectedCountry == ""}
              placeholder="Select an state"
              required
            />
          </div>
        </div>
        
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email Address
            </label>
            <div className="">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="on"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              username
            </label>
            <div className="">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="on"
                required
                value={formData.username}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        
        <div className="flex flex-wrap -mx-3 mb-6">

            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                </label>
                </div>
                <div className="">
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="off"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                </div>
            </div>

            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm Password
                </label>
                </div>
                <div className="">
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="off"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                </div>
            </div>

          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create Account
            </button>
          </div>
        </form>

        <p className="mt-2 mb-5 text-center text-sm text-gray-500">
          Already a member?{' '}
          <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Login
          </a>
        </p>
      </div>
    );
}

export default SignupForm;