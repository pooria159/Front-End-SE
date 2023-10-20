import EProfileForm from "../components/Profile/Edit_Profile";


const EProfilePage = () => {
    return(
        <div className="bg-pallate-primary grid grid-cols-1 gap-0 bg-cover md:h-screen w-screen">
            <div className="grid justify-center items-center w-full">
                <EProfileForm/>
            </div>
        </div>
    );
}

export default EProfilePage