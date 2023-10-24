/* eslint-disable react/jsx-key */
import React,{useState, useEffect} from "react";
import {Button,Card,Textarea,} from "flowbite-react";
// import { Select } from "flowbite-react";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import image from "../../assets/myl.png";
import {BsPencilSquare,BsPersonFill,BsXLg,BsEnvelopeFill,BsCheckLg,BsPenFill,BsGenderAmbiguous,BsMapFill,BsCalendar,BsPersonFillLock,} from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import useEditprofile from "../../hooks/useEditProfile.js"
import { useProfile } from "../../hooks/useProfile";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCityCountry } from "../../hooks/useCityCountry"


const EProfilePage = () => {
    const navigate = useNavigate();
    const [countries, setCountries] = useState(null);
    const [states, setStates] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [formDataa, setFormData] = useState({});
    const [data , setData] = React.useState(null);
    const Genderarr = ["","Male" ,"Female", "Other"];

    
    useEffect (() => {
        const fetch = async () => {
            const res = await useProfile();
            console.log(res.data)
            setData(res.data);
            setFirstNameValue(res.data.FirstName);
            setLastNameValue(res.data.LastName);
            setBirthDateValue(res.data.BirthDate);
            setGenderValue(res.data.Gender);
            setCityValue(res.data.City);
            setCountryValue(res.data.Country);
        }
        fetch();
    } , []);

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
  

    const [onSubmitDisabledButton, setOnSubmitDisabledButton] = React.useState(false);
    const [firstNameValue, setFirstNameValue] = React.useState("");
    const [lastNameValue, setLastNameValue] = React.useState("");
    const [emailValue, setEmailValue] = React.useState("");
    const [birthDateValue, setBirthDateValue] = React.useState(new Date("1923-01-01"));
    const [genderValue, setGenderValue] = React.useState("");
    const [bioValue, setBioValue] = React.useState("");
    const [userNameValue, setUserNameValue] = React.useState("");
    const [newUserNameValue, setNewUserNameValue] = React.useState("")
    const [newUserNameError , setNewUserNameError] = React.useState(false)
    const [passwordValue, setPasswordValue] = React.useState("");
    const [passwordConfirmValue, setPasswrodConfirmValue] = React.useState("");
    const [currentPasswrodValue, setCurrentPasswrodValue] = React.useState("");
    const [countryValue, setCountryValue] = React.useState("");
    const [cityValue, setCityValue] = React.useState("");
    const [imgValue, setImgValue] = React.useState("");
    const [birthDateISOValue, setbirthDateISOValue] = React.useState("");
    const [passwordErrorConfirmation, setPasswordErrorConfirmation] =React.useState(false);
    const [passwordErrorCurrent, setPasswordErrorCurrent] = React.useState(false);


    const handleFirstNamechange = (e) => {
        e.preventDefault();
        console.log(e.target);
        setFirstNameValue(e.target.value.replace(/[^a-zA-Z]/g, ""));
    };
    const handleLastNamechange = (e) => {
        e.preventDefault();
        setLastNameValue(e.target.value.replace(/[^a-zA-Z]/g, ""));
    };
    const handleEmailchange = (event) => {
        setEmailValue(event.target.value);
    };
    const handleBirthDateChange = (selectedDate) => {
        setBirthDateValue(selectedDate);
        setbirthDateISOValue(moment(selectedDate).format("YYYY-MM-DD"));
        console.log(birthDateISOValue);
    };
    const handleGenderchange = (event) => {
        setGenderValue(event.target.value);
    };
    const handleBiochange = (event) => {
        setBioValue(event.target.value);
    };
    const handleCurrentPassswrod = (e) => {
        e.preventDefault();
        setCurrentPasswrodValue(e.target.value);
        if (
            currentPasswrodValue.length > 0 &&
            currentPasswrodValue !== localStorage.getItem("password")
        ) {
            setPasswordErrorCurrent(true);
        } else {
            setPasswordErrorCurrent(false);
        }
    };
    const handleCountryChange = (event) => {
        setCountryValue(event.target.value);
    };
    const handleCityChange = (event) => {
        setCityValue(event.target.value);
    };
    const handleImgValue = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImgValue(reader.result);
        };
        console.log(imgValue);
    };
    // const handleRemoveImg = (e) => {
    //     setImgValue("");
    // };
    const handleNewUsername = (e) => {
        e.preventDefault();
        setNewUserNameValue(
            e.target.value
                .replace(/[^a-zA-Z0-9_.]/g, "")
                .replace(/^[^a-zA-Z]/g, "")
        );
        console.log(userNameValue);
        if (e.target.value===userNameValue) {
            setNewUserNameError(true)
        }
        else{
            setNewUserNameError(false)
        }
    };
    const handlePassword = (e) => {
        e.preventDefault();
        setPasswordValue(e.target.value);
        setPasswordErrorConfirmation(
            e.target.value !== passwordConfirmValue || e.target.value.length < 8
        );
    };

    const handleConfirmPassword = (e) => {
        e.preventDefault();
        setPasswrodConfirmValue(e.target.value);
        setPasswordErrorConfirmation(
            e.target.value !== passwordValue || e.target.value.length < 8
        );
    };
    const [isEditprofile, setEditprofile] = React.useState(true);
    const [isChangePassword, setChangePassword] = React.useState(false);
    const [isChangeUsername, setChangeUsername] = React.useState(false);

    const editProfileModeHandler = () => {
        setEditprofile(true);
        setChangePassword(false);
        setChangeUsername(false);
    };
    const changePasswordModeHandler = () => {
        setEditprofile(false);
        setChangePassword(true);
        setChangeUsername(false);
        cancelEditHandler();
    };
    const changeUsernameModeHandler = () => {
        setEditprofile(false);
        setChangePassword(false);
        setChangeUsername(true);
        cancelEditHandler();
    };

    const [isEditMode, setEditMode] = React.useState(false);
    const editModeHandler = () => {
        setEditMode(true);
    };
    const cancelEditHandler = () => {
        setEditMode(false);
    };

    const [show, setShow] = React.useState(false);
    const handleClose = (state) => {
        if (isEditMode) {
            setShow(state);
        }
    };



    const submitButtonPassword = () => {
        setOnSubmitDisabledButton(true);

    };

    const submitButtonUserName = () => {
    
    };
    const submitButtonProfile = async () => {
        setOnSubmitDisabledButton(true);
        let form_data = {};
        if (data.FirstName != firstNameValue){
            form_data = { ...form_data, FirstName: firstNameValue};
        }
        if (data.LastName != lastNameValue){
            form_data = { ...form_data, LastName: lastNameValue};
        }

        try{
            const response = await useEditprofile(form_data);
            console.log(response.status);
            if (response.status >= 200 && response.status < 300) {
              // Successful response (status code 2xx)
              // Redirect to /login
              toast.success("Profile edited successfully!", {
                position: toast.POSITION.TOP_LEFT,
            });
              
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
    // const style = {
    //     control: base => ({
    //       ...base,
    //       border: 0,
          
    //       backgroundColor:"pallate-primary",
    //       // This line disable the blue border
    //       boxShadow: "none"
    //     }),
    //     option: base => ({
    //       ...base,
    //       border: 0,
    //       backgroundColor:"red",
    //       // This line disable the blue border
    //       boxShadow: "none"
    //     })
    //     ,hover=>({

    //     }),
    //     select: base => ({
    //       ...base,
    //       border: 0,
    //       backgroundColor:"blue",
    //       // This line disable the blue border
    //       boxShadow: "none"
    //     }),    
    //   };
    

    return (
        <div>
            <ToastContainer />
                <Card className=" mt-1 m-5 mb-1 rounded-xl md:w-[960px]  sm:w-auto bg-pallate-secondary border-pallate-Third">
                    <div className="grid md:grid-cols-3 md:gap-16 sm:grid-cols-1 gap-4">
                    <Button
                        className={
                            isEditprofile
                            ? "bg-pallate-Third hover:bg-pallate-primary"
                            : "bg-pallate-primary text-pallate-Third hover:text-pallate-primary"
                        }
                        onClick={editProfileModeHandler}
                        disabled={onSubmitDisabledButton}
                        >
                        Edit Profile
                    </Button>
                    <Button
                        className={
                            isChangePassword
                            ? "bg-pallate-Third hover:bg-pallate-primary"
                            : "bg-pallate-primary text-pallate-Third hover:text-pallate-primary"
                        }
                        onClick={changePasswordModeHandler}
                        disabled={onSubmitDisabledButton}
                        >
                        Change Password
                    </Button>
                    {/* <Button
                        className={
                            isChangeUsername
                            ? "bg-pallate-Third hover:bg-pallate-primary"
                            : "bg-pallate-primary text-pallate-Third hover:text-pallate-primary"
                        }
                        onClick={changeUsernameModeHandler}
                        disabled={onSubmitDisabledButton}
                        >
                        Change username
                    </Button> */}
                    <Button className={"bg-pallate-primary text-pallate-Third hover:text-pallate-primary"}
                    disabled={true}
                    >
                        History

                    </Button>
                </div>
                {isEditprofile && (
                    <div className="grid grid-cols-1 gap-4 ">
                        <div className="grid md:grid-cols-2 md:gap-0 sm:grid-cols-1 sm:gap-2">
                            <div className="leftside grid grid-cols-1 gap-9 p-9 justify-center justify-items-center">
                                <div onChange={handleImgValue}
                                type="file"
                                accept="image/*"
                                id="user_avatar"
                                >
                                    <img className="block w-full text-sm text-pallate-Third border border-pallate-Third rounded-lg cursor-pointer bg-pallate-secondary" src={image}  style={{width: "12rem", height: "12rem", borderRadius: "50%"}}/>
                                </div>

                                <div className="w-full">
                                <div className="flex justify-start items-center pl-1 p-4 pb-1 mt-1 text-pallate-Third">
                                        <BsPenFill className="mr-1" />
                                        <label>Bio:</label>
                                    </div>
                                    <Textarea
                                        className="bg-pallate-primary text-pallate-Third placeholder-pallate-Third border-pallate-Third focus:border-pallate-Third resize-none focus:ring-pallate-Third"
                                        rows={5}
                                        placeholder={data && data.Bio != "" ? data.Bio : "bio..."}
                                        maxLength={100}
                                        id="bio"
                                        disabled={!isEditMode}
                                        value={bioValue}
                                        onChange={handleBiochange}
                                    ></Textarea>
                                </div>
                            </div>
                            <div className="rightside grid grid-cols-1 gap-4 p-8">
                                <div>
                                <div className="flex justify-start items-center pl-1 text-pallate-Third">
                                        <BsPersonFill className="mr-1" />
                                        <label>First Name:</label>
                                    </div>
                                    <input
                                        maxLength={50}
                                        type="text"
                                        id="firstname"
                                        className="bg-pallate-primary text-pallate-Third disabled:opacity-80 border-pallate-Third placeholder-pallate-Third text-sm rounded-lg block w-full p-2.5 focus:ring-pallate-Third focus:border-pallate-Third"
                                        // placeholder={data && data.FirstName}
                                        disabled={!isEditMode}
                                        value={firstNameValue}
                                        defaultValue={data && data.FirstName}
                                        onChange={handleFirstNamechange}
                                    />
                                </div>
                                <div>
                                <div className="flex justify-start items-center pl-1 text-pallate-Third">
                                        <BsPersonFill className="mr-1" />
                                        <label>Last Name:</label>
                                    </div>
                                    <input
                                        maxLength={50}
                                        type="text"
                                        id="lastname"
                                        className="bg-pallate-primary text-pallate-Third disabled:opacity-80 border-pallate-Third placeholder-pallate-Third text-sm rounded-lg block w-full p-2.5 focus:ring-pallate-Third focus:border-pallate-Third"
                                        disabled={!isEditMode}
                                        value={lastNameValue}
                                        defaultValue={data && data.LastName}
                                        onChange={handleLastNamechange}
                                    />
                                </div>
                                <div>
                                <div className="flex justify-start items-center pl-1 text-pallate-Third">
                                        <BsEnvelopeFill className="mr-1" />
                                        <label>Email:</label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            maxLength={50}
                                            type="email"
                                            id="email"
                                            className="bg-pallate-secondary text-pallate-Third disabled:opacity-80 border-pallate-Third placeholder-pallate-Third text-sm rounded-lg block w-full p-2.5 focus:ring-pallate-Third focus:border-pallate-Third"
                                            disabled={true}
                                            value={emailValue}
                                            placeholder = {data && data.Email}
                                            onChange={handleEmailchange}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:gap-2 gap-1">
                                    <div className="w-full">
                                    <div className="flex justify-start items-center pl-1 text-pallate-Third">
                                            <BsMapFill className="mr-1" />
                                            <label>Country:</label>
                                        </div>
                                        {/* <div className="w-full"> */}
                                        <Select
                                            // class="w-full md:w-36 bg-pallate-primary text-pallate-Third disabled:opacity-80 border-pallate-Third rounded-lg focus:ring-pallate-Third focus:border-pallate-Third"
                                            disabled={!isEditMode}
                                            id="country"
                                            name="country"
                                            options= {countries && countries.map(country => ({
                                                value: country.country_name,
                                                label: country.country_name,
                                              }))}
                                            value={selectedCountry}
                                            onChange={(selectedCountry) => {
                                                setSelectedCountry(selectedCountry)
                                                setFormData({ ...formDataa, ["country"]:  selectedCountry.value});
                                            }}
                                            isSearchable
                                            placeholder="Select "
                                            required
                                        />
                                        {/* </div> */}
                                            {/* <option selected>{selectedCountry}</option> */}
                                            {/* {countries && countries.map(country => (
                                                <option value = {country.country_name}> {country.country_name}</option>
                                            ))} */}
                                    </div>
                                    <div className="">
                                    <div className="flex justify-start items-center pl-1 text-pallate-Third">
                                            <BsMapFill className="mr-1" />
                                            <label>City:</label>
                                        </div>
                                        <Select
                                            id="city"
                                            name="city"
                                            // class="w-full md:w-36 md:ml-3 bg-pallate-primary text-pallate-Third disabled:opacity-80 border-pallate-Third rounded-lg focus:ring-pallate-Third focus:border-pallate-Third"
                                            disabled={!isEditMode}
                                            options= {states && states.map(state => ({
                                                value: state.state_name,
                                                label: state.state_name,
                                              }))}
                                            value={selectedState}
                                            onChange={(selectedState) => {
                                                setSelectedState(selectedState)
                                                setFormData({ ...formDataa, ["city"]:  selectedState.value});
                                              }}
                                            isSearchable
                                            isDisabled = {selectedCountry == ""}
                                            placeholder="Select city"
                                            required
                                        /> 
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:gap-2 gap-1">
                                    <div className="w-full">
                                    <div className="flex justify-start items-center pl-1 text-pallate-Third">
                                            <BsCalendar className="mr-1" />
                                            <label>Birth Date:</label>
                                        </div>
                                        <div className="relative">
                                        <Select
                                            id="bd"
                                            class="w-full md:w-36  bg-pallate-primary text-pallate-Third disabled:opacity-80 border-pallate-Third rounded-lg focus:ring-pallate-Third focus:border-pallate-Third"
                                            disabled={true}
                                            value={selectedCountry}
                                            onChange={(selectedCountry) => {
                                                setSelectedCountry(selectedCountry)
                                                setFormData({ ...formDataa, ["country"]:  selectedCountry.value});
                                            }}
                                            isSearchable
                                        />
                                    </div>
                                    </div>
                                    <div className="">
                                    <div className="flex justify-start items-center md:pl-3 text-pallate-Third">
                                            <BsGenderAmbiguous className="mr-1" />
                                            <label>Gender:</label>
                                        </div>
                                        <Select
                                            id="gender"
                                            class="w-full md:w-36 md:ml-3 bg-pallate-primary text-pallate-Third disabled:opacity-80 border-pallate-Third rounded-lg focus:ring-pallate-Third focus:border-pallate-Third"
                                            disabled={!isEditMode}
                                            value={genderValue}
                                            onChange={handleGenderchange}
                                        >
                                            {/* <option>Male</option>
                                            <option>Female</option>
                                            <option>Not Selected</option> */}
                                            <option selected> {data && Genderarr[data.Gender]}</option>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 grid-cols-1 justify-center items-center gap-20 pl-9 pr-9">
                            <div className="grid grid-cols-1 gap-4">
                                {!isEditMode && (
                                    <Button
                                        className="bg-yellow-400 hover:bg-yellow-500"
                                        onClick={editModeHandler}
                                    >
                                        <BsPencilSquare />
                                        Edit
                                    </Button>
                                )}
                                {isEditMode && (
                                    <Button
                                        className="bg-red-500 hover:bg-red-600"
                                        onClick={cancelEditHandler}
                                        disabled={onSubmitDisabledButton}
                                    >
                                        <BsXLg />
                                        Cancel
                                    </Button>
                                )}
                                {isEditMode && (
                                    <Button
                                        className="bg-pallate-Third hover:bg-pallate-Third text-4xl"
                                        onClick={submitButtonProfile}
                                        disabled={
                                            onSubmitDisabledButton ||
                                            firstNameValue.length === 0 ||
                                            lastNameValue.length === 0 ||
                                            genderValue === "Not Selected"
                                        }
                                    >
                                        <BsCheckLg />
                                        Submit
                                    </Button>
                                )}
                            </div>
                            {/* {onSubmitDisabledButton && isEditMode && (
                                <Progress
                                    progress={percentDone}
                                    labelProgress={true}
                                    progressLabelPosition="inside"
                                    textLabel="Uploading..."
                                    labelText={true}
                                    textLabelPosition="outside"
                                    color="green"
                                    size="xl"
                                    className="w-full"
                                ></Progress>
                            )} */}
                        </div>
                    </div>
                )}
                {isChangePassword && (
                        <div className="grid grid-cols-1 gap-4 p-8">
                            <div>
                                <div className="flex justify-start items-center pl-1 text-pallate-Third">
                                    <HiLockClosed className="mr-1" />
                                    <label>Current Password:</label>
                                </div>
                                <input
                                    maxLength={50}
                                    type="password"
                                    id="new-password"
                                    className={`bg-pallate-primary disabled:opacity-80 block w-full p-2.5 text-sm rounded-lg ${
                                        passwordErrorCurrent
                                            ? "border-red-500 focus:ring-red-500 focus:border-red-500 "
                                            : "border-pallate-Third  placeholder-pallate-Third  focus:ring-pallate-Third focus:border-pallate-Third"
                                    } `}
                                    placeholder="new passwrord..."
                                    // disabled={!isEditMode}
                                    value={currentPasswrodValue}
                                    onChange={handleCurrentPassswrod}
                                />
                            </div>
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                                <div>
                                    <div className="flex justify-start items-center pl-1 text-pallate-Third">
                                        <HiLockClosed className="mr-1" />

                                        <label>New Password:</label>
                                    </div>
                                    <input
                                        maxLength={50}
                                        type="password"
                                        id="new-password"
                                        className={`bg-pallate-primary disabled:opacity-80 block w-full p-2.5 text-sm rounded-lg ${
                                            passwordErrorConfirmation
                                                ? "border-red-500 focus:ring-red-500 focus:border-red-500 "
                                                : "border-pallate-Third  placeholder-pallate-Third  focus:ring-pallate-Third focus:border-pallate-Third"
                                            } `}
                                        placeholder="new passwrord..."
                                        // disabled={!isEditMode}
                                        value={passwordValue}
                                        onChange={handlePassword}
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-start items-center pl-1 text-pallate-Third">
                                        <HiLockClosed className="mr-1" />
                                        <label>Confirm new Password:</label>
                                    </div>
                                    <input
                                        maxLength={50}
                                        type="password"
                                        id="confirm-new-password"
                                        className={`bg-pallate-primary disabled:opacity-80 block w-full p-2.5 text-sm rounded-lg ${
                                            passwordErrorConfirmation
                                                ? "border-red-500 focus:ring-red-500 focus:border-red-500 "
                                                : "border-pallate-Third  placeholder-pallate-Third  focus:ring-pallate-Third focus:border-pallate-Third"
                                        } `}
                                        placeholder="confirm new passwrord..."
                                        // disabled={!isEditMode}
                                        value={passwordConfirmValue}
                                        onChange={handleConfirmPassword}
                                    />
                                </div>
                            </div>
                            <div className="">
                                <Button
                                    className="w-full bg-pallate-Third hover:bg-gray-600"
                                    disabled={
                                        passwordErrorConfirmation ||
                                        passwordErrorConfirmation ||
                                        currentPasswrodValue.length === 0 ||
                                        passwordConfirmValue.length === 0 ||
                                        passwordValue.length === 0 ||
                                        onSubmitDisabledButton
                                    }
                                    onClick={submitButtonPassword}
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                )}
                {/* {isChangeUsername && (
                        <div className="grid grid-cols-1 gap-4 p-8">
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                                <div>
                                    <div className="flex justify-start items-center pl-1 text-pallate-Third">
                                        <BsPersonFillLock className="mr-1" />
                                        <label>UserName:</label>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <span className="text-pallate-Third">
                                                @
                                            </span>
                                        </div>
                                        <input
                                            maxLength={50}
                                            type="text"
                                            id="username"
                                            className="bg-pallate-primary disabled:opacity-80 disabled:bg-pallate-secondary/[0.8] border text-pallate-Third border-pallate-Third text-sm rounded-lg focus:ring-pallate-Third focus:border-pallate-Third block w-full pl-10 p-2.5 "
                                            placeholder="username"
                                            value={userNameValue}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-start items-center pl-1 text-pallate-Third">
                                        <BsPersonFillLock className="mr-1" />
                                        <label>New UserName:</label>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <span className="text-pallate-Third">
                                                @
                                            </span>
                                        </div>
                                        <input
                                            maxLength={50}
                                            type="text"
                                            id="newusername"
                                            className="bg-pallate-primary disabled:opacity-80 disabled:bg-pallate-secondary/[0.8] border text-pallate-Third border-pallate-Third text-sm rounded-lg focus:ring-pallate-Third focus:border-pallate-Third block w-full pl-10 p-2.5 "
                                            placeholder="New UserName"
                                            value={newUserNameValue}
                                            onChange={(handleNewUsername)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <Button
                                    className="w-full bg-pallate-Third hover:bg-gray-600 disabled:hover:bg-gray-600"
                                    disabled={newUserNameError || newUserNameValue.length ===0 || onSubmitDisabledButton}
                                    onClick={submitButtonUserName}
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                )} */}
            </Card>
        </div>
    );
};

export default EProfilePage;
