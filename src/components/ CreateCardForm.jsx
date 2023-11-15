import React, { useState, useEffect } from "react";
import ReactLanguageSelect from "react-languages-select";
import "react-languages-select/css/react-languages-select.css";
import { toast } from "react-toastify";
import { useCityCountry } from "../hooks/useCityCountry";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useCreateCard } from "../hooks/useCreateCard";

// Function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const languages = {
  ar: { name: 'Arabic', localName: 'العربية'},
  bn: { name: 'Bengali', localName: 'বাংলা'},
  ch: { name: 'Chinese', localName: '中文'},
  de: { name: 'German', localName: 'German'},
  en: { name: 'English', localName: 'English'},
  es: { name: 'Spanish', localName: 'Español' },
  fa: { name: 'Persian', localName: 'پارسی' },
  fr: { name: 'French', localName: 'Français' },
  gr: { name: 'Greek', localName: 'ελληνική' },
  gu: { name: 'Guarani', localName: "Avañe'ẽ"},
  hi: { name: 'Hindi', localName: 'हिंदुस्तानी' },
  it: { name: 'Italian', localName: 'Italiano' },
  ko: { name: 'Korean', localName: '한국어'},
  ms: { name: 'Malay', localName: 'Melayu' },
  nl: { name: 'Dutch', localName: 'Nederlandse'},
  pt: { name: 'Portuguese', localName: 'Português'},
  ro: { name: 'Romanian', localName: 'Română' },
  ru: { name: 'Russian', localName: 'русский' },
  sq: { name: 'Albanian', localName: 'shqiptar' },
  sr: { name: 'Serbo-Croatian', localName: 'Српско-хрватски' },
  sv: { name: 'Swedish', localName: 'Swedish' },
  sw: { name: 'Swahili', localName: 'Kiswahili' },
  ta: { name: 'Tamil', localName: 'தமிழ்' },
  tr: { name: 'Turkish', localName: 'Türk' },
};


const CreateCardForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Description: "",
    PreferredLanguages: ["en","en"],
    StartDate: "",
    EndDate: "",
    DestinationCountry: "",
    DestinationState: "",
    DestinationCity: "",
    NumberOfTravelers: 1,
  });

  const numberItems = [1,2,3,4,5,6];

  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState(null);
  const [states, setStates] = useState(null);
  const [cities, setCities] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [TravelerCount, setTravelerCount] = useState("");
  const [selectedLanguage1, setselectedLanguage1] = useState("en");
  const [selectedLanguage2, setselectedLanguage2] = useState("en");
  const [isTravelerCountFocused, setIsTravelerCountFocused] = useState(false);


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

  // const handleTravelerCountFocus = () => {
  //   setIsTravelerCountFocused(true);
  // };

  useEffect(() => {
    setSelectedCity("");
    const fetch = async () => {
      console.log(selectedState);
      const response = await useCityCountry("city", selectedState.value);
      setCities(response);
    };
    fetch();
  }, [selectedState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the input is a date input, format the value
    let formattedValue = e.target.type === "date" ? formatDate(value) : value;
    setFormData({ ...formData, [name]: formattedValue });
  };
  const handleTravelerCountChange = (tc) => {
    // if (isTravelerCountFocused) {
      setTravelerCount(tc);
      setFormData({
        ...formData,
        ["NumberOfTravelers"]: tc.value,
      });
    // }
    // setIsTravelerCountFocused(false);
  };

  const isFormValid = (formData) => {
    if (

    !formData.StartDate ||
    !formData.EndDate ||
    !formData.DestinationCountry ||
    !formData.DestinationState ||
    !formData.DestinationCity ||
    !formData.NumberOfTravelers
    ) {
    // Display an error message or handle the validation as needed
    toast.error("Please fill in all required fields.", {
    position: toast.POSITION.TOP_LEFT,
    });
    return false;
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = { ...formData };
    if (

      !formData.StartDate ||
      !formData.EndDate ||
      !formData.DestinationCountry ||
      !formData.DestinationState ||
      !formData.DestinationCity ||
      !formData.NumberOfTravelers
      ) {
      // Display an error message or handle the validation as needed
      toast.error("Please fill in all required fields.", {
      position: toast.POSITION.TOP_LEFT,
      });
      return false;
      }
    // if (!isFormValid(formData)) {
    //   // If the form is not valid, don't proceed with submission
    //   return;
    // }else{
         try {
      const response = await useCreateCard(updatedFormData);
      if (response.status >= 200 && response.status < 300) {
        // Successful response (status code 2xx)
        // Redirect to /login
        toast.success("Card is created successfully !", {
          autoClose: 1000,
          position: toast.POSITION.TOP_LEFT,
        });
        setTimeout(() => {
        }, 1500);
      } else {
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
    // }
    // useCreateCard(updatedFormData);

  };
  const onSelectLanguage1 = (languageCode) => {
    setselectedLanguage1(languageCode);
    // console.log("lang issss :");
    // console.log(languageCode);
    setFormData({
      ...formData,
      PreferredLanguages: [formData.PreferredLanguages[0], languageCode],
    });
  };
  
  const onSelectLanguage2 = (languageCode) => {
    setselectedLanguage2(languageCode);
    // console.log("lang issss :");
    // console.log(languageCode);
    setFormData({
      ...formData,
      PreferredLanguages: [languageCode, formData.PreferredLanguages[1]],
      
    });
  };
  


  return (
    <div className="mt-5 m-0 w-5/6 selectedCity mx-auto">
      <h2 className="m-0 mb-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Create your journey announcement
      </h2>
      <div className="m-0 space-y-2" >
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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
                  ["DestinationCountry"]: selectedCountry.value,
                });
              }}
              isSearchable
              placeholder="Select"
              required
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="state"
            >
              State
            </label>
            <Select
              id="state"
              name="state"
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
                setFormData({
                  ...formData,
                  ["DestinationState"]: selectedState.value,
                });
              }}
              isSearchable
              isDisabled={selectedCountry == ""}
              placeholder="Select"
              required
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="city"
            >
              City
            </label>
            <Select
              id="city"
              name="city"
              options={
                cities &&
                cities.map((state) => ({
                  value: state.city_name,
                  label: state.city_name,
                }))
              }
              value={selectedCity}
              onChange={(selectedCity) => {
                setSelectedCity(selectedCity);
                setFormData({
                  ...formData,
                  ["DestinationCity"]: selectedCity.value,
                });
              }}
              isSearchable
              isDisabled={selectedState == ""}
              placeholder="Select"
              required
            />
          </div>
        </div>
        <div className="w-full mb-8 ">
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id="description"
            name="Description"
            placeholder="Describe your traveling style, places you would like to go in that state, transportation, other traveller priorities,..."
            // autoComplete="on"
            value={formData.Description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="flex flex-wrap  -mx-3 mb-8">
          {/* Calender */}
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="mt-4 block text-sm font-medium leading-6 text-gray-900"
              htmlFor="dob"
            >
              Start Date
            </label>
            <input
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="date"
              id="startDate"
              name="StartDate"
              value={formData.StartDate}
              onChange={handleChange}
              required
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className=" mt-4 block text-sm font-medium leading-6 text-gray-900"
              htmlFor="dob"
            >
              End Date
            </label>
            <input
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="date"
              id="endDate"
              name="EndDate"
              value={formData.EndDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-2">
            <label
              className=" mt-4 block text-sm font-medium leading-6 text-gray-900"
              htmlFor="travelersCount"
            >
              Travelers Count
            </label>
            <Select
              className="w-2/3"
              id="travelersCount"
              name="travelersCount"
              options={numberItems.map((n) => ({
                value: n,
                label: n,
              }))}
              value={TravelerCount}
              // onFocus={handleTravelerCountFocus}
              onChange={handleTravelerCountChange}
              isSearchable
              placeholder="Select"
              required
            />
          </div>
        </div>

        <label
          className="block text-md font-medium leading-6 text-gray-900"
          htmlFor="dob"
        >
          Preferred Languages:
        </label>
        <div className=" w-full mx-auto flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 mb-4">
            {" "}
            {/* This div takes up half the width */}
            <label>First:</label>
            <ReactLanguageSelect
              className="z-0"
              searchable={true}
              onSelect={(language) => onSelectLanguage1(languages[language].name)}
              defaultLanguage={selectedLanguage1}
              
            />
          </div>
          <div className="w-full md:w-1/2 mb-4">
            {" "}
            {/* This div also takes up half the width */}
            <label>Second:</label>
            <ReactLanguageSelect
              className="z-0"
              searchable={true}
              // onSelect={onSelectLanguage2}
              onSelect={(language) => onSelectLanguage2(languages[language].name)}
              defaultLanguage={selectedLanguage2}
              // disabled={isTravelerCountFocused} 
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6"></div>

        <div>
          <button
            type="submit"
            className="flex w-1/2 mx-auto justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSubmit}
          >
            Create!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCardForm;
