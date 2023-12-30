// import axios from 'axios';

// const url = config.API_URL;

// export const useResetPassword = async (token,formData) => {
//     const headers = {
//         'Accept': 'application/json',
//     };

//     const response = await axios.post(`${url}/reset-password?token=${token}`, JSON.stringify(formData), {headers});
//     return response;

// }

import axios from 'axios';
import config from './config';
const url = config.API_URL;

export const useResetPassword = async (token, newpassword) => {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const data = JSON.stringify({ newpassword }); // Create an object with only the password

  try {
    const response = await axios.post(`${url}/reset-password?token=${token}`, data, { headers });
    return response;
  } catch (error) {
    throw error;
  }
};

