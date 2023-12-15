// /* eslint-disable no-useless-catch */
// import axios from 'axios';
// import config from './config';
// const url = config.GET_NOTIFICATION_URL;



// const apiNotification = axios.create({
//   baseURL: url,
// });

// // Add a request interceptor
// apiNotification.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Jwt ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Add a response interceptor
// apiNotification.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const originalRequest = error.config;
  
//       // If the error status is 401 and there is no originalRequest._retry flag,
//       // it means the token has expired and we need to refresh it
//       if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
  
//         try {
//           const refreshToken = localStorage.getItem('refreshToken');
//           const response = await axios.post(`${url}/refresh`,{"RefreshToken" : refreshToken});
//           const token = response.data;
//           console.log(token)
//           localStorage.setItem('token', token.AccessToken);
  
//           // Retry the original request with the new token
//           originalRequest.headers.Authorization = `Jwt ${token}`;
//           return axios(originalRequest);
//         } catch (error) {
//           // Handle refresh token error or redirect to login
//           throw error;
//         }
//       }
  
//       return Promise.reject(error);
//     }
// );

// // export default api


// export const useGetNotification = async () => {
//   try {
//       console.log("Calling useGetNotification");
//       const response = await apiNotification.get('/notif');
//       console.log("API Response:", response);
//       return response;
//   } catch (error) {
//       console.error("API Error:", error);
//       throw error;
//   }
// }
