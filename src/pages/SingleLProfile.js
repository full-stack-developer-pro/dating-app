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

  const HandleSelection = (e) => {
    setSelectGender(e.target.value)
  }
  const myStateData = {
    key1: selectedGender,
    key2: searchCountry,
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
    await DataService.getCities().then((data) => {
      setCities(data?.data?.data);
    });
  };
  useEffect(() => {
    getCity();
  }, []);
  const handleLockClick = () => {
    // Show login popup if not authenticated
    if (!auth) {
      setLogin(true);
    }
    // If authenticated, you can add additional logic here
  };

  return (
    <>
      <Navbar />
      <LoadingBar color="#C952A0" ref={ref} height={5} shadow={true} />
      <section className="profile_bannerSec">
        <div className="container">
          <h1>User Profile</h1>
          <span>Home / User Profile</span>
        </div>
      </section>
      <section className="single_profileArea">
        <div className="container">
          <div className="single_Pflex">
            <div className="single_pL">
              <div className="single_lockOpen">
                <img src={ProfileOne} alt="" />
                <h5>{profile?.name}</h5>
                <span className="single_age" style={{ textTransform: 'capitalize' }}>{profile?.age} ~ {profile?.gender}</span>
                <span>
                  <i class="fas fa-map-marker-alt"></i> {profile?.city}, {profile?.country}
                </span>
                {/* <button className="view_full">View Full Profile</button> */}
                <div className="single_actionFlex">

                  {/* <button>Like</button> */}
                  {/* {auth ? (
                    ? (
                      <button
                        onClick={() => removeFriend(profile?.id)}
                      >
                        Remove Friend
                        <i className="fas fa-user-minus"></i>
                      </button>
                    ) : (
                      <button
                        onClick={() => addFriend(profile?.id)}
                      >
                        Add Friend
                        <i className="fas fa-user-plus"></i>
                      </button>
                    )
                  ) : (
                    ""
                  )} */}
                  {/* <button>Follow</button>
                  <button>Block</button> */}
                </div>
              </div>
              {/* <h4>Who is Online</h4> */}
              {/* <div className="online_profiles">
              <Link to="/chats">
                <div className="onlineInner">
                  <img src={ProfileOne} alt="" />
                  <i class="fas fa-circle"></i>
                </div>
                </Link>
                <Link to="/chats">
                <div className="onlineInner">
                  <img src={ProfileThree} alt="" />
                  <i class="fas fa-circle"></i>
                </div>
                </Link>
                <Link to="/chats">
                <div className="onlineInner">
                  <img src={ProfileFour} alt="" />
                  <i class="fas fa-circle"></i>
                </div>
                </Link>
              </div> */}
            </div>
            <div className="single_pM">

              {auth ? (
                // Render images if authenticated
                <div className="single_gallerySec">
                  <div className="gallery_innerNew">
                    <img src={ProfileOne} alt="" />
                  </div>
                  <div className="gallery_innerNew">
                    <img src={ProfileTwo} alt="" />
                  </div>
                  <div className="gallery_innerNew ">
                    <img src={ProfileThree} alt="" />
                  </div>
                  <div className="gallery_innerNew">
                    <img src={ProfileFour} alt="" />
                  </div>
                </div>
              ) : login && (
                <div className="main_signUp main_login">
                  <div className="signup_popup">
                    <button className="close_icon" onClick={() => setLogin(false)}>
                      <i class="fas fa-times"></i>
                    </button>
                    <div className="signup_inner">
                      <h2>Login</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Cras commodo ex eget sodales fringill.
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

              {!auth && (
                <div className="single_gallerySec">
                  <div className="gallery_inner" onClick={handleLockClick}>
                    <div className="lock_overlay">
                      <img src={ProfileOne} alt="" />
                    </div>
                    <i className="fas fa-lock"></i>
                  </div>
                  <div className="gallery_inner" onClick={handleLockClick}>
                    <div className="lock_overlay">
                      <img src={ProfileTwo} alt="" />
                    </div>
                    <i className="fas fa-lock"></i>
                  </div>
                  <div className="gallery_inner" onClick={handleLockClick}>
                    <div className="lock_overlay">
                      <img src={ProfileThree} alt="" />
                    </div>
                    <i className="fas fa-lock"></i>
                  </div>
                  <div className="gallery_inner" onClick={handleLockClick}>
                    <div className="lock_overlay">
                      <img src={ProfileFour} alt="" />
                    </div>
                    <i className="fas fa-lock"></i>
                  </div>
                </div>
              )}
              {/* <div className="gallery_inner">
                  <div className="lock_overlay">
                    <img src={ProfileOne} alt="" />
                  </div>
                  <i class="fas fa-lock"></i>
                </div>
                <div className="gallery_inner">
                  <div className="lock_overlay">
                    <img src={ProfileTwo} alt="" />
                  </div>
                  <i class="fas fa-lock"></i>
                </div>
                <div className="gallery_inner">
                  <div className="lock_overlay">
                    <img src={ProfileThree} alt="" />
                  </div>
                  <i class="fas fa-lock"></i>
                </div>
                <div className="gallery_inner">
                  <div className="lock_overlay">
                    <img src={ProfileFour} alt="" />
                  </div>
                  <i class="fas fa-lock"></i>
                </div> */}


              <button className="send_m" onClick={handleSendMessageClick}>
                Send Message<i className="fas fa-paper-plane"></i>
              </button>
              {/* <button className="send_m"><Link to={"/chats/" + profile?.id}>Send Message<i class="fas fa-paper-plane"></i> </Link></button> */}

              {login && (
                <div className="main_signUp main_login">
                  <div className="signup_popup">
                    <button className="close_icon" onClick={() => setLogin(false)}>
                      <i class="fas fa-times"></i>
                    </button>
                    <div className="signup_inner">
                      <h2>Login</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Cras commodo ex eget sodales fringill.
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
            <div className="single_pR">
              <div className="search_formSec">
                <h4>Quick Search</h4>
                <div className="search_gender">
                  <div className="form_field mb-3">
                    <p>
                      <strong>My Gender</strong>
                    </p>
                    <div class="form-check">
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
                    <div class="form-check">
                      <input
                        class="form-check-input"
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
                    <div class="form-check">
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
                  <select id="citySelect" onChange={(e) => setSearchCountry(e.target.value)}>
                    <option value="">Select a City/Town</option>
                    {cities.map((city, index) => (
                      <option key={index} value={city.city}>
                        {city.city}
                      </option>
                    ))}
                  </select>
                  {/* <ReactFlagsSelect
                    selected={searchCountry}
                    onSelect={(code) => setSearchCountry(code)}
                    required
                  /> */}
                </div>
                <Link className="search_submit" to={`/search-results?param1=${myStateData.key1}&param2=${myStateData.key2}`}>
                  Search<i class="fas fa-search"></i>
                </Link>
              </div>
              {/* <div className="recently_joined">
                <h3>Members Near You</h3>
                <div className="active_recent">
                  <div className="active_rInner">
                    <img src={ProfileOne} alt="" />
                    <h4>Jessica M.</h4>
                  </div>
                  <div className="active_rInner">
                    <img src={ProfileTwo} alt="" />
                    <h4>Emily W.</h4>
                  </div>
                  <div className="active_rInner">
                    <img src={ProfileThree} alt="" />
                    <h4>Jessica M.</h4>
                  </div>
                  <div className="active_rInner">
                    <img src={ProfileFour} alt="" />
                    <h4>Emily W.</h4>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <section className="most_visited">
        <div className="container">
          <h2 className="main_title">Most Visited Locations</h2>
          <div className="most_visitedFlex">
            <span>America</span>
            <span>India</span>
            <span>Australia</span>
            <span>Egypt</span>
            <span>Russia</span>
            <span>Canada</span>
            <span>United Kingdom</span>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SingleLProfile;
