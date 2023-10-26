import React, { useState, useEffect } from "react";
import ReactLanguageSelect from "react-languages-select";
import "react-languages-select/css/react-languages-select.css";
import { toast } from "react-toastify";
import { useCityCountry } from "../hooks/useCityCountry";
import Select from "react-select";
import { useNavigate } from "react-router-dom";


// Function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const CreateCardForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    description: "",
    language1: "",
    language2: "",
    startDate: "",
    endDate: "",
    country: "",
    city: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState(null);
  const [states, setStates] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedLanguage1, setselectedLanguage1] = useState("en");
  const [selectedLanguage2, setselectedLanguage2] = useState("en");

  useEffect(() => {
    const fetch = async () => {
      const response = await useCityCountry("country");
      setCountries(response);
    };
    fetch();
  }, []);

  useEffect(() => {
    setSelectedState("");
    const fetch = async () => {
      console.log(selectedCountry);
      const response = await useCityCountry("state", selectedCountry.value);
      setStates(response);
    };
    fetch();
  }, [selectedCountry]);

  //     const handleSignup = async (updatedFormData) => {
  //       try{
  //         const response = await Usesignup(updatedFormData);
  //         if (response.status >= 200 && response.status < 300) {
  //           // Successful response (status code 2xx)
  //           // Redirect to /login
  //           toast.success('Signup successful!', {
  //               autoClose: 1000, // Close the toast after 3 seconds
  //               position: toast.POSITION.TOP_LEFT,
  //           });
  //           setTimeout(() => {
  //             navigate('/checkmail'); // Navigate to /login
  //           }, 1500);

  //         } else{
  //             toast.error(response.data["message"], {
  //                 position: toast.POSITION.TOP_LEFT,
  //             });
  //         }
  //       } catch(error){
  //         toast.error(error.response.data.message, {
  //           position: toast.POSITION.TOP_LEFT,
  //         });
  //         throw error;
  //       }
  //     }

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the input is a date input, format the value
    let formattedValue = e.target.type === "date" ? formatDate(value) : value;
    setFormData({ ...formData, [name]: formattedValue });
  };

      const handleSubmit = async (e) => {
        e.preventDefault();
        // Add form submission logic here
        if (Validate(formData)){
          const updatedFormData = { ...formData };
          delete updatedFormData.confirmPassword;
          handleSignup(updatedFormData);
        }
        return;
      };

  // Event handler for language selection
  const onSelectLanguage1 = (languageCode) => {
    setselectedLanguage1(languageCode);
    console.log("Selected language code:", languageCode);
  };
  const onSelectLanguage2 = (languageCode) => {
    setselectedLanguage2(languageCode);
    console.log("Selected language code:", languageCode);
  };
  // const customOnSelect = (languageCode) => {
  //   onSelectLanguage(languageCode); // Call your custom handler
  // };

  return (
    <div className="mt-5 h-[22.5rem] sm:mx-auto sm:w-full sm:max-w-sm">

      <h2 className="mb-5  text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Create your jurney announcement
      </h2>  
      <form className="space-y-2" onSubmit={handleSubmit}>
      <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="country"
            >
              Country
            </label>
            <Select
              id="country"
              name="country"
              options={
                countries &&
                countries.map((country) => ({
                  value: country.country_name,
                  label: country.country_name,
                }))
              }
              value={selectedCountry}
              onChange={(selectedCountry) => {
                setSelectedCountry(selectedCountry);
                setFormData({
                  ...formData,
                  ["country"]: selectedCountry.value,
                });
              }}
              isSearchable
              placeholder="Select a country"
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="city"
            >
              State
            </label>
            <Select
              id="city"
              name="city"
              options={
                states &&
                states.map((state) => ({
                  value: state.state_name,
                  label: state.state_name,
                }))
              }
              value={selectedState}
              onChange={(selectedState) => {
                setSelectedState(selectedState);
                setFormData({ ...formData, ["city"]: selectedState.value });
              }}
              isSearchable
              isDisabled={selectedCountry == ""}
              placeholder="Select an state"
              required
            />
          </div>
        </div>    
        <div className="w-full  px-3 mb-6 md:mb-0">
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="description"
            >
              Description
            </label>
            <input
              className="block w-full rounded-md border-0 py-1.5 h-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              id="description"
              type="text"
              name="description"
              placeholder="Describe your traveling style and the places you would like to go in that state"
              // autoComplete="on"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-wrap  -mx-3 mb-6">
          {/* Calender */}
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="dob"
            >
              Start Date
            </label>
            <input
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="dob"
            >
              End Date
            </label>
            <input
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>

        <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="dob"
            >
              preferred languages:
            </label>
            <div className="flex flex-wrap  -mx-3 mb-6">
        <div>
        <h1>First:</h1>
        <ReactLanguageSelect
          // value={selectedLanguage1}
          searchable={true}
          onSelect={onSelectLanguage1}
          defaultLanguage={selectedLanguage1}
        />
      </div>
      <div>
        <h1>Second:</h1>
        <ReactLanguageSelect
          // value={selectedLanguage2}
          searchable={true}
          onSelect={onSelectLanguage2}
          defaultLanguage={selectedLanguage2}
        />
      </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6"></div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create!
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCardForm;
