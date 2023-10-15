import {Button,Card,Select,Textarea,Progress,} from "flowbite-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {BsPersonFill,BsEnvelopeFill,BsGenderAmbiguous,BsMapFill,BsCalendar,} from "react-icons/bs";

const ProfileForm = () => {
    return (
        <div>
            <Card className="m-5 pl-24 pr-24 mt-32 rounded-xl">
                <div className="grid md:grid-cols-3 md:gap-16 sm:grid-cols-1 gap-4">
                    <Button
                    >
                        Edit Profile
                    </Button>
                    <Button
                    >
                        Change Password
                    </Button>
                    <Button
                    >
                        Change username
                    </Button>
                </div>            
            </Card>
            <Card className=" mt-1 m-5 mb-64 rounded-xl bg-pallate-secondary border-pallate-Third backdrop-blur-sm">
                        <div className="grid grid-cols-1 gap-4 ">
                            <div className="grid md:grid-cols-2 md:gap-0 sm:grid-cols-1 sm:gap-2">
                                <div className="leftside grid grid-cols-1 gap-10 p-8 justify-center justify-items-center">
                                    {/* <Avatar
                                        src={imgValue}
                                        sx={{
                                            width: "12rem",
                                            height: "12rem",
                                        }}
                                    ></Avatar> */}
                                    <div className="flex justify-start items-center">
                                        {/* <input
                                            accept="image/*"
                                            // class="block w-full text-sm text-pallate-persian_green border border-pallate-persian_green rounded-lg cursor-pointer bg-pallate-celeste_light "
                                            id="user_avatar"
                                            type="file"
                                        />
                                        <Button
                                            className="rounded-full ml-2 bg-gray-400 hover:bg-gray-500"
                                            size="md"
                                        >
                                        </Button> */}
                                    </div>
                                    <div className="w-full">
                                        <div className="flex justify-start items-center pl-1 text-gray-700">
                                            <label>Bio:</label>
                                        </div>
                                        <Textarea
                                            className="bg-pallate-primary placeholder-pallate-Third border-pallate-Third focus:border-pallate-Third resize-none focus:ring-pallate-Third"
                                            rows={5}
                                            placeholder="bio..."
                                            maxLength={100}
                                            id="bio"
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

                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2  md:gap-2 gap-1">
                                        <div className="md:w-40 w-full">
                                            <div className="flex justify-start items-center pl-1 text-pallate-Third">
                                                <BsMapFill className="mr-1" />
                                                <label>Country:</label>
                                            </div>
                                            <Select
                                                id="country"
                                                class="w-full md:w-36 bg-pallate-primary text-pallate-Third disabled:opacity-80 border-pallate-Third rounded-lg focus:ring-pallate-Third focus:border-pallate-Third"
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
                                            >
                                                <option>Select</option>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2  md:gap-2 gap-1">
                                        <div className="md:w-40 w-full">
                                            <div className="flex justify-start items-center pl-1 text-pallate-Third">
                                                <BsCalendar className="mr-1" />
                                                <label>Birth Date:</label>
                                            </div>
                                            <DatePicker

                                                showMonthDropdown
                                                showYearDropdown
                                                minDate={new Date("2023-2-10")}
                                                maxDate={new Date()}
                                                dropdownMode="select" 
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
                                        <Button
                                            className="bg-yellow-400 hover:bg-yellow-500"
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            className="bg-red-500 hover:bg-red-600"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            className="bg-pallate-persian_green hover:bg-pallate-blue_munsell text-4xl"

                                        >
                                            Submit
                                        </Button>
                                </div>
                                    <Progress
                                        labelProgress={true}
                                        progressLabelPosition="inside"
                                        textLabel="Uploading..."
                                        labelText={true}
                                        textLabelPosition="outside"
                                        color="green"
                                        size="xl"
                                        className="w-full"
                                    ></Progress>
                            </div>
                        </div>
                    </Card>
        </div>
    );
};

export default ProfileForm;
