import React,{useState, useEffect} from "react";
import MyCard from "./MyCard";

const cardData = [
    {
        "PreferredLanguages" : ["English", "Persian"],
        "DestinationState" : "Tehran",
        "DestinationCity" : "Tehran",
        "DestinationCountry" : "Iran",
        "StartDate" : "2023-10-2",
        "EndDate" : "2023-10-5",
        "Description" : "This is my description"
    },
    {
        "PreferredLanguages" : ["English", "Persian"],
        "DestinationState" : "Tehran",
        "DestinationCity" : "Tehran",
        "DestinationCountry" : "Iran",
        "StartDate" : "2023-10-2",
        "EndDate" : "2023-10-5",
        "Description" : "This is my description"
    },
    {
        "PreferredLanguages" : ["English", "Persian"],
        "DestinationState" : "Tehran",
        "DestinationCity" : "Tehran",
        "DestinationCountry" : "Iran",
        "StartDate" : "2023-10-2",
        "EndDate" : "2023-10-5",
        "Description" : "This is my description"
    },
    {
        "PreferredLanguages" : ["English", "Persian"],
        "DestinationState" : "Tehran",
        "DestinationCity" : "Tehran",
        "DestinationCountry" : "Iran",
        "StartDate" : "2023-10-2",
        "EndDate" : "2023-10-5",
        "Description" : "This is my description"
    },
]



const MyAnncSec = () => {
    return(
        <div>
            <div className="flex flex-wrap justify-center items-center">
                {cardData && cardData.map((data, index) => {
                    return <MyCard key={index} data ={data} />
                })}  
            </div>
        </div>
    );
}


export default MyAnncSec;