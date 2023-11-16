// App.js
import { Routes, Route, Navigate,useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import SignupPage from './pages/SignUp';
import LoginPage from './pages/Login';
import ForgetPasswordPage from './pages/ForgetPassword';
import ResetPasswordPage from './pages/ResetPassword';
import VerificationPage from './pages/Verification';
import Checkmail from './pages/Checkmail';
import ProfilePage from './pages/Profile';
import CreateCardPage from './pages/CreateCard';
import PublicProfile from './pages/PublicProfile';

import ChatRoomPage from './pages/ChatRoom';


import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

   const location = useLocation();
   const islogin = localStorage.getItem('islogin') == 'True';

 return (
    <>
      <div className="flex flex-col min-h-screen">
         <div className="flex-grow">

         {!['/login', '/signup','/checkmail', '/verify-email', '/forget-password'].includes(location.pathname) && <Navbar />}
            <Routes>
               <Route path="/" element={islogin ? <Home /> : <Navigate to="/login" />} />
               {/* <Route path="/Eprofile" element={islogin ? <EProfilePage /> : <Navigate to="/login" />} /> */}
               <Route path="/profile" element= {<ProfilePage/>}/>
               {/* {islogin ? <ProfilePage /> : <Navigate to="/login" />} */}
               {/* <Route path="/Eprofile-Host" element={islogin ? <ProfileHostPage /> : <Navigate to="/login" />} /> */}
               <Route path="/login" element={<LoginPage />} />
               <Route path="/signup" element={<SignupPage />} />
               <Route path="/forget-password" element={<ForgetPasswordPage />} />
               <Route path="/reset-password" element={<ResetPasswordPage />} />
               <Route path="/verify-email" element={<VerificationPage />} />
               <Route path="/checkmail" element={<Checkmail/>} />
               <Route path="/create-card" element={<CreateCardPage/>} />
               <Route path="/public/:username" element={<PublicProfile/>} />
               {/* <Route path='*' element={<Errornotfound/>}/> */}
               <Route path="/chat" element={<ChatRoomPage/>}/>
            </Routes>
            
         </div>
         {!['/login', '/signup','/checkmail', '/verify-email', '/forget-password'].includes(location.pathname) && <Footer />}
      </div>
         <ToastContainer 
                  position="top-left"
                  newestOnTop={true}
                  pauseOnFocusLoss
                  draggable
                  autoClose={2000}
                  closeOnClick
                  pauseOnHover
         />
      
    </>
 );
};

export default App;