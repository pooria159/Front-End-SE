import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useCityCountry } from "../hooks/useCityCountry";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useCreateCard } from "../hooks/useCreateCard";
import { TbBuildingEstate } from "react-icons/tb";
import { MdHome, MdDescription, MdCardTravel, MdCreate } from "react-icons/md";
import { FaLanguage } from "react-icons/fa";
import {
  BsPencilSquare,
  BsChatSquareTextFill,
  BsFillPhoneVibrateFill,
  BsPersonFill,
  BsCameraFill,
  BsXLg,
  BsEnvelopeFill,
  BsCheckLg,
  BsPenFill,
  BsGenderAmbiguous,
  BsMapFill,
  BsCalendar,
} from "react-icons/bs";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const languages = {
    Arabic: 'العربية',
    Bengali: 'বাংলা',
    Chinese: '中文',
    German: 'German',
    English: 'English',
    Spanish: 'Español',
    Persian: 'پارسی',
    French: 'Français',
    Greek: 'ελληνική',
    Guarani: "Avañe'ẽ",
    Hindi: 'हिंदुस्तानी',
    Italian: 'Italiano',
    Korean: '한국어',
    Malay: 'Melayu',
    Dutch: 'Nederlandse',
    Portuguese: 'Português',
    Romanian: 'Română',
    Russian: 'русский',
    Albanian: 'shqiptar',
    SerboCroatian: 'Српско-хрватски',
    Swedish: 'Swedish',
    Swahili: 'Kiswahili',
    Tamil: 'தமிழ்',
    Turkish: 'Türk'
};
const CreateCardForm = () => {
  const style = {
    control: (base, state) => ({
      ...base,
      borderRadius: "6px",
      border: "none",
      outline: "0.1rem solid #26577C",
      opacity: state.isDisabled ? 0.8 : 1,
    }),
    option: (base, state) => ({
      ...base,
    }),
    input3: (base) => ({
      ...base,
      border: "none",
    }),
    valueContainer: (base) => ({
      ...base,
      fontSize: "14px",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#26577C",
    }),
  };
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Description: "",
    PreferredLanguages: ["English", "English"],
    StartDate: "",
    EndDate: "",
    DestinationCountry: "",
    DestinationState: "",
    DestinationCity: "",
    NumberOfTravelers: 1,
  });

  const numberItems = [1, 2, 3, 4, 5, 6];

  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState(null);
  const [states, setStates] = useState(null);
  const [cities, setCities] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [TravelerCount, setTravelerCount] = useState("");
  const [selectedLanguage1, setselectedLanguage1] = useState("English");
  const [selectedLanguage2, setselectedLanguage2] = useState("English");
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
    let formattedValue = e.target.type === "date" ? formatDate(value) : value;
    setFormData({ ...formData, [name]: formattedValue });
  };
  const handleTravelerCountChange = (tc) => {
    setTravelerCount(tc);
    setFormData({
      ...formData,
      ["NumberOfTravelers"]: tc.value,
    });
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
      toast.error("Please fill in all required fields.", {
        position: toast.POSITION.TOP_LEFT,
      });
      return false;
    }
  };
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
      toast.error("Please fill in all required fields.", {
        position: toast.POSITION.TOP_LEFT,
      });
      return false;
    }
    try {
      const response = await useCreateCard(updatedFormData);
      if (response.status >= 200 && response.status < 300) {
        toast.success("Card is created successfully !", {
          autoClose: 1000,
          position: toast.POSITION.TOP_LEFT,
        });
        setTimeout(() => {}, 1500);
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
    // console.log("lang issss :");
    // console.log(languageCode);
    setFormData({
      ...formData,
      PreferredLanguages: [languageCode,formData.PreferredLanguages[1]],
    });
  };

  const onSelectLanguage2 = (languageCode) => {
    setselectedLanguage2(languageCode);
    // console.log("lang issss :");
    // console.log(languageCode);
    setFormData({
      ...formData,
      PreferredLanguages: [formData.PreferredLanguages[0],languageCode],
    });
  };

  return (
    <div className="mt-5 m-0 w-5/6 selectedCity mx-auto">
      <h2 className="m-0 mb-5 text-center text-black text-2xl font-bold leading-9 tracking-tight ">
        Create your journey announcement
      </h2>
      <div className="m-0 space-y-2">
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <div className="flex items-center">
              <BsMapFill className="mr-1" />
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="country"
              >
                Country:
              </label>
            </div>
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
              styles={style}
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <div className="flex items-center">
              <TbBuildingEstate className="mr-1 text-xl" />
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="state"
              >
                State:
              </label>
            </div>
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
              styles={style}
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <div className="flex items-center">
              <MdHome className="mr-1 text-xl" />
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="city"
              >
                City:
              </label>
            </div>
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
              styles={style}
            />
          </div>
        </div>
        <div className="w-full mb-8 ">
          <div className="flex items-center">
            <MdDescription className="mr-1 text-xl" />
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="description"
            >
              Description:
            </label>
          </div>
          <textarea
            className="block w-full h-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#26577C] sm:text-sm sm:leading-6"
            id="description"
            name="Description"
            placeholder="Describe your traveling style, places you would like to go in that state, transportation, other traveller priorities,..."
            value={formData.Description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="flex flex-wrap  -mx-3 mb-8">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <div className="flex items-center">
              <BsCalendar className="mr-1 mt-2" />
              <label
                className="block mt-2 text-sm font-medium leading-6 text-gray-900"
                htmlFor="dob"
              >
                Start Date:
              </label>
            </div>
            <input
              className="block w-full rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-[#26577C] placeholder:text-gray-400 focus:ring-1  focus:ring-inset focus:ring-[#26577C] sm:text-sm sm:leading-6"
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
            <div className="flex items-center">
              <BsCalendar className="mr-1 mt-2" />
              <label
                className="block mt-2 text-sm font-medium leading-6 text-gray-900"
                htmlFor="dob"
              >
                End Date:
              </label>
            </div>
            <input
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#26577C] placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#26577C] sm:text-sm sm:leading-6"
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
            <div className="flex items-center">
              <MdCardTravel className="mr-1 mt-2 text-xl" />
              <label
                className="block mt-2 text-sm font-medium leading-6 text-gray-900"
                htmlFor="travelersCount"
              >
                TravelersCount:
              </label>
            </div>
            <Select
              id="travelersCount"
              name="travelersCount"
              options={numberItems.map((n) => ({
                value: n,
                label: n,
              }))}
              value={TravelerCount}
              onChange={handleTravelerCountChange}
              isSearchable
              placeholder="Select"
              required
              styles={style}
            />
          </div>
        </div>

        <div className="flex items-center">
          <FaLanguage className="mr-1 mt-2 text-2xl" />
          <label
            className="block mt-2 text-sm font-medium leading-6 text-gray-900"
            htmlFor="dob"
          >
            Preferred Languages:
          </label>
        </div>
        <div className=" w-full flex space-x-20 mb-6">
          <div className="w-full md:w-5/12 ml-5 mb-4">
            <label>First:</label>
            <Select
              options={Object.keys(languages).map((code) => ({
                value: code,
                label: languages[code],
              }))}
              value={{ label: languages[selectedLanguage1], value: selectedLanguage1 }}
              onChange={(selectedOption) => onSelectLanguage1(selectedOption.value)}
              isSearchable
              styles={style}
            />
          </div>
          <div className="w-full md:w-5/12 mr-5 mb-4">
            <label>Second:</label>
            <Select
              options={Object.keys(languages).map((code) => ({
                value: code,
                label: languages[code],
              }))}
              value={{ label: languages[selectedLanguage2], value: selectedLanguage2 }}
              onChange={(selectedOption) => onSelectLanguage2(selectedOption.value)}
              isSearchable
              styles={style}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6"></div>

        <div>
          <button
            type="submit"
            className="flex w-1/2 mx-auto justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleSubmit}
          >
            <MdCreate className="mr-1 mt-1" />
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCardForm;
