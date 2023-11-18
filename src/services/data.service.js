import axios from "axios";
import AuthService from "./auth.service";

const API_URL = (process.env.NODE_ENV != 'production' ? "http://51.20.124.172:3000/" : "http://51.20.124.172:3000/");

axios.interceptors.request.use(function (config) {
  const token = AuthService.getCurrentUserTokken();
  config.headers.Authorization = 'Bearer ' + token;

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
const getContactUs = () => {
  return axios.get(API_URL + "api/admin/getcontactAs");
};
const getSocialLinks = () => {
  return axios.get(API_URL + "api/admin/getSocialLinks");
};
const getPrivacyPoicy = () => {
  return axios.get(API_URL + "api/admin/getPolicy&Privacy");
};
const getTermsConditions = () => {
  return axios.get(API_URL + "api/admin/getTerms&Condition");
};
const getAllBlogs = () => {
  return axios.get(API_URL + "api/admin/getBlog");
};
const getOneBlog = (id) => {
  return axios.get(API_URL + "api/admin/getOneBlog/" + id);
};
const getSingleProfile = (id) => {
  return axios.get(API_URL + "api/user/getDetailsById/" + id);
};
const UpdateProfile = (id, data) => {
  return axios.put(API_URL + "api/user/update/" + id, data);
};
const getAllUsers = () => {
  return axios.get(API_URL + "api/user/getAllUserByAdmin");
};
const addMyFriend = (id, data) => {
  return axios.post(API_URL + "api/addFriend/" + id, data);
};
const removeMyFriend = (id, data) => {
  return axios.post(API_URL + "api/remove-friend/" + id, data);
};
const getAllFriend = (id) => {
  return axios.get(API_URL + "api/user/getAllFriends/" + id);
}
const searchUsers = (gender, country) => {
  return axios.get(API_URL + "api/user/getList?gender=" + gender + "&country=" + country);
}
const getChatBox = (myId, yourId) => {
  return axios.get(API_URL + "api/user/getChat?senderId=" + myId + "&receiverId=" + yourId);
}
const getAllChats = (id) => {
  return axios.get(API_URL + "api/user/chatted?userId=" + id);
}
const getTopBanner = () => {
  return axios.get(API_URL + "api/admin/getTopBanner");
}
const getMiddleBanner = () => {
  return axios.get(API_URL + "api/admin/getMiddleBanner");
}
const getSecondLastBanner = () => {
  return axios.get(API_URL + "api/admin/getSecondLastBanner");
}
const getLastBanner = () => {
  return axios.get(API_URL + "api/admin/geLastBanner");
}
const getMembers = () => {
  return axios.get(API_URL + "api/user/memberStatic");
}
const getPackages = () => {
  return axios.get(API_URL + "api/admin/getAllCredit");
}
const GeneratePayment = (data) => {
  return axios.post(API_URL + "api/payment/generate-link", data);
};
const verifyPayment = (data) => {
  return axios.post(API_URL + "api/payment/verify-payment", data);
};
const UploadProfileImage = (id, data) => {
  return axios.post(API_URL + "api/uploadGalleryImages/" + id, data);
};
const getCities = () => {
  return axios.get("http://api.geonames.org/searchJSON?country=GB&featureClass=P&username=ingenioushitech2580");
}
const DataService = {
  UploadProfileImage,
  verifyPayment,
  GeneratePayment,
  getPackages,
  getMembers,
  UpdateProfile,
  getAboutUs,
  getContactUs,
  getSocialLinks,
  getPrivacyPoicy,
  getTermsConditions,
  getAllBlogs,
  getOneBlog,
  getSingleProfile,
  getAllUsers,
  addMyFriend,
  removeMyFriend,
  getAllFriend,
  searchUsers,
  getChatBox,
  getAllChats,
  getTopBanner,
  getMiddleBanner,
  getSecondLastBanner,
  getLastBanner,
  getCities

}
export default DataService;