import axios from "axios";
import { useEffect } from "react";
const API_URL = (process.env.NODE_ENV != 'production' ? "https://dating-app-backend-xyrj.onrender.com/" : "https://dating-app-backend-xyrj.onrender.com/");

const register = (data) => {
  return axios.post(API_URL + "api/user/signup", data);
};

const login = (username, password) => {
  return axios
    .post(API_URL + "api/users/authorize", {
      email:username,
      password,
      role:"user"
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }
      return response.data;
    });
};


const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getCurrentUserTokken = () => {
  return JSON.parse(localStorage.getItem("token"));
};

const socialLogin = (data) => {
  return axios
    .post(API_URL + "api/users/authorize/social", data)
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }
      return response.data;
    });
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getCurrentUserTokken,
  socialLogin
}

export default AuthService;