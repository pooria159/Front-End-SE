import Slider from "../components/HomePage/Slider/Slider";
import Card from "../components/HomePage/AnncCard";
import MiddleSec
 from "../components/HomePage/MiddleSec";
const Home = () => {
    return(
        <div className="items-center justify-center">
            <Slider/>

            <MiddleSec/>


            
            <div className="flex justify-center items-center min-h-screen mb-10">

                <div className="p-10 rounded-xl grid grid-cols-2 gap-2 shadow-2xl">
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
            </div>

            
        </div>
    );
}



export default Home