// App.js
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EProfilePage from './pages/EProfile';
import LoginPage from './pages/Login';
import ProfilePage from './pages/Profile';

const App = () => {
 return (
    <>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Eprofile" element={<EProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
       </Routes>
    </>
 );
};

export default App;