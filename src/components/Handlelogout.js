import { toast } from 'react-toastify';


function Handlelogout(){

    const isLogedin = localStorage.getItem("islogin")
    if(isLogedin === "True"){
        localStorage.removeItem('islogin');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('image');
        toast.success("Logged out successfully!");
        return true;
    }

    toast.error("Can't log out, something bad happenned!");
    return false;

}

export default Handlelogout;