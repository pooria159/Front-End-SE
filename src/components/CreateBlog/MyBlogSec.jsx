import React, { useState, useEffect } from "react";
import Myblog from "./Myblog";
import ClipLoader from "react-spinners/ClipLoader";
import { useMyBlog } from "../../hooks/useMyBlog";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#2563EB" size={150} />
    </div>
  );
};

const MyblogSec = () => {
  const [cardData, setCardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await useMyBlog();
        setCardData(response.data.posts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : cardData && cardData.length != 0 ? (
        <div className="flex flex-wrap justify-center items-center">
          {cardData &&
            cardData.map((data, index) => {
              return <Myblog key={index} data={data} />;
            })}
        </div>
      ) : (
        <div className="mt-[100%] text-2xl">You have no blog post!</div>
      )}
    </div>
  );
};

export default MyblogSec;
