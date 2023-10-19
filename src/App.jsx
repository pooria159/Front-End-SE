// App.js
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignupPage from './pages/SignUp';
import LoginPage from './pages/Login';
import ForgetPasswordPage from './pages/ForgetPassword';
import ResetPasswordPage from './pages/ResetPassword';
import VerificationPage from './pages/Verification';

const App = () => {
   localStorage.setItem('islogin', "False");
 return (
    <>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-email" element={<VerificationPage />} />
          
       </Routes>
    </>
 );
};

export default App;