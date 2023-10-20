import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {Card,} from "flowbite-react";
import "react-datepicker/dist/react-datepicker.css";
import image from "../../assets/myl.png";
import {BsPersonFill,BsEnvelopeFill,BsPenFill,BsGenderAmbiguous,BsMapFill,BsCalendar,} from "react-icons/bs";
import axios from "axios";



const ProfilePage = () => {
    const params = useParams();
    const [loading, setLoading] = React.useState(undefined);
    const [completed, setCompleted] = React.useState(undefined);
    const [data , setData] = React.useState(undefined);
    useEffect (() => {
        console.log(params.id);
        const baseURL = `Link${params.id}`
        console.log(baseURL);
        setTimeout(() => {
            axios.get(baseURL, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                const raw = res.data
                setData({
                    Email: raw.Email,
                    FirstName: raw.FirstName,
                    LastName: raw.LastName,
                    City: raw.City,
                    Bio: raw.Bio,
                    Country: raw.Country,
                    BirthDate: raw.BirthDate,
                    Gender: raw.Gender,
                })
                console.log(data);
                setLoading(true);
            }).catch(err => {
                console.log(err.message);
            })
            setTimeout(() => {
                setCompleted(true);
            }, 2000);
        }, 2000);
    } , []);

    return (
        <div>
                <Card className=" mt-1 m-5 mb-auto rounded-xl bg-pallate-secondary border-pallate-Third">
                    <div className="grid grid-cols-1 gap-4 ">
                        <div className="grid md:grid-cols-2 md:gap-0 sm:grid-cols-1 sm:gap-2">
                            <div className="leftside grid grid-cols-1 gap-9 p-9 justify-center justify-items-center">
                                <img className="block w-full text-sm text-pallate-Third border border-pallate-Third rounded-lg cursor-pointer bg-pallate-secondary" src={image}  style={{width: "12rem", height: "12rem", borderRadius: "50%"}}/>

                                <div className="w-full">
                                <div className="flex justify-start items-center pl-1 p-4 pb-1 mt-1 text-pallate-Third">
                                        <BsPenFill className="mr-1" />
                                        <label>Bio:</label>
                                    </div>
                                    <p></p>
                                </div>
                            </div>
                            <div className="rightside grid grid-cols-1 gap-4 p-8">
                                <div>
                                <div className="flex justify-start items-center pl-1 text-pallate-Third">
                                        <BsPersonFill className="mr-1" />
                                        <label>First Name:</label>
                                    </div>
                                </div>
                                <div>
                                <div className="flex justify-start items-center pl-1 text-pallate-Third">
                                        <BsPersonFill className="mr-1" />
                                        <label>Last Name:</label>
                                    </div>
                                </div>
                                <div>
                                <div className="flex justify-start items-center pl-1 text-pallate-Third">
                                        <BsEnvelopeFill className="mr-1" />
                                        <label>Email:</label>
                                    </div>
                                    <div className="relative">
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:gap-2 gap-1">
                                    <div className="md:w-40 w-full">
                                    <div className="flex justify-start items-center pl-1 text-pallate-Third">
                                            <BsMapFill className="mr-1" />
                                            <label>Country:</label>
                                        </div>
                                    </div>
                                    <div className="">
                                    <div className="flex justify-start items-center md:pl-5 text-pallate-Third">
                                            <BsMapFill className="mr-1" />
                                            <label>City:</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:gap-2 gap-1">
                                    <div className="md:w-40 w-full">
                                    <div className="flex justify-start items-center pl-1 text-pallate-Third">
                                            <BsCalendar className="mr-1" />
                                            <label>Birth Date:</label>
                                        </div>

                                    </div>
                                    <div className="">
                                    <div className="flex justify-start items-center md:pl-3 text-pallate-Third">
                                            <BsGenderAmbiguous className="mr-1" />
                                            <label>Gender:</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </Card>
        </div>
    );
};

export default ProfilePage;
