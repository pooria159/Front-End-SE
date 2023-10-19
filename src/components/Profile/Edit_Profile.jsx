import React from "react";
import {Button,Card,Select,Textarea,Progress,} from "flowbite-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import image from "../../assets/myl.png";
import {BsPencilSquare,BsPersonFill,BsXLg,BsEnvelopeFill,BsCheckLg,BsPenFill,BsGenderAmbiguous,BsMapFill,BsCalendar,BsPersonFillLock,} from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [onSubmitDisabledButton, setOnSubmitDisabledButton] = React.useState(false);
    const [percentDone, setPercentDone] = React.useState(0);
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


    React.useEffect(() => {
        setFirstNameValue(
            localStorage.getItem("firstname")
                ? localStorage.getItem("firstname")
                : ""
        );
        setLastNameValue(
            localStorage.getItem("lastname")
                ? localStorage.getItem("lastname")
                : ""
        );
        setBioValue(
            localStorage.getItem("bio")!==null ? localStorage.getItem("bio") : ""
        );
        setEmailValue(localStorage.getItem("email"));
        setImgValue(
            localStorage.getItem("avatar")
                ? localStorage.getItem("avatar")
                : null
        );
        console.log(localStorage.getItem(localStorage.getItem("birthdate")));

        if (
            localStorage.getItem("gender") === "true" ||
            localStorage.getItem("gender") === "Male"
        ) {
            setGenderValue("Male");
        } else if (
            localStorage.getItem("gender") === "false" ||
            localStorage.getItem("gender") === "Female"
        ) {
            setGenderValue("Female");
        } else {
            setGenderValue("Not Selected");
        }
        console.log(typeof localStorage.getItem("gender"));
        setUserNameValue(localStorage.getItem("username"));
        setBirthDateValue(
            localStorage.getItem("birthdate")
                ? new Date(localStorage.getItem("birthdate"))
                : new Date("1923-01-01")
        );
        setCountryValue(
            localStorage.getItem("country")
                ? localStorage.getItem("country")
                : "Select"
        );
        setCityValue(
            localStorage.getItem("country") !== "Select"
                ? localStorage.getItem("city")
                    ? localStorage.getItem("city")
                    : "Select"
                : "Select"
        );
        setbirthDateISOValue(
            localStorage.getItem("birthdate")
                ? moment(localStorage.getItem("birthdate")).format("YYYY-MM-DD")
                : ""
        );
    }, []);

    const handleFirstNamechange = (e) => {
        e.preventDefault();
        setFirstNameValue(e.target.value.replace(/[^a-zA-Z]/g, ""));
    };
    const handleLastNamechange = (e) => {
        e.preventDefault();
        setLastNameValue(e.target.value.replace(/[^a-zA-Z]/g, ""));
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
    const handleEmailchange = (event) => {
        setEmailValue(event.target.value);
    };
    const handleBiochange = (event) => {
        setBioValue(event.target.value);
    };
    const handleGenderchange = (event) => {
        setGenderValue(event.target.value);
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
            console.log("got here");
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
        console.log(localStorage.getItem("gender"));
        setFirstNameValue(
            localStorage.getItem("firstname")
                ? localStorage.getItem("firstname")
                : ""
        );
        setLastNameValue(
            localStorage.getItem("lastname")
                ? localStorage.getItem("lastname")
                : ""
        );
        setBioValue(
            localStorage.getItem("bio") ? localStorage.getItem("bio") : ""
        );
        setEmailValue(localStorage.getItem("email"));
        setImgValue(
            localStorage.getItem("avatar")
                ? localStorage.getItem("avatar")
                : null
        );
        console.log(localStorage.getItem("email"));
        if (
            localStorage.getItem("gender") === "true" ||
            localStorage.getItem("gender") === "Male"
        ) {
            setGenderValue("Male");
        } else if (
            localStorage.getItem("gender") === "false" ||
            localStorage.getItem("gender") === "Female"
        ) {
            setGenderValue("Female");
        } else {
            setGenderValue("Not Selected");
        }
        setUserNameValue(localStorage.getItem("username"));
        setBirthDateValue(
            localStorage.getItem("birthdate")
                ? new Date(localStorage.getItem("birthdate"))
                : null
        );
        setCountryValue(
            localStorage.getItem("country")
                ? localStorage.getItem("country")
                : "Select"
        );
        setCityValue(
            localStorage.getItem("country") !== "Select"
                ? localStorage.getItem("city")
                    ? localStorage.getItem("city")
                    : "Select"
                : "Select"
        );
        setbirthDateISOValue(
            localStorage.getItem("birthdate")
                ? moment(localStorage.getItem("birthdate")).format("YYYY-MM-DD")
                : ""
        );
        setImgValue(localStorage.getItem("avatar"));
        setEditMode(false);
    };

    const handleBirthDateChange = (selectedDate) => {
        setBirthDateValue(selectedDate);
        setbirthDateISOValue(moment(selectedDate).format("YYYY-MM-DD"));
        console.log(birthDateISOValue);
    };


    const submitButtonPassword = () => {
        const currentPassword = localStorage.getItem("password");
        const newPassword = passwordValue;
        const newPasswordConfirm = passwordConfirmValue;
        setOnSubmitDisabledButton(true);
        const data = {
            new_password: newPassword,
            re_new_password: newPasswordConfirm,
            current_password: currentPassword,
        };
    };

    const submitButtonUserName = () => {

        const newUserName = newUserNameValue
        const password = localStorage.getItem("password")
        const data = {
            current_password : password,
            new_username: newUserName,
            re_new_username: newUserName
        }
    };
    const submitButtonProfile = () => {
        setOnSubmitDisabledButton(true);
        const gender = genderValue;
        const birthDate = birthDateISOValue.toString();
        const country = countryValue;
        const city = cityValue;
        const avatar = imgValue;
        const bio = bioValue;
        const firstname = firstNameValue;
        const lastname = lastNameValue;
        console.log(birthDate);
    };

    return (
        <div>
            {isEditprofile && (
                <Card className=" mt-1 m-5 mb-auto rounded-xl bg-pallate-secondary border-pallate-Third">
                    <div className="grid md:grid-cols-4 md:gap-16 sm:grid-cols-1 gap-4">
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
                    <Button
                        className={
                            isChangeUsername
                            ? "bg-pallate-Third hover:bg-pallate-primary"
                            : "bg-pallate-primary text-pallate-Third hover:text-pallate-primary"
                        }
                        onClick={changeUsernameModeHandler}
                        disabled={onSubmitDisabledButton}
                    >
                        Change username
                    </Button>
                    <Button className={"bg-pallate-primary text-pallate-Third hover:text-pallate-primary"}
                    disabled={true}
                    >
                        History

                    </Button>
                </div>
                    <div className="grid grid-cols-1 gap-4 ">
                        <div className="grid md:grid-cols-2 md:gap-0 sm:grid-cols-1 sm:gap-2">
                            <div className="leftside grid grid-cols-1 gap-9 p-9 justify-center justify-items-center">
                                {/* <Avatar
                                    src={imgValue}
                                    sx={{
                                        width: "12rem",
                                        height: "12rem",
                                    }}
                                ></Avatar> */}
                                <div onClick={0}
                                >
                                    <img src={image} alt="hot girl" style={{width: "12rem", height: "12rem", borderRadius: "50%"}}/>
                                </div>
                                {isEditMode && (
                                    <div className="flex justify-start items-center">
                                        {/* <input
                                            onChange={handleImgValue}
                                            accept="image/*"
                                            className="block w-full text-sm text-pallate-persian_green border border-pallate-persian_green rounded-lg cursor-pointer bg-pallate-celeste_light "
                                            id="user_avatar"
                                            type="file"
                                        />
                                        <Button
                                            className="rounded-full ml-2 bg-gray-400 hover:bg-gray-500"
                                            size="md"
                                            onClick={handleRemoveImg}
                                        >
                                            <BsXLg />
                                        </Button> */}
                                    </div>
                                )}
                                <div className="w-full">
                                <div className="flex justify-start items-center pl-1 mt-1 text-pallate-Third">
                                        <BsPenFill className="mr-1" />
                                        <label>Bio:</label>
                                    </div>
                                    <Textarea
                                        className="bg-pallate-primary text-pallate-Third placeholder-pallate-Third border-pallate-Third focus:border-pallate-Third resize-none focus:ring-pallate-Third"
                                        rows={5}
                                        placeholder="bio..."
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
                                        placeholder="First Name"
                                        disabled={!isEditMode}
                                        value={firstNameValue}
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
                                        placeholder="Last Name"
                                        disabled={!isEditMode}
                                        value={lastNameValue}
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
                                            className="bg-pallate-primary text-pallate-Third disabled:opacity-80 border-pallate-Third placeholder-pallate-Third text-sm rounded-lg block w-full p-2.5 focus:ring-pallate-Third focus:border-pallate-Third"
                                            placeholder="Email"
                                            disabled={true}
                                            value={emailValue}
                                            onChange={handleEmailchange}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:gap-2 gap-1">
                                    <div className="md:w-40 w-full">
                                    <div className="flex justify-start items-center pl-1 text-pallate-Third">
                                            <BsMapFill className="mr-1" />
                                            <label>Country:</label>
                                        </div>
                                        <Select
                                            id="country"
                                            class="w-full md:w-36 bg-pallate-primary text-pallate-Third disabled:opacity-80 border-pallate-Third rounded-lg focus:ring-pallate-Third focus:border-pallate-Third"
                                            disabled={!isEditMode}
                                            value={countryValue}
                                            onChange={handleCountryChange}
                                        >
                                            <option>Select</option>
                                        </Select>
                                    </div>
                                    <div className="">
                                    <div className="flex justify-start items-center md:pl-5 text-pallate-Third">
                                            <BsMapFill className="mr-1" />
                                            <label>City:</label>
                                        </div>
                                        <Select
                                            id="gender"
                                            class="w-full md:w-36 md:ml-3 bg-pallate-primary text-pallate-Third disabled:opacity-80 border-pallate-Third rounded-lg focus:ring-pallate-Third focus:border-pallate-Third"
                                            disabled={!isEditMode}
                                            value={cityValue}
                                            onChange={handleCityChange}
                                        >
                                            <option>Select</option>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:gap-2 gap-1">
                                    <div className="md:w-40 w-full">
                                    <div className="flex justify-start items-center pl-1 text-pallate-Third">
                                            <BsCalendar className="mr-1" />
                                            <label>Birth Date:</label>
                                        </div>
                                        <DatePicker
                                            selected={
                                                birthDateValue
                                                    ? birthDateValue
                                                    : new Date()
                                            }
                                            onChange={(date) =>
                                                handleBirthDateChange(date)
                                            }
                                            showMonthDropdown
                                            showYearDropdown
                                            minDate={new Date("1923-1-1")}
                                            maxDate={new Date()}
                                            dropdownMode="select"
                                            disabled={!isEditMode}
                                            className="w-full md:w-36 bg-pallate-primary text-pallate-Third disabled:opacity-80 border-pallate-Third rounded-lg focus:ring-pallate-Third focus:border-pallate-Third"
                                        ></DatePicker>
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
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Not Selected</option>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 grid-cols-1 justify-center items-center gap-20 pl-8 pr-8">
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
                                        className="bg-pallate-persian_green hover:bg-pallate-blue_munsell text-4xl"
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
                            {onSubmitDisabledButton && isEditMode && (
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
                            )}
                        </div>
                    </div>
                </Card>
            )}
                {isChangePassword && (
                    <Card className="mt-1 m-5 mb-64 rounded-xl pr-12 pl-12 border-pallate-primary">
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
                                    className={`bg-pallate-secondary disabled:opacity-80 block w-full p-2.5 text-sm rounded-lg ${
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

                                        <label>new Password:</label>
                                    </div>
                                    <input
                                        maxLength={50}
                                        type="password"
                                        id="new-password"
                                        className={`bg-pallate-secondary disabled:opacity-80 block w-full p-2.5 text-sm rounded-lg ${
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
                                        className={`bg-pallate-secondary disabled:opacity-80 block w-full p-2.5 text-sm rounded-lg ${
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
                    </Card>
                )}
                {isChangeUsername && (
                    <Card className="mt-1 m-5 mb-64 pr-12 pl-12 rounded-xl border-pallate-Third">
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
                                            className="bg-pallate-secondary disabled:opacity-80 disabled:bg-pallate-secondary/[0.8] border text-pallate-Third border-pallate-Third text-sm rounded-lg focus:ring-pallate-Third focus:border-pallate-Third block w-full pl-10 p-2.5 "
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
                                            className="bg-pallate-secondary disabled:opacity-80 disabled:bg-pallate-secondary/[0.8] border text-pallate-Third border-pallate-Third text-sm rounded-lg focus:ring-pallate-Third focus:border-pallate-Third block w-full pl-10 p-2.5 "
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
                    </Card>
                )}
        </div>
    );
};

export default ProfilePage;
