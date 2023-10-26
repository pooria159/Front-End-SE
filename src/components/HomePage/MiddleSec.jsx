import React from 'react';

import journeyimg from "../../assets/journeyimg.jpg";

const MiddleSec = () => {
    return (
        <div className=" lg:space-y-5 xl:flex 2xl:flex p-10 h-auto animate-fade-in justify-center items-center">
            <div className=' mt-5 xl:w-1/2 2xl:w-1/2 justify-center items-center'>
                <h1 className="2xl:text-3xl md:text-xl font-bold mb-2">You Are Here Because</h1>
                <div className="p-2 2xl:text-lg">
                TrekDestiny, your passport to exploring cities 
                worldwide without the burden of local accommodation 
                expenses. We believe travel should be accessible to all, 
                which is why we've created a platform that allows you to 
                embark on a journey of a lifetime, free from financial 
                constraints. With TrekDestiny, you'll dive into a 
                diverse array of global cultures, connecting with
                people from all walks of life, and gaining a 
                profound understanding of our world. Experience
                the authentic rhythms of daily life in different 
                countries, immersing yourself in customs and traditions.
                This firsthand experience will not only broaden your
                perspective but also deepen your appreciation for 
                the world's captivating diversity. Your journey of 
                life begins now. Start your adventure with TrekDestiny 
                and let the exploration unfold!
                </div>
            </div>
            <div className='xl:w-1/2 2xl:w-1/2  h-5/6'>
                <img src={journeyimg} alt="Desk with papers, plant, and Eiffel Tower picture" className="w-full h-auto rounded-xl" />
            </div>
        </div>
    );
};

export default MiddleSec;
