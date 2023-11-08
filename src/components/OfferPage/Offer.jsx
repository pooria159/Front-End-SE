import React, { useState } from "react";
import image from "../../assets/baktash.jpg";
import Modal from './Modal';

const Timelineitem = () => {
    const [cards, setCards] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

  const addCard = () => {
    setCards([...cards, {
      name: 'New Name',
      role: 'New Role',
      idCard: 'New ID',
      image: 'New Image'
    }]);
  }

  const removeCard = (index) => {
    const newCards = [...cards];
    newCards.splice(index, 1);
    setCards(newCards);
  }

  return(
    <div className="p-10 space-y-4">
        <button onClick={addCard}>Add Card</button>            
            {cards.length > 0 ? (
                cards.map((card, index) => (
                <ol key={index} className="hover:cursor-pointer">
                    <li>
                        <div className="items-center block p-3  bg-indigo-200 sm:flex rounded-lg hover:bg-indigo-400">
                            <img className="w-12 h-12 mb-3 mr-3 rounded-full sm:mb-0" src={image}/>
                                <div className="flex-grow">
                                    <div className="text-base font-normal text-gray-600"><span className="font-medium text-black dark:text-white">{card.name}</span> has applied to become a <span className="font-medium text-black">{card.role}</span></div>
                                        <span className="inline-flex items-center text-xs font-normal text-black">
                                            <svg className="w-2.5 h-2.5 mr-1" aria-hidden="true" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19ZM8.374 17.4a7.6 7.6 0 0 1-5.9-7.4c0-.83.137-1.655.406-2.441l.239.019a3.887 3.887 0 0 1 2.082 2.5 4.1 4.1 0 0 0 2.441 2.8c1.148.522 1.389 2.007.732 4.522Zm3.6-8.829a.997.997 0 0 0-.027-.225 5.456 5.456 0 0 0-2.811-3.662c-.832-.527-1.347-.854-1.486-1.89a7.584 7.584 0 0 1 8.364 2.47c-1.387.208-2.14 2.237-2.14 3.307a1.187 1.187 0 0 1-1.9 0Zm1.626 8.053-.671-2.013a1.9 1.9 0 0 1 1.771-1.757l2.032.619a7.553 7.553 0 0 1-3.132 3.151Z"/>
                                            </svg>
                                            id card : {card.idCard}
                                        </span> 
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <button onClick={ () => setModalIsOpen(true)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                                            Accept
                                        </button>
                                        <button onClick={ () => setModalIsOpen(true)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg ">
                                            Decline
                                        </button>
                                        <Modal isVisible={modalIsOpen} onClose={() => setModalIsOpen(false)}/>
                                    </div>
                            </div>
                        </li>
                    </ol>
                ))
            ) : (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <h1 className="text-2xl font-bold text-indigo-950">No one has requested to be hosted</h1>
                </div>

            )}
        </div>
  );
}

export default Timelineitem
