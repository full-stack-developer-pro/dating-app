import React, { useEffect, useState, useRef } from "react";
import "../customCss/Home.css";
import "../customCss/SingleL.css";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import ProfileOne from "../images/profile1.jpg";
import ProfileTwo from "../images/profile2.jpg";
import ProfileThree from "../images/profile3.jpg";
import ProfileFour from "../images/profile4.jpg";
import ReactFlagsSelect from "react-flags-select";
import { Link, useParams } from "react-router-dom";
import DataService from "../services/data.service";
import LoadingBar from "react-top-loading-bar";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import ProfileAvatar from "../images/profile-avatar.png"
import NavbarProfile from "../common/NavbarProfile";


const SingleLProfile = () => {

  const navigate = useNavigate();
  const auth = AuthService.getCurrentUser();

  const params = useParams();
  const ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const [profile, getProfile] = useState([]);
  const [selectedGender, setSelectGender] = useState("All")
  const [isChecked, setIsChecked] = useState(false);
  const [searchCountry, setSearchCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const userId = JSON.parse(localStorage.getItem("d_user"));
  const [searchKeyword, setSearchKeyword] = useState('');

  const [isListVisible, setIsListVisible] = useState(true);

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
    setIsListVisible(true); // Show the list when the input changes
  };
  const HandleSelection = (e) => {
    setSelectGender(e.target.value)
  }
  const myStateData = {
    key1: selectedGender,
    key2: searchKeyword,
  };

  const handleSendMessageClick = () => {
    if (auth) {
      navigate("/chats/" + profile?.id);
    } else {
      setLogin(true);
    }
  };

  const getUserProfile = async () => {
    await DataService.getSingleProfile(params.id).then((data) => {
      getProfile(data?.data?.data?.user);
      ref.current.complete();
    });
  };
  const removeFriend = async (id) => {
    const data = {};
    data.friendId = id;
    setLoading(true);
    await DataService.removeMyFriend(userId, data).then(
      () => {
        setLoading(false);
        toast.success("Friend Removed Successfully!!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        getUserProfile();
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        toast.error(resMessage, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    );
  };

  const addFriend = async (id) => {
    const data = {};
    data.friendId = id;
    setLoading(true);
    await DataService.addMyFriend(userId, data).then(
      () => {
        setLoading(false);
        toast.success("Friend Added Successfully!!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        getUserProfile();
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        toast.error(resMessage, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    );
  };





  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    AuthService.login(username, password).then(
      () => {
        toast.success("Login Successfull!!")
        setTimeout(() => {
          window.location.reload();
        }, 2000)
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
    ref.current.continuousStart();
    document.title = "Profile";
    window.scrollTo(0, 0);
    getUserProfile();

  }, []);
  const getCity = async () => {
    await DataService.getCities(searchKeyword).then((data) => {
      setCities(data?.data?.data);
    });
  };

  const handleHideCity = (selectedCity) => {
    setSearchKeyword(selectedCity.city);
    setCities([]);
    setIsListVisible(false); // Hide the list when a city is selected
  };

  useEffect(() => {
    getCity();
  }, [searchKeyword]);
  const handleLockClick = () => {
    // Show login popup if not authenticated
    if (!auth) {
      setLogin(true);
    }
    // If authenticated, you can add additional logic here
  };

  const handleMe = (e) => {
    e.target.src = ProfileAvatar
  }
  return (
    <>
      <NavbarProfile />
      <LoadingBar color="#C952A0" ref={ref} height={5} shadow={true} />
      {/* <section className="profile_bannerSec" style={{ padding: "60px 0px", minHeight: "40vh" }}>
        <div className="container">
          <h1>User Profile</h1>
        </div>
      </section> */}
      <section className="single_profileArea">
        <div className="container">
          <div className="single_Pflex">

            <div className="single_pL_main">
              <div className="single_pL">
                <div className="single_lockOpen">
                  <img src={profile?.profile_path} onError={handleMe} alt="" />
                  <h5>{profile?.name}</h5>
                  <span className="single_age" style={{ textTransform: 'capitalize' }}>{profile?.age} ~ {profile?.gender}</span>
                  <span>
                    <i class="fas fa-map-marker-alt"></i>  {profile?.country}
                  </span>
                  {/* <button className="view_full">View Full Profile</button> */}
                  <div className="single_actionFlex">

                  </div>
                </div>
                <button className="send_m" onClick={handleSendMessageClick}>
                  Send Message<i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
            <div className="single_pM">

              {auth ? (
                // Render images if authenticated
                <div className="single_gallerySec">
                  {
                    profile?.images?.length > 0 ? profile?.images.map((item) => {
                      return (
                        <>
                          <div className="gallery_innerNew">
                            <img src={item?.url} alt="" />
                          </div>
                        </>
                      )
                    }) : ""
                  }

                  {/* <div className="gallery_innerNew">
                    <img src={ProfileTwo} alt="" />
                  </div>
                  <div className="gallery_innerNew ">
                    <img src={ProfileThree} alt="" />
                  </div>
                  <div className="gallery_innerNew">
                    <img src={ProfileFour} alt="" />
                  </div> */}
                </div>
              ) : login && (
                <div className="main_signUp main_login">
                  <div className="signup_popup login_popup">
                    <button className="close_icon" onClick={() => setLogin(false)}>
                      <i class="fas fa-times"></i>
                    </button>
                    <div className="signup_inner">
                      <h2>Login</h2>
                      <p>
                        Enter your details to login
                      </p>
                      <div className="signup_formSec">
                        <form>
                          {showError && (
                            <div className="error_bar">
                              <p>Please Fill out All fields !!</p>
                            </div>
                          )}
                          <div class="form-floating mb-4">
                            <input
                              type="email"
                              class="form-control"
                              id="floatingInput"
                              placeholder=""
                              onChange={(e) => setUsername(e.target.value)}
                            />
                            <label for="floatingInput">Email address</label>
                          </div>
                          <div class="form-floating mb-4">
                            <input
                              type="password"
                              class="form-control"
                              id="floatingPassword"
                              placeholder="Password"
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <label for="floatingPassword">Password</label>
                          </div>
                          <p className="forgot_pass">Forgot Password</p>
                          <div className="form_field">
                            <button className="main_button" onClick={handleLogin}>Submit</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="about_me_info">
                <h2>About me</h2>
                <div className="row mobile_profile_row">
                  <div className="col-lg-6 Mobile_profile">
                    <h3 className="text_about_me">Username</h3>
                  </div>
                  <div className="col-lg-6 Mobile_profile">
                    <p>{profile?.username}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 Mobile_profile">
                    <h3 className="text_about_me">Gender</h3>
                  </div>
                  <div className="col-lg-6 Mobile_profile">
                    <p>{profile?.gender}</p>

                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 Mobile_profile">
                    <h3 className="text_about_me">Age</h3>
                  </div>
                  <div className="col-lg-6 Mobile_profile">
                    <p>{profile?.age}</p>

                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 Mobile_profile">
                    <h3 className="text_about_me">Interests</h3>
                  </div>
                  <div className="col-lg-6 Mobile_profile">
                    <p>{profile?.interests ? profile.interests.join(', ') : ''}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 Mobile_profile">
                    <h3 className="text_about_me">Country</h3>
                  </div>
                  <div className="col-lg-6 Mobile_profile">
                    <p>{profile?.country}</p>

                  </div>
                </div>
              </div>

              {!auth && (
                <div className="single_gallerySec">
                  {
                    profile?.images?.length > 0 ? profile?.images.map((item) => {
                      return (
                        <>
                          <div className="gallery_inner" onClick={handleLockClick}>
                            <div className="lock_overlay">
                              <img src={item?.url} alt="" />
                            </div>
                            <i className="fas fa-lock"></i>
                          </div>
                        </>
                      )
                    }) : ""
                  }

                </div>
              )}



              {/* <button className="send_m"><Link to={"/chats/" + profile?.id}>Send Message<i class="fas fa-paper-plane"></i> </Link></button> */}

              {login && (
                <div className="main_signUp main_login">
                  <div className="signup_popup login_popup">
                    <button className="close_icon" onClick={() => setLogin(false)}>
                      <i class="fas fa-times"></i>
                    </button>
                    <div className="signup_inner">
                      <h2>Login</h2>
                      <p>
                        Enter your details to login
                      </p>
                      <div className="signup_formSec">
                        <form>
                          {showError && (
                            <div className="error_bar">
                              <p>Please Fill out All fields !!</p>
                            </div>
                          )}
                          <div class="form-floating mb-4">
                            <input
                              type="email"
                              class="form-control"
                              id="floatingInput"
                              placeholder=""
                              onChange={(e) => setUsername(e.target.value)}
                            />
                            <label for="floatingInput">Email address</label>
                          </div>
                          <div class="form-floating mb-4">
                            <input
                              type="password"
                              class="form-control"
                              id="floatingPassword"
                              placeholder="Password"
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <label for="floatingPassword">Password</label>
                          </div>
                          <p className="forgot_pass">Forgot Password</p>
                          <div className="form_field">
                            <button className="main_button" onClick={handleLogin}>Submit</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* {auth && (
                <button className="send_m"><Link to={"/chats/" + profile?.id}>Send Message<i class="fas fa-paper-plane"></i> </Link></button>
              )} */}
            </div>
            <div className="single_pR_main">
              <div className="single_pR">
                <div className="search_formSec">
                  <h4>Quick Search</h4>
                  <p style={{ margin: "0px" }}>
                    <strong>Gender</strong>
                  </p>
                  <div className="search_gender">
                    <div className="form_field mb-3 new_gender">

                      <div class="form-check new_genderinner">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="gender"
                          id="gender_other"
                          value="other"
                          checked={selectedGender === "All"}
                          onChange={HandleSelection}
                        />
                        <label class="form-check-label" for="gender_other">
                          All
                        </label>
                      </div>
                      <div class="form-check new_genderinner">
                        <input
                          class="form-check-input "
                          type="radio"
                          name="gender"
                          id="gender_male"
                          value="male"
                          checked={selectedGender === "male"}
                          onChange={HandleSelection}
                        />
                        <label class="form-check-label" for="gender_male">
                          Male
                        </label>
                      </div>
                      <div class="form-check new_genderinner">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="gender"
                          id="gender_female"
                          value="female"
                          checked={selectedGender === "female"}
                          onChange={HandleSelection}
                        />
                        <label class="form-check-label" for="gender_female">
                          Female
                        </label>
                      </div>

                    </div>
                  </div>
                  <div className="form_field country mb-3 search_m new_searchview">
                    <label>
                      <strong>Select Location</strong>
                    </label>
                    <input
                      type="search"
                      placeholder="Enter city name"
                      value={searchKeyword}
                      onChange={handleSearchChange}
                    />
                    {isListVisible && searchKeyword && (
                      <ul className="location_new">
                        {cities.map((city) => (
                          <li onClick={() => handleHideCity(city)} key={city.id}>
                            {city.city}
                          </li>
                        ))}
                      </ul>
                    )}

                  </div>
                  <Link className="search_submit" to={`/search-results?param1=${myStateData.key1}&param2=${myStateData.key2}`}>
                    Search<i class="fas fa-search"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SingleLProfile;
