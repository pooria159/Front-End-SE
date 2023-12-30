import Select from "react-select";
import ClipLoader from "react-spinners/ClipLoader";
import Uploadimg from "./Upload";
import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faVenusMars,
  faLanguage,
  faInfoCircle,
  faTags,
  faCoins,
  faCalendar,
  faPhone,
  faEnvelope,
  faCity,
  faFlag,
  faEarth,
  faAddressBook,
  faSmoking,
  faChild,
  faDog,
  faBroom,
  faBed,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useCityCountry } from "../../hooks/useCityCountry";
import useEditProfile from "../../hooks/useEditProfile";
import { toast } from "react-toastify";
import { useProfile } from "../../hooks/useProfile";
import useUploadimg  from "../../hooks/useUploadimg";

const Genders = [" ", "Man", "Woman", "Other"];
const Intrests = ["Coding", "Traveling", "Photography", "Reading"];

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#2563EB" size={150} />
    </div>
  );
};

const fetchCityCountry = async (type, relevent = "") => {
  let obj = [];
  if (type == "country") {
    const response = await useCityCountry("country");
    for (var item in response) {
      obj.push({
        value: response[item]["country_name"],
        label: response[item]["country_name"],
      });
    }
  } else if (type == "state") {
    const response = await useCityCountry("state", relevent);
    for (var item in response) {
      obj.push({
        value: response[item]["state_name"],
        label: response[item]["state_name"],
      });
    }
  } else if (type == "city") {
    const response = await useCityCountry("city", relevent);
    for (var item in response) {
      obj.push({
        value: response[item]["city_name"],
        label: response[item]["city_name"],
      });
    }
  }
  return obj;
};

const EditSec = ({ formData, updateFormData }) => {
  if (formData == null) formData = { City: "", Country: "", State: "" };

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  const Gender = ["", "Male", "Female"];
  const genderOptions = [
    { label: "Male", value: 1 },
    { label: "Female", value: 2 },
  ];

  const intrestsOptions = [
    { label: "Computer", value: "Computer" },
    { label: "Nature", value: "Nature" },
    { label: "Movie", value: "Movie" },
    { label: "Game", value: "Game" },
    { label: "Sleep", value: "Sleep" },
  ];

  const ynOptions = [
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
  ];

  const mapYNResult = {
    true: "Yes",
    false: "No",
  };

  const roomNumberOptions = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
    { label: "8", value: 8 },
    { label: "9", value: 9 },
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState({
    value: formData ? formData.Country : " ",
    label: formData ? formData.Country : " ",
  });
  const [hostHouseImages, setHostHouseImages] = useState([]);

  const [selectedState, setSelectedState] = useState({
    value: formData ? formData.State : " ",
    label: formData ? formData.State : " ",
  });
  const [selectedCity, setSelectedCity] = useState({
    value: formData ? formData.City : " ",
    label: formData ? formData.City : " ",
  });

  const [selectedGender, setSelectedGender] = useState({
    value: formData ? formData.Gender : " ",
    label: formData ? Gender[formData.Gender] : " ",
  });
  const [selectedPhoneNumber, setselectedPhoneNumber] = useState(
    formData && formData.PhoneNumber ? formData.PhoneNumber : ""
  );
  const [selectedAddress, setselectedAddress] = useState(
    formData && formData.Address ? formData.Address : ""
  );
  const [selectedIntrests, setSelectedIntrests] = useState(
    formData && formData.Intrests ? formData.Intrests : []
  );

  const [selectedSmokingAllowed, setSelectedSmokingAllowed] = useState(
    formData && formData.IsSmokingAllowed
      ? {
          label: mapYNResult[formData.IsSmokingAllowed],
          value: formData.IsSmokingAllowed,
        }
      : { label: "", value: "" }
  );
  const [selectedPetFreindly, setSelectedPetFreindly] = useState(
    formData && formData.IsPetFriendly
      ? {
          label: mapYNResult[formData.IsPetFriendly],
          value: formData.IsPetFriendly,
        }
      : { label: "", value: "" }
  );
  const [selectedKidsFriendly, setSelectedKidsFriendly] = useState(
    formData && formData.IsKidFriendly
      ? {
          label: mapYNResult[formData.IsKidFriendly],
          value: formData.IsKidFriendly,
        }
      : { label: "", value: "" }
  );
  const [selectedRoomNumbers, setSelectedRoomNumbers] = useState(
    formData && formData.RoomNumber
      ? { label: formData.RoomNumber, value: formData.RoomNumber }
      : { label: "", value: "" }
  );

  const bioRef = useRef(null);

  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "white",
      borderRadius: "0.75rem",
      borderColor: "#9095a0",
      paddingLeft: "0.25rem",
      color: "#4a5568",
      width: "13rem",
      height: "2.5rem",
      marginLeft: "0.25rem",
    }),
  };
  const customStyles2 = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "white",
      borderRadius: "0.75rem",
      borderColor: "#9095a0",
      paddingLeft: "0.25rem",
      color: "blue",
      width: "75%",
      height: "2.5rem",
      marginLeft: "0.25rem",
    }),
  };

  const formatOptionLabel = ({ label }) => (
    <div className="flex space-x-1">
      <div>{label}</div>
    </div>
  );

  useEffect(() => {
    if (formData.Country !== "") setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchCityCountry("country").then(setCountryOptions);
    fetchCityCountry("state", formData.Country).then(setStateOptions);
    fetchCityCountry("city", formData.State).then(setCityOptions);
  }, [formData.Country, formData.State]);

  useEffect(() => {
    fetchCityCountry("state", selectedCountry.value).then(setStateOptions);
  }, [selectedCountry]);

  useEffect(() => {
    fetchCityCountry("city", selectedState.value).then(setCityOptions);
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
  const handleGenderChange = (selectedOption) => {
    setSelectedGender(selectedOption);
  };
  const handleChangePhoneNumber = (e) => {
    setselectedPhoneNumber(e.target.value);
  };
  const handleChangeAddress = (e) => {
    setselectedAddress(e.target.value);
  };
  const handleIntrestsChange = (selectedOptions) => {
    setSelectedIntrests(selectedOptions);
  };
  const handleIsSmokingChange = (selectedOptions) => {
    setSelectedSmokingAllowed(selectedOptions);
  };
  const handlePetFriendlyChange = (selectedOptions) => {
    setSelectedPetFreindly(selectedOptions);
  };
  const handleKidFriendlyChange = (selectedOptions) => {
    setSelectedKidsFriendly(selectedOptions);
  };
  const handleRoomNumberChange = (selectedOptions) => {
    setSelectedRoomNumbers(selectedOptions);
  };

  const fetch = async () => {
    try {
      const response = await useProfile();
      setIsLoading(false);
      return response;
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_LEFT,
      });
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const changes = {};

    if (usernameRef.current.value !== formData.UserName) {
      changes.UserName = usernameRef.current.value;
    }

    if (bioRef.current.value !== "") {
      changes.Bio = bioRef.current.value;
    }
    if (selectedCountry !== null && selectedCountry.value != formData.Country) {
      changes.Country = selectedCountry.value;
    }
    if (selectedState !== null && selectedState.value != formData.State) {
      changes.State = selectedState.value;
    }
    if (selectedCity !== null) {
      changes.City = selectedCity.value;
    }
    if (selectedGender !== null && selectedGender.value != formData.Gender) {
      changes.Gender = selectedGender.value;
    }
    if (selectedPhoneNumber != "") {
      changes.PhoneNumber = selectedPhoneNumber;
    }
    if (selectedKidsFriendly.value != "") {
      changes.IsKidFriendly = selectedKidsFriendly.value;
    }
    if (selectedPetFreindly.value != "") {
      changes.IsPetFriendly = selectedPetFreindly.value;
    }
    if (selectedSmokingAllowed.value != "") {
      changes.IsSmokingAllowed = selectedSmokingAllowed.value;
    }
    if (selectedRoomNumbers.value != "") {
      changes.RoomNumber = selectedRoomNumbers.value;
    }
    if (selectedAddress != "" && selectedAddress != formData.Address) {
      changes.Address = selectedAddress;
    }
    // if (selectedIntrests != []) {
    //     changes.Intrests = selectedIntrests;
    // }

    // Add similar checks for the rest of the data

    console.log(changes);

    const formDataforimage = new FormData();
    for (let i = 0; i < hostHouseImages.length; i++) {
      formDataforimage.append(`image${i+1}`, hostHouseImages[i]);
    }
    

    try {
      const response = await useEditProfile(changes);
      const newFromData = await fetch();
      updateFormData(newFromData.data);
      toast.success("Your information has been changed successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }

    try {
      const response = await useUploadimg(formDataforimage , true , hostHouseImages.length);
      console.log("22222222222222222222222"+response);
      const newFromData = await fetch();
      updateFormData(newFromData.data);
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
    

  };

  return isLoading ? (
    <Loading />
  ) : (
    <form
      className="flex flex-col  items-center space-y-5 w-full h-full"
      onSubmit={handleSubmit}
    >
      <div className="p-6 w-5/6 mx-auto bg-white rounded-xl shadow-md flex flex-wrap">
        <div className="w-full sm:w-1/2 flex flex-col">
          <div className="flex flex-col text-gray-500 mb-4">
            <div className="flex items-center ml-2">
              <FontAwesomeIcon icon={faUser} className="mr-2" />

              <label htmlFor="username">Username: (Can't be changed)</label>
            </div>
            <input
              id="username"
              type="text"
              disabled
              className="rounded-xl w-3/4 text-gray-700"
              defaultValue={formData.UserName}
              ref={usernameRef && usernameRef}
            />
          </div>
          <div className="flex flex-col text-gray-500 mb-4">
            <div className="flex items-center ml-2">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              <label htmlFor="email">Email: (Can't be changed)</label>
            </div>
            <input
              id="email"
              type="text"
              disabled
              className="rounded-xl w-3/4 text-gray-700"
              defaultValue={formData.Email}
            />
          </div>
          <div className="flex flex-col text-gray-500 mb-4">
            <div className="flex items-center ml-2">
              <FontAwesomeIcon icon={faVenusMars} className="mr-2" />

              <label htmlFor="gender">Gender: (Can't be changed)</label>
            </div>
            <Select
              id="gender"
              isDisabled={true}
              isSearchable={false}
              className="w-1/2"
              styles={customStyles}
              options={genderOptions}
              value={selectedGender}
              onChange={(selectedOption) => handleGenderChange(selectedOption)}
            />
          </div>
          {/* Add similar input fields for the rest of the data */}
        </div>
        <div className="w-full sm:w-1/2 flex flex-col space-y-4">
          <div className="flex flex-col w-full text-gray-500">
            <div className="flex items-center ml-2">
              <FontAwesomeIcon icon={faEarth} className="mr-2" />
              Country:
            </div>
            <Select
              className="w-1/2"
              styles={customStyles}
              options={countryOptions}
              value={selectedCountry}
              onChange={(selectedOption) => handleCountryChange(selectedOption)}
            />
          </div>
          <div className="flex flex-col text-gray-500">
            <div className="flex items-center ml-2">
              <FontAwesomeIcon icon={faFlag} className="mr-2" />
              State:
            </div>
            <Select
              className="w-1/2"
              styles={customStyles}
              options={stateOptions}
              value={selectedState}
              isDisabled={!selectedCountry}
              onChange={(selectedOption) => handleStateChange(selectedOption)}
              formatOptionLabel={formatOptionLabel}
            />
          </div>
          <div className="flex flex-col text-gray-500">
            <div className="flex items-center ml-2">
              <FontAwesomeIcon icon={faCity} className="mr-2" />
              City:
            </div>
            <Select
              className="w-1/2"
              styles={customStyles}
              options={cityOptions}
              value={selectedCity}
              isDisabled={!selectedState}
              onChange={(selectedOption) => handleCityChange(selectedOption)}
            />
          </div>
          {/* Add similar input fields for the rest of the data */}
        </div>
        {/* Add a second column of input fields if needed */}
      </div>
      <div className="text-xl font-bold">Host Section</div>
      <div className="p-6 w-5/6 mx-auto bg-white rounded-xl shadow-md flex flex-wrap">
        <div className="w-full sm:w-1/2 flex flex-col">
          <div className="flex flex-col text-gray-500 mb-4">
            <div className="flex items-center ml-2">
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              Phone Number:
            </div>
            <input
              type="text"
              className="rounded-xl w-3/4 text-gray-700"
              defaultValue={selectedPhoneNumber}
              onChange={handleChangePhoneNumber}
            />
          </div>
          <div className="flex flex-col text-gray-500 mb-4">
            <div className="flex items-center ml-2">
              <FontAwesomeIcon icon={faAddressBook} className="mr-2" />
              Address:
            </div>
            <input
              type="text"
              className="rounded-xl w-3/4 text-gray-700"
              defaultValue={selectedAddress}
              onChange={handleChangeAddress}
            />
          </div>
          <div className="flex flex-col text-gray-500 mb-4">
            <div className="flex items-center ml-2">
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              Intrests:
            </div>
            <Select
              isMulti
              isSearchable={false}
              className="w-full"
              styles={customStyles2}
              options={intrestsOptions}
              value={selectedIntrests}
              onChange={(selectedOptions) =>
                handleIntrestsChange(selectedOptions)
              }
            />
          </div>
          <div className="flex flex-col text-gray-500 mb-4 mt-1.5">
            <div className="flex items-center ml-2">
              <FontAwesomeIcon icon={faBed} className="mr-2" />
              Room Numbers:
            </div>
            <Select
              className="w-1/2"
              isSearchable={false}
              styles={customStyles}
              options={roomNumberOptions}
              value={selectedRoomNumbers}
              onChange={(selectedOption) =>
                handleRoomNumberChange(selectedOption)
              }
            />
          </div>
          {/* Add similar input fields for the rest of the data */}
        </div>
        <div className="w-full sm:w-1/2 flex flex-col space-y-5">
          <div className="flex flex-col w-full text-gray-500">
            <div className="flex items-center ml-2">
              <FontAwesomeIcon icon={faDog} className="mr-2" />
              Pet Friendly:
            </div>
            <Select
              disabled
              isSearchable={false}
              className="w-1/2"
              styles={customStyles}
              options={ynOptions}
              value={selectedPetFreindly}
              onChange={(selectedOption) =>
                handlePetFriendlyChange(selectedOption)
              }
            />
          </div>
          <div className="flex flex-col text-gray-500">
            <div className="flex items-center ml-2">
              <FontAwesomeIcon icon={faChild} className="mr-2" />
              Kids Friendly
            </div>
            <Select
              isSearchable={false}
              className="w-1/2"
              styles={customStyles}
              options={ynOptions}
              value={selectedKidsFriendly}
              onChange={(selectedOption) =>
                handleKidFriendlyChange(selectedOption)
              }
            />
          </div>
          <div className="flex flex-col text-gray-500">
            <div className="flex items-center ml-2">
              <FontAwesomeIcon icon={faSmoking} className="mr-2" />
              Smoking Allowed:
            </div>
            <Select
              className="w-1/2"
              styles={customStyles}
              options={ynOptions}
              value={selectedSmokingAllowed}
              onChange={(selectedOption) =>
                handleIsSmokingChange(selectedOption)
              }
            />
          </div>
          {/* Add similar input fields for the rest of the data */}
        </div>
        <Uploadimg setHostHouseImages = {setHostHouseImages}/>
        {/* Add a second column of input fields if needed */}
      </div>
      <div className="flex flex-col space-y-8 p-6 w-5/6 mx-auto bg-white rounded-xl shadow-md justify-content items-center">
        <div className="text-xl font-bold">Bio</div>
        <textarea
          className="w-full rounded-xl"
          defaultValue={formData.Bio}
          ref={bioRef && bioRef}
        />
      </div>
      <button
        className="w-48 p-1 rounded-md text-indigo-500 border-double border-2 border-indigo-500 hover:text-indigo-300 hover:border-indigo-300"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </form>
  );
};

export default EditSec;
