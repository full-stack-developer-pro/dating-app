import axios from "axios";
import AuthService from "./auth.service";

const API_URL = (process.env.NODE_ENV != 'production' ? "https://dating-app-backend-xyrj.onrender.com/" : "https://dating-app-backend-xyrj.onrender.com/");

axios.interceptors.request.use(function (config) {
    const token = AuthService.getCurrentUserTokken();
    config.headers.Authorization =  'Bearer '+token;
     
    return config;
});
axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("user");
      // window.location.href ='/#/login'
      // Hace la solicitud de refresco de tokens
    }
    return Promise.reject(error);
  });
  const getAboutUs = () => {
    return axios.get(API_URL + "api/admin/getAboutAs");
  };

  const DataService = {
    getAboutUs,
  }
  export default DataService;