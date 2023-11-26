import React,{useState, useEffect} from "react";
import MyCard from "./MyCard";
import { useMyCard } from '../../hooks/useMyCard';
import ClipLoader from "react-spinners/ClipLoader";


const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <ClipLoader color="#2563EB" size={150} />
        </div>
    );
};

const MyAnncSec = () => {

    const [cardData, setCardData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await useMyCard();
                setCardData(response.data.Cards);
                setIsLoading(false);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);


    return(
        <div>
            {isLoading ? <Loading/> :<div className="flex flex-wrap justify-center items-center">
                {cardData && cardData.map((data, index) => {
                    return <MyCard key={index} data ={data} />
                })}  
            </div>}
        </div>
    );
}


export default MyAnncSec;