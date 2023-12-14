/* eslint-disable no-useless-catch */
import axios from 'axios';
import config from './config';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
const url = config.API_URL;

const api = axios.create({
  baseURL: url,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Jwt ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      // If the error status is 401 and there is no originalRequest._retry flag,
      // it means the token has expired and we need to refresh it
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const response = await axios.post(`${url}/refresh`,{"RefreshToken" : refreshToken});
          const token = response.data;
          console.log("expiredddddddddddddddddddddddddddd")
          localStorage.setItem('token', token.AccessToken);
  
          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Jwt ${token}`;
          return api(originalRequest);
        } catch (error) {
          toast.error("You must login again!!!");
          throw error;
        }
      }
  
      return Promise.reject(error);
    }
);

export default api