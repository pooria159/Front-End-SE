import Slider from "../components/HomePage/Slider/Slider";
import AnncPanel from "../components/HomePage/AnncPannel";
import MiddleSec from "../components/HomePage/MiddleSec";
const Home = () => {
    return(
        <div className="items-center justify-center">
            <Slider/>

            <MiddleSec/>
            

            <AnncPanel/>
            

            
        </div>
    );
}



export default Home