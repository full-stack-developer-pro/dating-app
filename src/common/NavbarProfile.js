import React, { useEffect, useState } from "react";
import Logo from "../images/dating-app-logo.png";
import "../customCss/Navbar.css";
import OP from "../images/dating-banner.jpg";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import DataService from "../services/data.service";
import profile1 from "../images/profile1.jpg";
import moment from "moment";
import NoImage from "../images/noImage.png";
import { useNavigate, useLocation } from "react-router-dom";
import ProfileAvatar from "../images/profile-avatar.png";
// import LanguageSelector from "./LanguageSelector";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
const NavbarProfile = () => {
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState("");
  const [payments, setPayments] = useState(false);
  const [notifications, setNotifications] = useState("");
  const [notificationLength, setNotificationLength] = useState("");
  const auth = AuthService.getCurrentUserTokken();
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState("");
  const [notification, setShowNotification] = useState(false);
  const navigate = useNavigate();
  const [showMobile, setShowMobile] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const userId = JSON.parse(localStorage.getItem("d_user"));
  const location = useLocation();
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const handleNotific = (e) => {
    e.target.src = ProfileAvatar
  }


  const handleImage = (e) => {
    e.target.src = NoImage;
  };

  const logout = (e) => {
    localStorage.removeItem("d_user");
    localStorage.removeItem("d_userToken");
    navigate("/");
    window.location.reload();
  };
  const getUserProfile = async () => {
    if (auth) {
      await DataService.getSingleProfile(userId).then((data) => {
        setProfile(data?.data?.data?.user);
      });
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handlePayment = (price) => {
    setMessage("");
    const data = {};
    // data.userId = user_id;
    data.amount = price;

    DataService.GeneratePayment(data).then(
      (response) => {
        if (response.data.status === "Success") {
          toast("Link generated successfully!");
          console.log(response.data.data.url);
          const paymentUrl = response.data.data.url;
          window.location.replace(paymentUrl); // Use replace for proper redirection
        } else {
          toast("Failed to generate the payment link.");
        }
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        setLoading(false);
        toast.error(resMessage, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    );
  };
  const getPlans = async () => {
    if (auth) {
      await DataService.getPackages().then((data) => {
        setPackages(data?.data?.data);
      });
    }
  };
  useEffect(() => {
    getPlans();
  }, []);

  const getNotifications = async () => {
    if (auth) {
      await DataService.getNotification().then((data) => {
        setNotifications(data?.data?.data?.notifications);
        setNotificationLength(data?.data?.data?.counts.unread);
      });
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const handleNotification = (id) => {
    const data = {};
    data.ids = [id];
    DataService.UpdateNotification(data).then(
      () => {
        setTimeout(() => { }, 2000);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(resMessage, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setLoading(false);
        setMessage(resMessage);
      }
    );
  };
  useEffect(() => {
    const currentPath = location.pathname;
    const isCurrentPage = (path) => currentPath.startsWith(path);
    if (isCurrentPage("/my-profile")) {
      setActiveSection("profile");
    }
    // else if (isCurrentPage('/upload-gallery')) {
    //     setActiveSection('uploads');
    // }
    else if (isCurrentPage("/profile")) {
      setActiveSection("search");
    } else if (isCurrentPage("/my-friends")) {
      setActiveSection("friends");
    } else if (isCurrentPage("/chats")) {
      setActiveSection("messages");
    } else if (isCurrentPage("/edit-profile")) {
      setActiveSection("edit");
    }
  }, [location.pathname]);

  const handleButtonClick = (section) => {
    setActiveSection(section);
    switch (section) {
      case "profile":
        navigate("/my-profile");
        break;
      // case 'uploads':
      //     navigate("/upload-gallery")
      //     break;
      case "search":
        navigate("/profile");

        break;
      case "friends":
        navigate("/my-friends");
        break;
      case "messages":
        navigate("/chats");
        break;
      case "edit":
        navigate("/edit-profile");
        break;
      default:
        break;
    }
  };




  return (
    <>
      {payments && (
        <div className="payments_popup">
          <div className="payments_inner">
            <div className="container">
              <div className="payments_flexOne">
                <div className="payment_bg">
                  <div className="cross_btn">
                    <i
                      onClick={() => setPayments(false)}
                      class="fas fa-window-close"
                    ></i>
                  </div>
                  {packages?.length > 0
                    ? packages?.map((item) => {
                      return (
                        <>
                          <div className="payments_plan">
                            <h2>{item.credits}</h2>
                            <span className="bonus">{item.bonus}</span>
                            <h4>credits</h4>
                            <hr />
                            <h3>Just For</h3>
                            <p>
                              <span>
                                {item.currency} {item.price}
                              </span>
                            </p>
                            <hr />
                            <button
                              className="main_button"
                              onClick={() => handlePayment(item.price)}
                            >
                              Purchase Now
                            </button>
                          </div>
                        </>
                      );
                    })
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {auth && (
        <>
          <div className="cradits_bg">
            <div className="maincreadits">
              <div className="main_craedits_one">
                <Link to="/">
                  <img src={Logo} alt="" />
                </Link>
              </div>

              <div
                className="main_craedits_two"
                style={{ padding: "10px 0px" }}
              >
                <div className="translater_main">
                  <div id="google_translate_element"></div>
                  {/* <LanguageSelector /> */}
                </div>
                {/* <div id="google_translate_element"></div> */}

                {notification && (
                  <div className="notification_main profile_notification">
                    <div className="notification_pop">
                      <div className="payment_bg_notification">
                        <div className="notification_heading">
                          <h2>Notifications</h2>
                        </div>
                        {notifications?.length > 0
                          ? notifications?.map((item) => {
                            return (
                              <>
                                {item?.user ? (

                                  <Link to={item.type === 'message' ? "/chats/" + item?.user?.id : "/single-profile/" + item?.user?.id}>
                                    <div
                                      className="mainnotification_text"
                                      onClick={() =>
                                        handleNotification(item.id)
                                      }
                                    >
                                      <div className="ntificationone">
                                        <img onError={handleNotific}
                                          src={
                                            item?.user
                                              ? item?.user?.avatar
                                              : ProfileAvatar
                                          }
                                          
                                        />
                                      </div>
                                      <div className="notification_text">
                                        <p>{item?.body}</p>

                                        <h2>
                                          {item?.created_at
                                            ? moment(item?.created_at).format(
                                              "LT"
                                            )
                                            : " "}
                                        </h2>
                                      </div>
                                    </div>
                                  </Link>
                                ) : (
                                  <div
                                    className="mainnotification_text"
                                    onClick={() =>
                                      handleNotification(item.id)
                                    }
                                  >
                                    <div className="ntificationone">
                                      <img
                                        src={ProfileAvatar}
                                        alt="notification_image"
                                      />
                                    </div>
                                    <div className="notification_text">
                                      <p>{item?.body}</p>
                                      <h2>
                                        {item?.created_at
                                          ? moment(item?.created_at).format(
                                            "LT"
                                          )
                                          : " "}
                                      </h2>
                                    </div>
                                  </div>
                                )}
                              </>
                            );
                          })
                          : ""}
                      </div>
                    </div>
                  </div>
                )}
                <div className="notification_area">
                  <i
                    onClick={() => setShowNotification(!notification)}
                    class="fas fa-bell"
                  ></i>
                  <div
                    className="notification_count"
                    style={{ backgroundColor: "#fff" }}
                  >
                    <h1 style={{ color: "#300243" }}>{notificationLength}</h1>
                  </div>
                </div>
                <div className="span_credits white_spancredits">
                  <h1 style={{ color: "#fff" }}>Account Balance</h1>
                  <p style={{ color: "#fff" }}>
                    <b style={{ marginRight: "10px", color: "#fff" }}>
                      {profile?.credits}
                    </b>{" "}
                    Credits
                  </p>
                </div>
                <div className="buy_nowbtn">
                  <Link to="/packages">
                    <button className="main_buttonTwo credits">Buy now</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="toggle_btn">
            <div className="container">
              {/* toggle section */}
              <div className="toggle_area">
                <div className="logo_mobile_nav">
                  <img src={Logo} alt="" />
                </div>
                <div className="toggle_buttons">
                  {notification && (
                    <div className="notification_main ">
                      <div className="notification_pop">
                        <div className="payment_bg_notification">
                          <div className="notification_heading">
                            <h2>Notifications</h2>
                          </div>
                          {notifications?.length > 0
                            ? notifications?.map((item) => {
                              return (
                                <>
                                  {item?.user ? (
                                    <Link
                                      to={"/single-profile/" + item?.user?.id}
                                    >
                                      <div
                                        className="mainnotification_text"
                                        onClick={() =>
                                          handleNotification(item.id)
                                        }
                                      >
                                        <div className="ntificationone">
                                          <img
                                            src={
                                              item?.user
                                                ? item?.user?.avatar
                                                : ProfileAvatar
                                            }
                                            alt=""
                                          />
                                        </div>
                                        <div className="notification_text">
                                          <p>{item?.body}</p>

                                          <h2>
                                            {item?.created_at
                                              ? moment(
                                                item?.created_at
                                              ).format("LT")
                                              : " "}
                                          </h2>
                                        </div>
                                      </div>
                                    </Link>
                                  ) : (
                                    <div
                                      className="mainnotification_text"
                                      onClick={() =>
                                        handleNotification(item.id)
                                      }
                                    >
                                      <div className="ntificationone">
                                        <img
                                          src={
                                            item?.image
                                              ? item?.image?.url
                                              : ProfileAvatar
                                          }
                                          alt=""
                                        />
                                      </div>
                                      <div className="notification_text">
                                        <p>{item?.body}</p>
                                        <h2>
                                          {item?.created_at
                                            ? moment(item?.created_at).format(
                                              "LT"
                                            )
                                            : " "}
                                        </h2>
                                      </div>
                                    </div>
                                  )}
                                </>
                              );
                            })
                            : ""}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="notification_area">
                    <i
                      onClick={() => setShowNotification(!notification)}
                      class="fas fa-bell"
                    ></i>
                    <div
                      className="notification_count"
                      style={{ backgroundColor: "#fff" }}
                    >
                      <h1 style={{ color: "#300243" }}>{notificationLength}</h1>
                    </div>
                  </div>

                  <button onClick={() => setShowMobile(!showMobile)}>
                    <svg
                      data-v-ab08f53e=""
                      height="24px"
                      width="24px"
                      viewBox="0 -53 384 384"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        data-v-ab08f53e=""
                        d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
                        class="menu-svg"
                      ></path>
                      <path
                        data-v-ab08f53e=""
                        d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
                        class="menu-svg"
                      ></path>
                      <path
                        data-v-ab08f53e=""
                        d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
                        class="menu-svg"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="mobile_hide_credits">
              <div className="mobile_area_credits">
                <div className="span_credits white_spancredits">
                  <h1 style={{ color: "#300243" }}>Account Balance</h1>
                  <p style={{ color: "#300243" }}>
                    <b style={{ marginRight: "10px", color: "#300243" }}>
                      {profile?.credits}
                    </b>{" "}
                    Credits
                  </p>
                </div>
                <div className="buy_nowbtn">
                  <Link to="/packages">
                    <button className="main_buttonTwo credits">Buy now</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* toggle section */}

          <div className="profile_navbar hide_mobile_screen">
            <div className="container">
              <div className="user_profile_page">
                <Zoom>
                  <img onError={handleImage} src={profile?.avatar} />
                </Zoom>
                <h2>{profile?.name}</h2>
              </div>
              <div className="profile_main">
                <div className="profile_right">
                  <button
                    className={activeSection === "search" ? "active" : ""}
                    onClick={() => handleButtonClick("search")}
                  >
                    Search
                  </button>
                  <button
                    className={activeSection === "friends" ? "active" : ""}
                    onClick={() => handleButtonClick("friends")}
                  >
                    My Friends
                  </button>
                  <button
                    className={activeSection === "messages" ? "active" : ""}
                    onClick={() => handleButtonClick("messages")}
                  >
                    Messages
                  </button>
                  <button
                    className={activeSection === "profile" ? "active" : ""}
                    onClick={() => handleButtonClick("profile")}
                  >
                    Profile
                  </button>
                  {/* <button className={activeSection === 'uploads' ? 'active' : ''} onClick={() => handleButtonClick('uploads')}>My Uploads</button> */}
                </div>
                <div className="profile_left">
                  <button
                    className={activeSection === "edit" ? "active" : ""}
                    onClick={() => handleButtonClick("edit")}
                  >
                    Account settings
                  </button>
                  <button onClick={logout}>Logout</button>
                </div>
              </div>
            </div>
          </div>
          {showMobile && (
            <div className="profile_navbar ">
              <div className="container">
                <div className="user_profile_page">
                  <Zoom>

                    <img onError={handleImage} src={profile?.profile_path} />
                  </Zoom>
                  <h2>{profile?.name}</h2>
                </div>
                <div className="profile_main">
                  <div className="profile_right">
                    <button
                      className={activeSection === "search" ? "active" : ""}
                      onClick={() => handleButtonClick("search")}
                    >
                      Search
                    </button>
                    <button
                      className={activeSection === "friends" ? "active" : ""}
                      onClick={() => handleButtonClick("friends")}
                    >
                      My Friends
                    </button>
                    <button
                      className={activeSection === "messages" ? "active" : ""}
                      onClick={() => handleButtonClick("messages")}
                    >
                      Messages
                    </button>
                    <button
                      className={activeSection === "profile" ? "active" : ""}
                      onClick={() => handleButtonClick("profile")}
                    >
                      Profile
                    </button>
                    {/* <button className={activeSection === 'uploads' ? 'active' : ''} onClick={() => handleButtonClick('uploads')}>My Uploads</button> */}
                  </div>
                  <div className="profile_left">
                    <button
                      className={activeSection === "edit" ? "active" : ""}
                      onClick={() => handleButtonClick("edit")}
                    >
                      Account settings
                    </button>
                    <button onClick={logout}>Logout</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default NavbarProfile;
