import { MdClose } from "react-icons/md";
import React, { useState , useEffect} from "react";
import useOffer from "../../hooks/useOffer";
import image from "../../assets/baktash.jpg";
import Modal from "./Modal";
// import {useOffer} from "../../hooks/useOffer";
import {useMyCard} from "../../hooks/useMyCard";
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';


// MUI
import { Avatar } from '@mui/material';

const ModalTimeLine = ({ isVisible, onClose, offers, cardId , hostId }) => {
  console.log('the offers: ', offers)
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(true);
  // const [offers, setOffers] = useState([]);
  const [cardDataoffer, setCardDataoffer] = useState(0);
  const navigate = useNavigate();
  const [selectedOffer, setSelectedOffer] = useState(null);

  const handleOfferSelection = (offer) => {
    setSelectedOffer(offer);
    setModalIsOpen(true);
  };  



  // const removeCard = (index) => {
  //   console.log("index: " + index);
  //   setCards((prevCards) => {
  //     prevCards.filter((prevCard, i) => {
  //       i !== index;
  //     });
  //   });
  // };

  const handelClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  if (!isVisible) return null;

  const goToChat = () => {
    console.log(`Going to chats`);
    setTimeout(() => {
      navigate('/profile/mychats', {replace : true});
      navigate(0);
    }, 1000);
  };
  



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
              offers.map((card) => (
              <div key={card.HostId} className="flex items-center block rounded-lg bg-indigo-200 ">
                <Link to={`/private/${card.HostUsername}`} className="flex-grow hover:cursor-pointer">
                    <div className="flex justify-center items-center p-3  sm:flex rounded-lg hover">
                      {/* <img
                        className="w-12 h-12 mb-3 mr-3 rounded-full sm:mb-0"
                        src={card.Image}
                      /> */}
                      <Avatar
                        src={card.Image}
                        sx={{ width: '3rem', height: '3rem', mb: { xs: 3, sm: 0 }, mr: 3, borderRadius: '50%' }}
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
                  {/* <button
                    onClick={() => {
                      console.log("item's id:", card);
                      setModalIsOpen(true);
                      setIsAccept(true);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    Start Chat
                  </button> */}
                  <button
                    onClick={() => {
                      console.log("item's id:", card);
                      if (card.status === 2) {
                        goToChat();
                      } else {
                        // Logic for starting chat (remains the same)
                        setSelectedOffer(card);
                        setModalIsOpen(true);
                        setIsAccept(true);
                      }
                    }}
                    className="bg-indigo-600 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    {card.status === 2 ? 'Go to Chats' : 'Start Chat'}
                  </button>
                  {/* <Modal
                    isVisible={modalIsOpen}
                    hostId={card.HostId}
                    cardId={cardId}
                    index={index}
                    removeCard={() => removeCard(index)}
                    onClose={() => setModalIsOpen(false)}
                    isAccept={isAccept}
                    CallBack = {setModalIsOpen}
                    onChatStartSuccess={goToChat} 
                    
                  /> */}

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
          <Modal
            isVisible={modalIsOpen}
            offer={selectedOffer}
            onClose={() => {
              setModalIsOpen(false);
              setSelectedOffer(null); // Reset the selected offer when closing the modal
            }}
                    // hostId={selectedOffer.HostId}
                    cardId={cardId}
                    // index={index}
                    // removeCard={() => removeCard(index)}
                    isAccept={isAccept}
                    CallBack = {setModalIsOpen}
                    onChatStartSuccess={goToChat} 
            // ... other props ...
          />

        </div>
      </div>
    </div>
  );
};

export default ModalTimeLine;
