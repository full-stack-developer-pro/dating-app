import axios from "axios";
import AuthService from "./auth.service";

const API_URL =
  process.env.NODE_ENV !== "production"
    ? "https://api.milfhub.co.uk/"
    : "https://api.milfhub.co.uk/";

axios.interceptors.request.use(function (config) {
  const token = AuthService.getCurrentUserTokken();
  config.headers.Authorization = "Bearer " + token;
  config.headers["API-TOKEN"] = `c1462debeb1e53644f768cbbc6a9562b73009-56a1e28ea706dc0bc38ba5ae990`;
  return config;
});

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("user");
      // window.location.href = '/#/login';
      // Make the token refresh request here
    }
    return Promise.reject(error);
  }
);

const getAboutUs = () => {
  return axios.get(API_URL + "api/admin/getAboutAs");
};
const getOldPayments = () => {
  return axios.get(API_URL + "api/user/payments");
};
const statusNotification = (status, data) => {
  return axios.put(API_URL + "api/user/notifications/" + status, data);
};
const updateChat = (id) => {
  return axios.get(API_URL + "api/user/readChat/" + id);

}
const getNotification = () => {
  return axios.get(API_URL + "api/user/notifications");
};
const UpdateNotification = (data) => {
  return axios.put(API_URL + "api/user/notifications", data);
};
const TrackProfile = (id) => {
  return axios.post(API_URL + "api/user/profile-view/" + id);
};
const helpdesk = (data) => {
  return axios.post(API_URL + "api/helpdesk", data);
};
const getContactUs = () => {
  return axios.get(API_URL + "api/admin/getcontactAs");
};
const getSocialLinks = () => {
  return axios.get(API_URL + "api/admin/getSocialLinks");
};
const getPrivacyPoicy = () => {
  return axios.get(API_URL + "api/admin/getPrivacyPolicy");
};
const getGdpr = () => {
  return axios.get(API_URL + "api/admin/getGdpr");
};
const getFAQ = () => {
  return axios.get(API_URL + "api/admin/faq");
};
const getTermsConditions = () => {
  return axios.get(API_URL + "api/admin/getTermsCondition");
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
const getAllUsers = (limit, page) => {
  return axios.get(API_URL + "api/user/getAllUser?limit=" + limit + "&page=" + page);
};
const addMyFriend = (id, data) => {
  return axios.post(API_URL + "api/addFriend/" + id, data);
};
const removeMyFriend = (id, data) => {
  return axios.post(API_URL + "api/remove-friend/" + id, data);
};
const getAllFriend = (id) => {
  return axios.get(API_URL + "api/user/getAllFriends/" + id);
};
const searchUsers = (limit, page, gender, country, minValue, maxValue, miles) => {
  return axios.get(
    API_URL +
    "api/user/getList?limit=" + limit + "&page=" + page +
    "&gender=" +
    gender +
    "&city=" +
    country +
    "&min_age=" +
    minValue +
    "&max_age=" +
    maxValue +
    "&miles=" +
    miles
  );
};
const getChatBox = (myId, yourId) => {
  return axios.get(
    API_URL + "api/user/getChat?senderId=" + myId + "&receiverId=" + yourId
  );
};
const getAllChats = (id) => {
  return axios.get(API_URL + "api/user/chatted?userId=" + id);
};
const getTopBanner = () => {
  return axios.get(API_URL + "api/admin/getTopBanner");
};
const getMiddleBanner = () => {
  return axios.get(API_URL + "api/admin/getMiddleBanner");
};
const getSecondLastBanner = () => {
  return axios.get(API_URL + "api/admin/getSecondLastBanner");
};
const getLastBanner = () => {
  return axios.get(API_URL + "api/admin/getLastBanner");
};
const getMembers = () => {
  return axios.get(API_URL + "api/user/memberStatic");
};
const getPackages = () => {
  return axios.get(API_URL + "api/getAllCredit");
};
const GeneratePayment = (data) => {
  return axios.post(API_URL + "api/payment/generate-link", data);
};
const verifyPayment = (data) => {
  return axios.post(API_URL + "api/payment/verify-payment", data);
};
const UploadProfileImage = (data) => {
  return axios.post(API_URL + "api/uploadGalleryImages", data);
};
const PostFlirt = (id) => {
  return axios.post(API_URL + "api/user/wink/" + id);
};
const setProfile = (id, data) => {
  return axios.post(API_URL + "api/user/set-profile-image/" + id, data);
};
const ForgotEmail = (data) => {
  return axios.post(API_URL + "api/user/forgot-password", data);
};
const NewPassword = (data) => {
  return axios.post(API_URL + "api/user/reset-password", data);
};
// const getCities = () => {
//   return axios.get(API_URL + "api/getCountryCities/GB");
// }
const getCities = (location) => {
  return axios.get(API_URL + "api/getCountryCities/GB?q=" + location);
};
const sendVerification = () => {
  return axios.post(API_URL + "api/user/resend-verification");
};
const ChangeEmail = (data) => {
  return axios.post(API_URL + "api/user/update-email",data);
};


const DataService = {
  ChangeEmail,
sendVerification,
  updateChat,
  setProfile,
  NewPassword,
  ForgotEmail,
  PostFlirt,
  helpdesk,
  TrackProfile,
  statusNotification,
  UpdateNotification,
  getNotification,
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
  getGdpr,
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
  getCities,
  getOldPayments,
  getFAQ
};
export default DataService;
