import { jwtDecode } from "jwt-decode";
import axios from 'axios';
const url = import.meta.env.VITE_API_URL;


const getDecodedToken = () => {
    const token = localStorage.getItem('token');
    let decoded = null;
    if (typeof token === 'string') {
      decoded = jwtDecode(token);
    }
    return decoded;
  };

export default getDecodedToken;