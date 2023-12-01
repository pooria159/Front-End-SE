import { MdClose } from "react-icons/md";
import React, { useState , useEffect} from "react";
import useOffer from "../../hooks/useOffer";
import image from "../../assets/baktash.jpg";
import Modal from "./Modal";
// import {useOffer} from "../../hooks/useOffer";
import {useMyCard} from "../../hooks/useMyCard";
import { Link } from 'react-router-dom';


const ModalTimeLine = ({ isVisible, onClose, offers, cardId , hostId }) => {
  console.log('the offers: ', offers)
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(true);
  // const [offers, setOffers] = useState([]);
  const [cardDataoffer, setCardDataoffer] = useState(0);


  const removeCard = (index) => {
    console.log("index: " + index);
    setCards((prevCards) => {
      prevCards.filter((prevCard, i) => {
        i !== index;
      });
    });
  };

  const handelClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  if (!isVisible) return null;



  return (
    
    <div
      className="z-50 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handelClose}
    >
      <div className="w-[50rem] h-auto flex flex-col">
        <div className="bg-white rounded-lg relative">
          <button
            className="text-black text-xl absolute top-0 right-0 m-2 hover:bg-gray-300 p-0.5 rounded"
            onClick={() => onClose()}
          >
            <MdClose />
          </button>
          <div className="flex flex-col p-10 space-y-3">
            {offers.length > 0 ? (
              offers.map((card, index) => (
              <div className="flex items-center block rounded-lg bg-indigo-200 ">
                <Link to={`/private/${card.HostUsername}`} className="flex-grow hover:cursor-pointer">
                    <div className="flex justify-center items-center p-3  sm:flex rounded-lg hover">
                      <img
                        className="w-12 h-12 mb-3 mr-3 rounded-full sm:mb-0"
                        src={card.Image}
                      />
                      <div className="flex-grow">
                        <div className="text-base font-normal text-gray-600">
                          <span className="font-medium text-black dark:text-white">
                            {card.HostUsername}
                          </span>{" "}
                          has applied to become a{" "}
                          <span className="font-medium text-black">
                            Host
                          </span>
                        </div>
                      </div>
                    </div>
                      
                    
                </Link>
                <div className="flex flex-col sm:flex-row mr-10">
                  <button
                    onClick={() => {
                      console.log("item's id:", index);
                      setModalIsOpen(true);
                      setIsAccept(true);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    Start Chat
                  </button>
          
                  <Modal
                    isVisible={modalIsOpen}
                    index={index}
                    removeCard={() => removeCard(index)}
                    onClose={() => setModalIsOpen(false)}
                    isAccept={isAccept}
                    CallBack = {setModalIsOpen}
                  />
                </div>
              </div>
                
              ))
            ) : (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <h1 className="text-2xl font-bold text-indigo-950">
                  No one has requested to be hosted
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalTimeLine;
