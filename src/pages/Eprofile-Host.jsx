import EProfileHostForm from "../components/Profile-Host/Edit_profile_Host";


const EProfileHostPage = () => {
    return(
        <div className="bg-pallate-primary grid grid-cols-1 gap-0 bg-cover md:h-screen sm:h-screen ">
            <div className="grid justify-center items-center w-full">
                <EProfileHostForm/>
            </div>
        </div>
    );
}

export default EProfileHostPage