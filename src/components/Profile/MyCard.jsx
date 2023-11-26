import { React, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faFlag,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import ModalTimeLine from "../OfferPage/Modal_Offer";
import mycard from "../../assets/myCard.jpg";
import { toast } from "react-toastify";

import useOffer from "../../hooks/useOffer";

const MyCard = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [offersData, setOffersData] = useState(null);

  // useEffect(() => {
  //   console.log('in useEffect of MyCard')
  //   const fetchData = async () => {
  //     let form = { AnnouncementId: data.CardId };
  //     try {
  //       const response = await useOffer(form);
  //       setOffersData(response.data);
  //       if (response.status >= 200 && response.status < 300) {
  //         toast.success("The request was successfully accepted", {});
  //       } else {
  //         toast.error("The request was not accepted successfully", {});
  //       }
  //       console.log(response.data);
  //     } catch (error) {
  //       toast.error(error.response.data.message, {});
  //       throw error;
  //     }
  //   };
  //   fetchData();
  // }, []);
  const fetchAllOffers = async (cardId) => {
    console.log("fetching offers for id: ", cardId);
    let form = { AnnouncementId: data.CardId };
    try {
      const response = await useOffer(form);
      setOffersData(response.data.offers ? response.data.offers : []);
      // console.log(response.data);
      return response;
    } catch (error) {
      console.log("running into errors: ", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchAllOffers(data.CardId);
  }, []);

  return (
    <div className="max-w-md border border-gray-300 h-[22rem] w-[30rem] mx-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-[30rem] m-2">
      <div className="md:flex h-full">
        <div className="xl:block 2xl:block  md:flex-shrink-0 overflow-hidden">
          <img
            className="h-full w-full object-cover md:w-48 transform transition duration-500 hover:scale-110"
            src={mycard}
            alt="An image"
          />
        </div>
        <div className="p-5">
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
          <button
            className="mt-4 bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-[0.75rem] px-3 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
            type="button"
            style={{ transition: "all .15s ease" }}
            onClick={() => {
              // fetchAllOffers(data.CardId).then((res) => {
              //   offersData && offersData.length > 0 && setShowModal(true);
              // });
              offersData && setShowModal(true);
            }}
          >
            Offers
          </button>
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
