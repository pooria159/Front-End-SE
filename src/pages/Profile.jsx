import ProfileForm from "../components/Profile/Edit_Profile";


const ProfilePage = () => {
    return(
        <div className="bg-pallate-primary grid grid-cols-1 gap-0 bg-cover">
            <div className="grid justify-center items-center w-full">
                <ProfileForm/>
            </div>
        </div>
    );
}



export default ProfilePage