import Select from 'react-select';

import React,{useRef, useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faVenusMars, faLanguage, faInfoCircle, faTags, faCoins, faCalendar, faPhone, faEnvelope, faCity, faFlag, faEarth } from '@fortawesome/free-solid-svg-icons';
import { useCityCountry } from '../../hooks/useCityCountry';
import useEditProfile from '../../hooks/useEditProfile';
import { toast } from 'react-toastify';
import { useProfile } from '../../hooks/useProfile';

const Genders = [" ", "Man" , "Woman", "Other"]
const Intrests = ['Coding', 'Traveling', 'Photography', 'Reading']


// Add more refs as needed

const fetchCityCountry = async (type, relevent = "") => {
    let obj = [];
    if(type == "country"){
        const response = await useCityCountry("country"); 
        for (var item in response){
            obj.push({"value" : response[item]["country_name"], "label" : response[item]["country_name"]});
        }
    }
    else if(type == "state"){
        const response = await useCityCountry("state", relevent); 
        for (var item in response){
            obj.push({"value" : response[item]["state_name"], "label" : response[item]["state_name"]});
        }
    }
    else if(type == "city"){
        const response = await useCityCountry("city", relevent); 
        for (var item in response){
            obj.push({"value" : response[item]["city_name"], "label" : response[item]["city_name"]});
        }
    }
    return obj;
}


const EditSec = ({ formData, updateFormData }) => {

    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    
    const [selectedCountry, setSelectedCountry] = useState({"value" : formData.Country, "label" : formData.Country});
    const [selectedState, setSelectedState] = useState({"value" : formData.State, "label" : formData.State});
    const [selectedCity, setSelectedCity] = useState({"value" : formData.City, "label" : formData.City});

    const bioRef = useRef(null);

    const [countryOptions, setCountryOptions] = useState([]);
    const [stateOptions, setStateOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);

    const customStyles = {
        control: (base, state) => ({
          ...base,
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          borderColor: '#9095a0',
          paddingLeft: '0.25rem',
          color: '#4a5568',
          width: '10rem',
          marginLeft: '0.25rem',
        }),
      };

    useEffect(() => {
        fetchCityCountry('country').then(setCountryOptions);
        fetchCityCountry('state', formData.Country).then(setStateOptions);
        fetchCityCountry('city', formData.State).then(setCityOptions);
    }, [formData.Country, formData.State]);

    useEffect(() => {
        fetchCityCountry('state', selectedCountry.value).then(setStateOptions);
        // setSelectedState(" ")
    }, [selectedCountry]);

    useEffect(() => {
        fetchCityCountry('city', selectedState.value).then(setCityOptions);
        // setSelectedCity(" ")
    }, [selectedState]);



    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption);
    };
    const handleStateChange = (selectedOption) => {
        setSelectedState(selectedOption);
    };
    const handleCityChange = (selectedOption) => {
        setSelectedCity(selectedOption);
    };

    const fetch = async () => {
        const response = await useProfile();
        return response;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        
        const changes = {};
    
        if (usernameRef.current.value !== formData.UserName) {
            changes.UserName = usernameRef.current.value;
        }
    
        if (bioRef.current.value !== formData.Bio) {
            changes.Bio = bioRef.current.value;
        }
        if (selectedCountry !== null && selectedCountry.value != formData.Country) {
            changes.Country = selectedCountry.value;
        }
        if (selectedState !== null && selectedState.value != formData.State) {
            changes.State = selectedState.value;
        }
        if (selectedCity !== null && selectedCity.value != formData.City) {
            changes.City = selectedCity.value;
        }
    
        // Add similar checks for the rest of the data
    
        console.log(changes);
        try{
            await useEditProfile(changes);
            const newFromData = await fetch();
            updateFormData(newFromData.data);
        } catch(error){
            throw error;
        }
        toast.success("Your information has been changed successfully!")
        
    };
    
      

    return(
        formData && 
        <form className='flex flex-col  items-center space-y-5 w-full h-full' onSubmit={handleSubmit}>
            <div className="p-6 w-5/6 mx-auto bg-white rounded-xl shadow-md flex flex-wrap">
                <div className="w-full sm:w-1/2 flex flex-col">
                    <div className="flex items-center text-gray-500 mb-4">
                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                        <div className=''>
                        Username: 
                        <input type='text' className='rounded-xl w-1/2 ml-1 text-gray-700' defaultValue={formData.UserName} ref={usernameRef && usernameRef} />
                        </div>
                    </div>
                    <div className="flex items-center text-gray-500 mb-4">
                        <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                        <div className=''>
                        Email: 
                        <input type='text' className='rounded-xl ml-1 w-5/6 text-gray-700' defaultValue={formData.Email} />
                        </div>
                    </div>
                    <div className="flex items-center text-gray-500 mb-4">
                        <FontAwesomeIcon icon={faPhone} className="mr-2" />
                        <div className=''>
                        Phone Number: 
                        <input type='text' className='rounded-xl w-1/2 ml-1 text-gray-700' defaultValue={"++989372531777"} />
                        </div>
                    </div>
                {/* Add similar input fields for the rest of the data */}
                </div>
                <div className="w-full sm:w-1/2 flex flex-col">
                    <div className="flex w-full items-center text-gray-500 mb-4">
                        <FontAwesomeIcon icon={faEarth} className="mr-2" />
                        <div className='mr-2'>
                        Country: 
                        </div>
                        <Select 
                            styles={customStyles}
                            options={countryOptions} 
                            value={selectedCountry}
                            onChange={(selectedOption) => handleCountryChange(selectedOption)}
                        />
                    </div>
                    <div className="flex items-center text-gray-500 mb-4">
                        <FontAwesomeIcon icon={faFlag} className="mr-2" />
                        <div className=''>
                        State: 
                        </div>
                        <Select 
                            styles={customStyles}
                            options={stateOptions}
                            value={selectedState} 
                            isDisabled = {!selectedCountry}
                            onChange={(selectedOption) => handleStateChange(selectedOption)}
                        />
                    </div>
                    <div className="flex items-center text-gray-500 mb-4">
                        <FontAwesomeIcon icon={faCity} className="mr-2" />
                        <div className=''>
                        City: 
                        </div>
                        <Select 
                            styles={customStyles}
                            options={cityOptions}
                            value={selectedCity} 
                            isDisabled = {!selectedState}
                            onChange={(selectedOption) => handleCityChange(selectedOption)}
                        />
                    </div>
                {/* Add similar input fields for the rest of the data */}
                </div>
                {/* Add a second column of input fields if needed */}
            </div>
            <div className='flex flex-col space-y-8 p-6 w-5/6 mx-auto bg-white rounded-xl shadow-md justify-content items-center'>
                <div className='text-xl font-bold'>Bio</div>
                <textarea className='w-full rounded-xl' defaultValue={formData.Bio} ref={bioRef && bioRef} />
            </div>
            <button className='w-48 p-1 rounded-md text-indigo-500 border-double border-2 border-indigo-500 hover:text-indigo-300 hover:border-indigo-300' onClick={handleSubmit}>Submit</button>
        </form>

    );
}

export default EditSec;