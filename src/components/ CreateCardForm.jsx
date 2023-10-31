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

const CreateCardForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Description: "",
    PreferredLanguages: [],
    StartDate: "",
    EndDate: "",
    DestinationCountry: "",
    DestinationState: "",
    DestinationCity: "",
    NumberOfTravelers: "",
  });

  const numberItems = ["1", "2", "3", "4", "5", "6"];

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = { ...formData };
    useCreateCard(updatedFormData);
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
  };
  const onSelectLanguage1 = (languageCode) => {
    setselectedLanguage1(languageCode);
    setFormData({
      ...formData,
      PreferredLanguages: [languageCode, ...formData.PreferredLanguages],
    });
  };
  
  const onSelectLanguage2 = (languageCode) => {
    setselectedLanguage2(languageCode);
    setFormData({
      ...formData,
      PreferredLanguages: [languageCode, ...formData.PreferredLanguages],
    });
  };
  


  return (
    <div className="mt-5 m-0 w-5/6 selectedCity mx-auto">
      <h2 className="m-0 mb-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Create your jurney announcement
      </h2>
      <form className="m-0 space-y-2" onSubmit={handleSubmit}>
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
              onChange={(tc) => {
                setTravelerCount(tc);
                setFormData({
                  ...formData,
                  ["NumberOfTravelers"]: TravelerCount.value,
                });
              }}
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
        <div className=" w-5/6 mx-auto flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-4">
            {" "}
            {/* This div takes up half the width */}
            <label>First:</label>
            <ReactLanguageSelect

              searchable={true}
              onSelect={onSelectLanguage1}
              defaultLanguage={selectedLanguage1}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-4">
            {" "}
            {/* This div also takes up half the width */}
            <label>Second:</label>
            <ReactLanguageSelect
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
            className="flex w-1/2 mx-auto justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create!
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCardForm;
