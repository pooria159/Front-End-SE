import React,{useState, useEffect} from "react";
import MyCard from "./MyCard";
import { useMyCard } from '../../hooks/useMyCard';



const MyAnncSec = () => {
    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await useMyCard();
                console.log(response.data.Cards);
                setCardData(response.data.Cards);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);


    return(
        <div>
            <div className="flex flex-wrap justify-center items-center">
                {cardData && cardData.map((data, index) => {
                    return <MyCard key={index} data ={data} />
                })}  
            </div>
        </div>
    );
}


export default MyAnncSec;