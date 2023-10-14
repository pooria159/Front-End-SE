import {Button,Card,Select,Textarea,Progress,} from "flowbite-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProfileForm = () => {
    return (
        <div>
            <Card className="m-5 pl-24 pr-24 mt-32 rounded-xl backdrop-blur-sm ">
                <div className="grid md:grid-cols-3 md:gap-16 sm:grid-cols-1 gap-4 ">
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
            <Card className=" mt-1 m-5 mb-64 rounded-xl  card-bg border-pallate-persian_green backdrop-blur-sm">
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
                                        <input
                                            accept="image/*"
                                            // class="block w-full text-sm text-pallate-persian_green border border-pallate-persian_green rounded-lg cursor-pointer bg-pallate-celeste_light "
                                            id="user_avatar"
                                            type="file"
                                        />
                                        <Button
                                            className="rounded-full ml-2 bg-gray-400 hover:bg-gray-500"
                                            size="md"
                                        >
                                        </Button>
                                    </div>
                                    <div className="w-full">
                                        <div className="flex justify-start items-center pl-1 text-gray-700">
                                            <label>Bio:</label>
                                        </div>
                                        <Textarea
                                            className="bg-pallate-celeste_light placeholder-pallate-persian_green  border-pallate-persian_green focus:border-pallate-persian_green resize-none focus:ring-pallate-persian_green"
                                            rows={5}
                                            placeholder="bio..."
                                            maxLength={100}
                                            id="bio"
                                        ></Textarea>
                                    </div>
                                </div>
                                <div className="rightside grid grid-cols-1 gap-4 p-8">
                                    <div>
                                        <div className="flex justify-start items-center pl-1 text-gray-700">
                                            <label>First Name:</label>
                                        </div>
                                        <input
                                            maxLength={50}
                                            type="text"
                                            id="firstname"
                                            // class="bg-pallate-celeste_light disabled:opacity-80 border-pallate-persian_green   placeholder-pallate-persian_green  text-sm rounded-lg focus:ring-pallate-persian_green focus:border-pallate-persian_green block w-full p-2.5"
                                            placeholder="First Name..."
                                        />
                                    </div>
                                    <div>
                                        <div className="flex justify-start items-center pl-1 text-gray-700">
                                            <label>Last Name:</label>
                                        </div>
                                        <input
                                            maxLength={50}
                                            type="text"
                                            id="lastname"
                                            // class="bg-pallate-celeste_light disabled:opacity-80 border-pallate-persian_green   placeholder-pallate-persian_green  text-sm rounded-lg focus:ring-pallate-persian_green focus:border-pallate-persian_green block w-full p-2.5"
                                            placeholder="Last Name..."
                                        />
                                    </div>
                                    <div>
                                        <div className="flex justify-start items-center pl-1 text-gray-700">
                                            <label>Email:</label>
                                        </div>
                                        <div className="relative">
                                            <input
                                                maxLength={50}
                                                type="email"
                                                id="email"
                                                // class="bg-pallate-celeste_light border disabled:opacity-80 placeholder-pallate-persian_green border-pallate-persian_green  text-sm rounded-lg focus:ring-pallate-persian_green focus:border-pallate-persian_green block w-full  p-2.5 "
                                                placeholder="Email"
                                                disabled={true}

                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2  md:gap-2 gap-1">
                                        <div className="md:w-40 w-full">
                                            <div className="flex justify-start items-center pl-1 text-gray-700">
                                                <label>Country:</label>
                                            </div>
                                            <Select
                                                id="country"
                                                class="w-full md:w-36 border-pallate-persian_green disabled:opacity-80 rounded-lg  bg-pallate-celeste_light focus:ring-pallate-persian_green focus:border-pallate-persian_green"
                                            >
                                                <option>Select</option>
                                            </Select>
                                        </div>
                                        <div className="">
                                            <div className="flex justify-start items-center pl-1 text-gray-700">
                                                <label>City:</label>
                                            </div>
                                            <Select
                                                id="gender"
                                                class="w-full md:w-36 border-pallate-persian_green disabled:opacity-80 rounded-lg  bg-pallate-celeste_light focus:ring-pallate-persian_green focus:border-pallate-persian_green"
                                            >
                                                <option>Select</option>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2  md:gap-2 gap-1">
                                        <div className="md:w-40 w-full">
                                            <div className="flex justify-start items-center pl-1 text-gray-700">
                                                <label>Birth Date:</label>
                                            </div>
                                            <DatePicker

                                                showMonthDropdown
                                                showYearDropdown
                                                minDate={new Date("1923-1-1")}
                                                maxDate={new Date()}
                                                dropdownMode="select"
                                                className="bg-pallate-celeste_light border-pallate-persian_green w-full md:w-36 rounded-lg disabled:opacity-80"
                                            ></DatePicker>
                                        </div>
                                        <div className="">
                                            <div className="flex justify-start items-center pl-1 text-gray-700">
                                                <label>Gender:</label>
                                            </div>
                                            <Select
                                                id="gender"
                                                class="w-full md:w-36 border-pallate-persian_green disabled:opacity-80 rounded-lg  bg-pallate-celeste_light focus:ring-pallate-persian_green focus:border-pallate-persian_green"

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
