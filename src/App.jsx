// App.js
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EProfilePage from './pages/EProfile';
import Profile from './pages/Profile';
import SignupPage from './pages/SignUp';
import LoginPage from './pages/Login';
import ForgetPasswordPage from './pages/ForgetPassword';
import ResetPasswordPage from './pages/ResetPassword';
import VerificationPage from './pages/Verification';
import Checkmail from './pages/Checkmail';
import ProfilePage from './pages/Profile';


import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

   const islogin = localStorage.getItem('islogin') == 'True';
 return (
    <>
         {['/login', '/signup'].includes(window.location.pathname) ? null : <Navbar />}
         <Routes>
            <Route path="/" element={islogin ? <Home /> : <Navigate to="/login" />} />
            <Route path="/Eprofile" element={islogin ? <EProfilePage /> : <Navigate to="/login" />} />
            <Route path="/profile" element={islogin ? <ProfilePage /> : <Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forget-password" element={<ForgetPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/verify-email" element={<VerificationPage />} />
            <Route path="/checkmail" element={<Checkmail/>} />
         </Routes>

         {['/login', '/signup'].includes(window.location.pathname) ? null : <Footer />}

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