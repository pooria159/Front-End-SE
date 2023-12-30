import { React, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faFlag,
  faCalendarAlt,
  faEdit,
  faRemove
} from "@fortawesome/free-solid-svg-icons";
import ModalTimeLine from "../OfferPage/Modal_Offer";
import mycard from "../../assets/myCard.jpg";
import { toast } from "react-toastify";
import BlogModal from "../CreateBlog/BlogModal";
import useOffer from "../../hooks/useOffer";
import { useDeleteMyCard } from "../../hooks/useDeleteMyCard";
import card from "@material-tailwind/react/theme/components/card";
import ANCEditModal from "./ANCEditModal";

const MyCard = ({ data, fetchData }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [offersData, setOffersData] = useState(null);

  const [isEditAnncModalOpen, setISEditAnncModalOpen] = useState(false);
  
  const fetchDelete = async (cardId) => {
    const response = await useDeleteMyCard(cardId);
    if (response.status >= 200 && response.status < 300) {
      toast.success("The announcement has deleted successfully!");
    } else {
      toast.error(response.data["message"]);
    }
    await fetchData();
  }

  const handleDelete = () => {
    fetchDelete(data.CardId);
  }

  const DeleteModal = () => {
    return(
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowDeleteModal(false)}></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" onClick={(e) => e.stopPropagation()}>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    Confirm Deletion
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to delete this item? This action cannot be undone.
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
    )
  }
  const Edit_Icon = () => {
    return(
      <div className="text-gray-500 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 hover:cursor-pointer" onClick={() => {setISEditAnncModalOpen(true)}} >
        <FontAwesomeIcon icon={faEdit} />
      </div>
    )
  };
  const Delete_Icon = () => {
    return(
      <div className="text-gray-500 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 hover:cursor-pointer" onClick={() => {setShowDeleteModal(true)}}>
        <FontAwesomeIcon icon={faRemove} />
      </div>
    )
  };

  const fetchAllOffers = async (cardId) => {
    console.log("fetching offers for id: ", cardId);
    let form = { AnnouncementId: data.CardId };
    try {
      const response = await useOffer(form);
      setOffersData(response.data.offers ? response.data.offers : []);
      console.log(response.data);
      return response;
    } catch (error) {
      console.log("running into errors: ", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchAllOffers(data.CardId);
    console.log("announcements:",data);
  }, []);

  return (
    <div className="max-w-md border border-gray-300 h-[22rem] w-[30rem] mx-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-[30rem] m-2">
      <div className="md:flex h-full">
        {showDeleteModal && <DeleteModal/>}
        <ANCEditModal fetchData = {fetchData} data = {data} isVisible={isEditAnncModalOpen} onClose={() => {setISEditAnncModalOpen(false)}}/>
        <div className="xl:block 2xl:block  md:flex-shrink-0 overflow-hidden">
          <img
            className="h-full w-full object-cover md:w-48 transform transition duration-500 hover:scale-110"
            src={mycard}
            alt="An image"
          />
        </div>
        <div className="w-full">
          <div className="grow w-full flex justify-end pr-5 pt-2">
            <Edit_Icon/>
            <Delete_Icon/>
          </div>
          <div className="pb-5 pr-5 pl-5 ">
            <ul className="mt-3 text-gray-600 space-y-1">
              <li className="text-sm ">
                <FontAwesomeIcon icon={faGlobe} /> Languages:{" "}
                {data.PreferredLanguages.join(", ")}
              </li>

              <li className="text-sm border-t">
                <FontAwesomeIcon icon={faFlag} /> State: {data.DestinationState}
              </li>
              <li className="text-sm border-t">
                <FontAwesomeIcon icon={faFlag} /> City: {data.DestinationCity}
              </li>
              <li className="text-sm border-t">
                <FontAwesomeIcon icon={faGlobe} /> Country:{" "}
                {data.DestinationCountry}
              </li>
              <li className="text-sm border-t">
                <FontAwesomeIcon icon={faCalendarAlt} /> Start Date:{" "}
                {data.StartDate}
              </li>
              <li className="text-sm">
                <FontAwesomeIcon icon={faCalendarAlt} /> End Date: {data.EndDate}
              </li>
            </ul>
            <p className="h-[3rem] mt-2 text-gray-500 text-sm border-t">
              {data.Description &&
                data.Description.substring(0, 90) +
                  (data.Description.length > 90 ? "..." : "")}
            </p>
            <div>
              <button
                className="mt-4 bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-[0.75rem] px-3 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                style={{ transition: "all .15s ease", flex: 1 }}
                onClick={() => {
                  offersData && setShowModal(true);
                }}
              >
                Offers
              </button>

              <button
                className="mt-4 bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-xs px-3 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                style={{ transition: "all .15s ease", flex: 1 }}
                onClick={() => {
                  setModalIsOpen(true);              
                }}
              >
                Create Blog
              </button>{" "}
                    <BlogModal
                      isVisible={modalIsOpen}
                      onClose={() => setModalIsOpen(false)}
                      Data = {data}
                    />
            </div>
          </div>
          
          <ModalTimeLine
            isVisible={showModal}
            onClose={() => setShowModal(false)}
            offers={offersData && offersData}
            cardId={data.CardId}
            hostId={data.HostId}
          />
        </div>
        
      </div>
      
    </div>
  );
};

export default MyCard;
