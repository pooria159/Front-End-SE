import React from 'react';

import journeyimg from "../../assets/journeyimg.jpg";

const MiddleSec = () => {
    return (
        <div className="flex p-10 h-auto animate-fade-in justify-center items-center">
            <div className='md:w-3/5 2xl:w-2/5 xl:w-2/5 lg-w-2/5 mt-5 '>
                <h1 className="2xl:text-3xl md:text-xl font-bold mb-2">You Are Here Because...</h1>
                <p className="text-base mr-10 ml-2  xl:text-xs lg:text:xs md:text-xs">
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
                </p>
            </div>
            <div className='2xl:block xl:block lg:block hidden 2xl:w-3/5 xl:w-3/5 lg-w-3/5 md:w-2/5 h-5/6'>
                <img src={journeyimg} alt="Desk with papers, plant, and Eiffel Tower picture" className="w-full h-auto rounded-xl" />
            </div>
        </div>
    );
};

export default MiddleSec;
