import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Imageval from "../../assets/pic2.jpg";
import test from "../../assets/prof.jpg";
import { useProfile } from "../../hooks/useProfile";
import {
  BsEnvelopeFill,
  BsPenFill,
  BsGenderAmbiguous,
  BsCalendar,
} from "react-icons/bs";
import { MdLocationPin, MdOutlineVerified } from "react-icons/md";

const PublicProfile = () => {
  const params = useParams();
  const [data, setData] = React.useState(null);
  const Genderarr = ["", "Male", "Female", "Other"];


  useEffect(() => {
    const fetch = async () => {
      const res = await useProfile();
      setData(res.data);
    };
    fetch();
  }, []);

  return (
    <div
      className="bg-gradient-to-r from-indigo-100 to-indigo-800 font-sans antialiased text-gray-900  tracking-wider  overflow-hidden flex justify-center h-screen"
      
    >
      <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-20 lg:my-0" >
        {" "}
        <div
          id="profile"
          className="lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
        >
          <div className="p-4 md:p-6 text-center lg:text-left">
            <div
              className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${data && data.image})` }}
            ></div>
            <h1 className="text-3xl font-bold pt-8 lg:pt-0">
              {data && data.FirstName} {data && data.LastName}
            </h1>
            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-pallate-secondary opacity-25"></div>
            <p className="pt-4 text-base flex items-center justify-center lg:justify-start">
              <div className="h-4 text-pallate-secondary flex items-center mr-1.5">
                <MdLocationPin className="text-2xl" />
              </div>
              {data && data.Country},{data && data.State},{data && data.City}
            </p>
            <p className="pt-2 text-base flex items-center justify-center lg:justify-start">
              <div className="h-4 text-pallate-secondary flex items-center mr-2">
                <BsEnvelopeFill className="text-xl ml-1" />
              </div>
              {data && data.Email}
            </p>
            <p className="pt-2 text-base flex items-center justify-center lg:justify-start">
              <div className="h-4 text-pallate-secondary flex items-center mr-2">
                <BsCalendar className="text-xl ml-1" />
              </div>
              {data && data.BirthDate}
            </p>
            <p className="pt-2 text-base flex items-center justify-center lg:justify-start">
              <div className="h-4 text-pallate-secondary flex items-center mr-2">
                <BsGenderAmbiguous className="text-xl ml-1" />
              </div>
              {data && Genderarr[data.Gender]}
            </p>
            <p className="pt-2 text-base flex items-center justify-center lg:justify-start">
              <div className="h-4 text-pallate-secondary flex items-center mr-2">
                <MdOutlineVerified className="text-xl ml-1" />
              </div>
              {data && data.JoiningDate}
            </p>

            <p className="pt-8 text-base flex items-center justify-center lg:justify-start">
              <div className="h-4 text-pallate-secondary flex items-center mr-2">
                <BsPenFill className="text-xl ml-1" />
              </div>
              {data && data.Bio}
            </p>
          </div>
        </div>
        <div className="w-full lg:w-2/5">
          <img
            src={data && data.image}
            className="h-2/3 w-3/4 rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
          ></img>
        </div>
      </div>
    </div>
  );
};
export default PublicProfile;
