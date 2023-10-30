import React,{useState, useEffect, Fragment} from "react";
import {Button,Card,Textarea,} from "flowbite-react";
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import image from "../../assets/person.png";
import {BsPencilSquare,BsPersonFill,BsCameraFill,BsXLg,BsEnvelopeFill,BsCheckLg,BsPenFill,BsGenderAmbiguous,BsMapFill,BsCalendar,} from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { FiCameraOff } from "react-icons/fi";
import useEditprofile from "../../hooks/useEditProfile.js"
import { useProfile } from "../../hooks/useProfile";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCityCountry } from "../../hooks/useCityCountry"
import Modal from "./Modal";


const EProfilePage = () => {
    const [onSubmitDisabledButton, setOnSubmitDisabledButton] = React.useState(false);
    const [firstNameValue, setFirstNameValue] = React.useState("");
    const [lastNameValue, setLastNameValue] = React.useState("");
    const [emailValue, setEmailValue] = React.useState("");
    const [birthDateValue, setBirthDateValue] = React.useState("");
    const [genderValue, setGenderValue] = React.useState("");
    const [bioValue, setBioValue] = React.useState("");
    const [passwordValue, setPasswordValue] = React.useState("");
    const [passwordConfirmValue, setPasswrodConfirmValue] = React.useState("");
    const [currentPasswrodValue, setCurrentPasswrodValue] = React.useState("");
    const [countryValue, setCountryValue] = React.useState("");
    const [cityValue, setCityValue] = React.useState("");
    const [imgValue, setImgValue] = React.useState("");
    const [passwordErrorConfirmation, setPasswordErrorConfirmation] =React.useState(false);
    const [passwordErrorCurrent] = React.useState(false);
    const [isEditprofile, setEditprofile] = React.useState(true);
    const [isChangePassword, setChangePassword] = React.useState(false);
    const [isEditMode, setEditMode] = React.useState(false);
    const [countries, setCountries] = useState(null);
    const [states, setStates] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [formDataa, setFormData] = useState({});
    const [data , setData] = React.useState(null);
    const [showModal , setShowModal] = useState(false);
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
            setBioValue(res.data.Bio);
            setCityValue(res.data.City);
            setCountryValue(res.data.Country);
            setSelectedCountry({"value" : res.data.Country, "label" : res.data.Country });
            setSelectedState({"value" : res.data.City, "label" : res.data.City });
            setCurrentPasswrodValue(res.data.currentpasswrod);
            setPasswordValue(res.data.newpassword);
        }
        fetch();
    } , []);

    useEffect(() => {
        const fetch = async () => {
          const response = await useCityCountry("country");
          let obj = [];
          for (var item in response){
            obj.push({"value" : response[item]["country_name"], "label" : response[item]["country_name"]});
          }
          setCountries(obj);
        }
        fetch();
      }, []);
  
      useEffect(() => {
        const fetch = async () => {
          const response = await useCityCountry("state", selectedCountry.value);
          let obj_city = [];
          for (var item_city in response){
            obj_city.push({"value" : response[item_city]["state_name"], "label" : response[item_city]["state_name"]});
          }
          setStates(obj_city);
        }
        fetch();
      }, [selectedCountry]);

    const handleFirstNamechange = (e) => {
        e.preventDefault();
        setFirstNameValue(e.target.value.replace(/[^a-zA-Z]/g, ""));
    };
    const handleLastNamechange = (e) => {
        e.preventDefault();
        setLastNameValue(e.target.value.replace(/[^a-zA-Z]/g, ""));
    };
    const handleEmailchange = (event) => {
        setEmailValue(event.target.value);
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
    };
    const handleImgValue = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImgValue(reader.result);
        };
        reader.readAsDataURL(file);
    };
    const handleRemoveImg = (e) => {
        setImgValue("");
        document.getElementById('user_avatar').value = null;
    };
    const handlePassword = (e) => {
        e.preventDefault();
        setPasswordValue(e.target.value);
        setPasswordErrorConfirmation(e.target.value !== passwordConfirmValue);
    };
    const handleConfirmPassword = (e) => {
        e.preventDefault();
        setPasswrodConfirmValue(e.target.value);
        setPasswordErrorConfirmation(e.target.value !== passwordValue);
    };
    const editProfileModeHandler = () => {
        setEditprofile(true);
        setChangePassword(false);
    };
    const changePasswordModeHandler = () => {
        setEditprofile(false);
        setChangePassword(true);
        cancelEditHandler();
    };
    const editModeHandler = () => {
        setEditMode(true);
    };
    const cancelEditHandler = () => {
        setEditMode(false);
    };


    const submitButtonPassword = async () => {
        setOnSubmitDisabledButton(true);
        let form_password = {};
        if ((passwordValue == passwordConfirmValue)){
            form_password = { currentpassword: currentPasswrodValue,newpassword: passwordValue};
        }
        try{
            const response = await useEditprofile(form_password);
            console.log(response.status);
            if (response.status >= 200 && response.status < 300) {
              toast.success("Password changed successfully!", {
                position: toast.POSITION.TOP_LEFT,
            });
              
            } else{
                toast.error("password are not correct!", {
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

    const submitButtonProfile = async () => {
        setOnSubmitDisabledButton(true);
        let form_data = {};
        if (data.FirstName != firstNameValue){
            form_data = { ...form_data, FirstName: firstNameValue};
        }
        if (data.LastName != lastNameValue){
            form_data = { ...form_data, LastName: lastNameValue};
        }
        if (data.Country != selectedCountry["value"]){
            form_data = { ...form_data, Country: selectedCountry["value"]};
        }
        if (data.City != selectedState["value"]){
            form_data = { ...form_data, City: selectedState["value"]};
        }
        // if (data.img === null || data.img === ""){
        //     setImgValue(image);
        //     uploadIMG(imgValue);
        // }else{
        //     form_data = { ...form_data, Img: imgValue}; 
        // }
        form_data = { ...form_data, Bio: bioValue};

        try{
            const response = await useEditprofile(form_data);
            console.log(response.status);
            if (response.status >= 200 && response.status < 300) {
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


    const style = {
        control: (base, state) => ({
          ...base,
          backgroundColor:"#EBE4D1",
          borderRadius: "8px",
          border : "none",
          outline: "0.5px solid #26577C",
          opacity: state.isDisabled ? 0.8 : 1,

        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused ? "#26577C" : "#EBE4D1",
          color: state.isFocused ? "#EBE4D1" : "#26577C",
          
        }),   
        input3: base => ({
            ...base,
            border: "none",
          }),
          valueContainer: (base) => ({
            ...base,
            fontSize: '14px'
          }),
          singleValue: base => ({
            ...base,
            color: "#26577C",
          }), 
      };

      const disstyle = {
        control: base => ({
          ...base,
          backgroundColor:"#B4B4B3",
          borderRadius: "8px",
          border : "none",
          outline: "0.5px solid #26577C",

        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused ? "#26577C" : "#B4B4B3",
          color: state.isFocused ? "#B4B4B3" : "#26577C",
          
        }),   
        input3: base => ({
            ...base,
            border: "none",
          }),
          valueContainer: (base) => ({
            ...base,
            fontSize: '14px'
          }),
          singleValue: base => ({
            ...base,
            color: "#26577C",
          }), 
      };
      
    return (
        <div>
            <ToastContainer />
                <Card className=" mt-1 m-8 mb-8 rounded-xl md:w-[960px]  sm:w-auto bg-pallate-secondary border-pallate-Third">
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
                                <div className="relative w-52 h-52">
                                    <img className="block w-full text-sm text-pallate-Third border border-pallate-Third rounded-lg cursor-pointer bg-pallate-secondary" src={imgValue} style={{width: "14rem", height: "13rem", borderRadius: "50%"}}/>
                                    <input type="file" accept="image/*" id="user_avatar" className="hidden" onChange={handleImgValue}/>
                                    {isEditMode && !imgValue && <div className={`absolute inset-0 flex items-center justify-center w-full h-full rounded-full bg-pallate-Third bg-opacity-0 hover:bg-opacity-30 transition-all duration-500 ease-in-out cursor-pointer`} onClick={() => document.getElementById('user_avatar').click()}>
                                        <BsCameraFill className='opacity-0 hover:opacity-100 transition-opacity duration-500 items-center text-pallate-Third/[0.8] text-6xl'/>
                                    </div>}
                                    {isEditMode && imgValue && <div className={`absolute inset-0 flex items-center justify-center w-full h-full rounded-full bg-pallate-Third bg-opacity-0 hover:bg-opacity-30 transition-all duration-500 ease-in-out cursor-pointer`} onClick={handleRemoveImg}>
                                        <FiCameraOff className='opacity-0 hover:opacity-100 transition-opacity duration-500 items-center text-pallate-Third/[0.8] text-6xl'/>
                                    </div>}
                                </div>
                            <div className="w-full">
                                <div className="flex justify-start items-center pl-1 p-4 pb-1 mt-1 text-pallate-Third">
                                        <BsPenFill className="mr-1" />
                                        <label>Bio:</label>
                                    </div>
                                    <Textarea
                                        className="bg-pallate-primary text-pallate-Third text-sm placeholder-pallate-Third disabled:opacity-80 border-pallate-Third focus:border-pallate-Third resize-none focus:ring-pallate-Third"
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
                                        <Select
                                            id="country"
                                            name="country"
                                            isDisabled={!isEditMode}
                                            options= {countries && countries}
                                            value={selectedCountry}
                                            onChange={(selectedCountry) => {
                                                setSelectedCountry(selectedCountry)
                                                setFormData({ ...formDataa, ["country"]:  selectedCountry.value});
                                            }}
                                            isSearchable
                                            required
                                            styles={style}
                                        />
                                    </div>
                                    <div className="">
                                    <div className="flex justify-start items-center pl-1 text-pallate-Third">
                                            <BsMapFill className="mr-1" />
                                            <label>City:</label>
                                        </div>
                                        <Select
                                            id="city"
                                            name="city"
                                            options= {states && states}
                                            value={selectedState}
                                            onChange={(selectedState) => {
                                                setSelectedState(selectedState)
                                                setFormData({ ...formDataa, ["city"]:  selectedState.value});
                                              }}
                                            isSearchable
                                            isDisabled = {selectedCountry == "" || !isEditMode}
                                            required
                                            styles={style}

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
                                            isDisabled={true}
                                            value={birthDateValue}
                                            placeholder = {data && data.BirthDate}
                                            isSearchable
                                            styles={disstyle}
                                        />
                                    </div>
                                    </div>
                                    <div className="">
                                    <div className="flex justify-start items-center  text-pallate-Third">
                                            <BsGenderAmbiguous className="mr-1" />
                                            <label>Gender:</label>
                                        </div>
                                        <Select
                                            id="gender"
                                            isDisabled={true}
                                            value={genderValue}
                                            onChange={handleGenderchange}
                                            styles={disstyle}
                                            placeholder={data && Genderarr[data.Gender]}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Fragment>
                        <div className="grid md:grid-cols-2 grid-cols-1 justify-center items-center gap-20 pl-9 pr-9">
                            <div className="grid grid-cols-2 gap-4">
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
                                            onSubmitDisabledButton || firstNameValue.length === 0 || lastNameValue.length === 0                                         
                                        }
                                    >
                                        <BsCheckLg />
                                        Submit
                                    </Button>
                                )}
                            </div>
                            <Button className="bg-pallate-Third w-full hover:bg-pallate-Third text-4xl" onClick={ () => setShowModal(true)}>
                                        <BsPencilSquare />
                                        Create Card
                            </Button>
                        </div>
                        <Modal isVisible={showModal} onClose={() => setShowModal(false)}/>
                        </Fragment>
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
                                    placeholder="current passwrord"
                                    onChange={handleCurrentPassswrod}
                                />
                            </div>
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                                <div>
                                    <div className="flex justify-start items-center pl-1 text-pallate-Third">
                                        <HiLockClosed className="mr-1"/>
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
                                        placeholder="new passwrord"
                                        value={passwordValue}
                                        onChange={handlePassword}
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-start items-center pl-1 text-pallate-Third">
                                        <HiLockClosed className="mr-1"/>
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
                                        placeholder="confirm new passwrord"
                                        value={passwordConfirmValue}
                                        onChange={handleConfirmPassword}
                                    />
                                </div>
                            </div>
                            <div className="">
                                <Button
                                    className="w-full bg-pallate-Third hover:bg-gray-600"
                                    disabled={onSubmitDisabledButton}
                                    onClick={submitButtonPassword}
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                )}
            </Card>
        </div>
    );
};
export default EProfilePage;
