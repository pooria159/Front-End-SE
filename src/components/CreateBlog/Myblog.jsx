import { React, useEffect, useState } from "react";
import { MdOutlineSubtitles, MdAddPhotoAlternate } from "react-icons/md";
import { GiJourney } from "react-icons/gi";
import { FaStar } from "react-icons/fa";
import image from "../../assets/fall.jpg";
import usepostblog from "../../hooks/usepostblog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faFlag,
  faCalendarAlt,
  faEdit,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
import BlogEditModal from "./BlogEditModal.jsx";
import { useMyBlog } from "../../hooks/useMyBlog.js";

import defaultProfilePic from "../../assets/defaultUserPic.png";
import { Avatar } from '@mui/material';

// import { useDeleteMyBlog } from "../../hooks/useDeleteMyBlog";

const BlogCard = ({ data, fetchData }) => {
  const [offersData, setOffersData] = useState(null);
  const [isEditBlogModalOpen, setISEditBlogModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  // const fetchDelete = async (blogId) => {
  //   const response = await useDeleteMyBlog(blogId);
  //   if (response.status >= 200 && response.status < 300) {
  //     toast.success("The blog has deleted successfully!");
  //   } else {
  //     toast.error(response.data["message"]);
  //   }
  //   await fetchData();
  // }



  // const fetchAllBlog = async (Id) => {
  //   try {
  //     const response = await useMyBlog();
  //     console.log("Ya Allah :")
  //     console.log(response.data);
  //     return response;
  //   } catch (error) {
  //     console.log("running into errors: ", error);
  //     throw error;
  //   }
  // };

  // useEffect(() => {
  //   fetchAllBlog(data.HostId);
  // }, []);

  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = defaultProfilePic;
  }

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-1  md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
      <div className="w-full h-full lg:max-w-full lg:flex">
        <div
          className="h-80 lg:h-96  lg:w-96 md:h-96 flex-none bg-cover lg:rounded-r-none rounded-t-xl lg:rounded-xl text-center"
          style={{ backgroundImage: `url(${data.PostImage})` }}
        ></div>
        <div className="border-r xl:w-[1000px] lg:w-[500px] sm:w-96 border-b border-l bg-indigo-50 border-gray-400 lg:border-l-0 lg:border-t  lg:border-gray-400 rounded-b-xl lg:rounded-b-none lg:rounded-r-xl p-4 flex flex-col justify-between leading-normal">


          <div className="w-full">
            <div className="text-lg text-gray-600 grow w-full flex justify-end pr-5 pt-2">

            </div>
            <p className="text-lg  text-gray-600 flex items-center  ">
              Rate:
              {Array.from({ length: data.HostRating }).map((_, index) => (
                <FaStar className="ml-1 text-yellow-300 text-xl" key={index} />
              ))}
            </p>
            <div className="text-gray-900 font-bold text-xl mb-2">
              {data.PostTitle}
            </div>
            <p className="text-gray-700 text-base justify-center items-center whitespace-normal my-5 ">
              {data.PostBody}
            </p>
          </div>
          <div className="flex space-x-2 sm:space-x-10">
            <div className="flex items-center">
              {/* <img
                className="w-10 h-10 rounded-full mr-1"
                onerror = {handleError}
                src={data.HostImage}
                alt="Avatar of Writer"
              /> */}
              
              <Avatar
                src={data && data.HostImage}
                sx={{ width: '4rem', height: '4rem', marginRight: 0.5}}
              />

              <div className="text-sm">
                <p className="text-gray-900 leading-none">
                  {data.HostUsername}
                </p>
                <p className="text-gray-600">Host</p>
              </div>
            </div>
            <div className="flex items-center">
              {/* <img
                className="w-10 h-10 rounded-full mr-1"
                src={data.GuestImage}
                onerror = {handleError}
                alt="Avatar of Host"
              /> */}
              <Avatar
                src={data && data.GuestImage}
                sx={{ width: '4rem', height: '4rem', marginRight: 0.5}}
              />
              <div className="text-sm">
                <p className="text-gray-900 leading-none">
                  {data.GuestUsername}
                </p>
                <p className="text-gray-600">Guest</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogCard;
