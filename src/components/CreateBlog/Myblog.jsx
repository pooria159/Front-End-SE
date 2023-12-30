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

  const handleDelete = () => {
    fetchDelete(data.BlogId);
  }

  const DeleteModal = () => {
    return (
      <div
        className="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
            onClick={() => setShowDeleteModal(false)}
          ></div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    Confirm Deletion
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this item? This action
                      cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Edit_Icon = () => {
    return (
      <div
        className="text-gray-500 w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center hover:bg-gray-200 hover:cursor-pointer"
        onClick={() => {
          setISEditBlogModalOpen(true);
        }}
      >
        <FontAwesomeIcon icon={faEdit} />
      </div>
    );
  };
  const Delete_Icon = () => {
    return (
      <div
        className="text-gray-500 w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center hover:bg-gray-200 hover:cursor-pointer"
        onClick={() => {
          setShowDeleteModal(true);
        }}
      >
        <FontAwesomeIcon icon={faRemove} />
      </div>
    );
  };

  const fetchAllBlog = async (Id) => {
    let form = { HostId: data.HostId };
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
    <div className="p-4 grid grid-cols-1 sm:grid-cols-1  md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
      <div className="w-full h-full lg:max-w-full lg:flex">
        <div
          className="h-80 lg:h-96  lg:w-96 md:h-96 flex-none bg-cover lg:rounded-r-none rounded-t-xl lg:rounded-xl text-center"
          style={{ backgroundImage: `url(${data.PostImage})` }}
        ></div>
        <div className="border-r xl:w-[1000px] lg:w-[500px] sm:w-96 border-b border-l bg-indigo-50 border-gray-400 lg:border-l-0 lg:border-t  lg:border-gray-400 rounded-b-xl lg:rounded-b-none lg:rounded-r-xl p-4 flex flex-col justify-between leading-normal">
          {showDeleteModal && <DeleteModal />}
          <BlogEditModal
            fetchData={fetchData}
            data={data}
            isVisible={isEditBlogModalOpen}
            onClose={() => {
              setISEditBlogModalOpen(false);
            }}
          />

          <div className="w-full">
            <div className="text-lg text-gray-600 grow w-full flex justify-end pr-5 pt-2">
              <Edit_Icon />
              <Delete_Icon />
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
              <img
                className="w-10 h-10 rounded-full mr-1"
                src={data.HostImage}
                alt="Avatar of Writer"
              />
              <div className="text-sm">
                <p className="text-gray-900 leading-none">
                  {data.HostUsername}
                </p>
                <p className="text-gray-600">Host</p>
              </div>
            </div>
            <div className="flex items-center">
              <img
                className="w-10 h-10 rounded-full mr-1"
                src={data.GuestImage}
                alt="Avatar of Host"
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
