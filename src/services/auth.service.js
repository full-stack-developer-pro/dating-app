import axios from "axios";
import { useEffect } from "react";
const API_URL = (process.env.NODE_ENV != 'production' ? "http://api.digitalmarketingcoursesinchandigarh.in/" : "http://api.digitalmarketingcoursesinchandigarh.in/");

const register = (data) => {
  return axios.post(API_URL + "api/user/signup", data);
};

const login = (username, password) => {
  return axios
    .post(API_URL + "api/user/login", {
      email:username,
      password,
    })
    .then((response) => {
      if (response.data.data.token) {
        localStorage.setItem("d_user", JSON.stringify(response.data.data.user.id));
        localStorage.setItem("d_userToken", JSON.stringify(response.data.data.token));
      }
      return response.data;
    });
};


const logout = () => {
  localStorage.removeItem("d_user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("d_user"));
};

const getCurrentUserTokken = () => {
  return JSON.parse(localStorage.getItem("d_userToken"));
};

// const socialLogin = (data) => {
//   return axios
//     .post(API_URL + "api/users/authorize/social", data)
//     .then((response) => {
//       if (response.data.d_userToken) {
//         localStorage.setItem("d_user", JSON.stringify(response.data.user));
//         localStorage.setItem("d_userToken", JSON.stringify(response.data.d_userToken));
//       }
//       return response.data;
//     });
// };

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getCurrentUserTokken,
  // socialLogin
}

export default AuthService;