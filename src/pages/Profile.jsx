import ProfileForm from "../components/Profile/Profile";


const EProfilePage = () => {
    return(
        <div className="bg-pallate-primary grid grid-cols-1 gap-0 bg-cover md:h-screen">
            <div className="grid justify-center items-center w-full">
                <ProfileForm/>
            </div>
        </div>
    );
}

export default EProfilePage