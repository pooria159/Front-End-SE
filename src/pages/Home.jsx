import Slider from "../components/Slider/Slider";
import Card from "../components/AnncCard";

const Home = () => {
    return(
        <div className="items-center justify-center">
            {/* <Slider/> */}
            <div className="flex items-center justify-center">
                <Card/>
                <Card/>
            </div>
            
        </div>
    );
}



export default Home