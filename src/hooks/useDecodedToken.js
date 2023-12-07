import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import config from "./config";
const url = config.API_URL;


const getDecodedToken = () => {
    const token = localStorage.getItem('token');
    let decoded = null;
    if (typeof token === 'string') {
      decoded = jwtDecode(token);
    }
    return decoded;
  };

export default getDecodedToken;