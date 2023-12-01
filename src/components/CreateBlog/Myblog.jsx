import { React, useEffect, useState } from "react";
import { MdOutlineSubtitles, MdAddPhotoAlternate } from "react-icons/md";
import { GiJourney } from "react-icons/gi";
import { FaStar } from "react-icons/fa";
import image from "../../assets/fall.jpg";
import usepostblog from "../../hooks/usepostblog";

const BlogCard = ({data}) => {
  const [offersData, setOffersData] = useState(null);

  const fetchAllBlog = async (Id) => {
    console.log("fetching blog card for id: ", Id);
    let form = { HostId : data.HostId };
    try {
      const response = await usepostblog(form);
      console.log(response.data);
      return response;
    } catch (error) {
      console.log("running into errors: ", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchAllBlog(data.HostId);
  }, []);
  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-1  md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-5">
      <div className="w-full lg:max-w-full lg:flex">
        <div
          className="h-80 lg:h-96  lg:w-96 md:h-96 flex-none bg-cover lg:rounded-r-none rounded-t-xl lg:rounded-xl text-center"
          style={{ backgroundImage: `url(${data.PostImage})` }}
        ></div>
        <div className="border-r border-b border-l bg-indigo-50 border-gray-400 lg:border-l-0 lg:border-t  lg:border-gray-400 rounded-b-xl lg:rounded-b-none lg:rounded-r-xl p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <p className="text-lg  text-gray-600 flex items-center ">
              Rate:
              {Array.from({ length: HostRating }).map((_, index) => (
                <FaStar className="ml-1 text-yellow-300 text-xl" key={index} />
              ))}
            </p>
            <div className="text-gray-900 font-bold text-xl mb-2">
              {data.PostTitle}
            </div>
            <p className="text-gray-700 text-base">
              {PostBody}
            </p>
          </div>
          <div className="flex space-x-20 sm:space-x-36">
            <div className="flex items-center">
              <img
                className="w-10 h-10 rounded-full mr-4"
                src={data.HostImage}
                alt="Avatar of Writer"
              />
              <div className="text-sm">
                <p className="text-gray-900 leading-none">{data.HostUsername}</p>
                <p className="text-gray-600">Host</p>
              </div>
            </div>
            <div className="flex items-center">
              <img
                className="w-10 h-10 rounded-full mr-4"
                src={data.GuestImage}
                alt="Avatar of Host"
              />
              <div className="text-sm">
                <p className="text-gray-900 leading-none">{data.GuestUsername}</p>
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
