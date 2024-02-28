import React, { useEffect, useState, useRef } from "react";
import "../customCss/Home.css";
import Heart from "../images/heart.png";
import HeartTwo from "../images/heartTwo.png";
import Navbar from "../common/Navbar";
import ProfileOne from "../images/profile1.jpg";
import ProfileTwo from "../images/profile2.jpg";
import ProfileThree from "../images/profile3.jpg";
import ProfileFour from "../images/profile4.jpg";
import About from "../images/about.jpg";
import Steps from "../images/steps.png";
import Footer from "../common/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import ReactFlagsSelect from "react-flags-select";
import Logo from "../images/mature_friends_logo.jpeg";
import "../customCss/Navbar.css";
import TimezoneSelect from "react-timezone-select";
import Hobby from "../pages/Hobby";
import News from "../images/newsletter.png";

import DatingGirl from "../images/datingAppGirl.png";
import HowIt from "../images/how_it.jpg";
import DataService from "../services/data.service";
import LoadingBar from "react-top-loading-bar";
import { useLocation } from 'react-router-dom';
import MultiRangeSlider from "multi-range-slider-react";
import ProfileAvatar from "../images/profile-avatar.png"


const SearchResults = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([]);
  const ref = useRef(null);
  const userId = JSON.parse(localStorage.getItem("d_user"));
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState([]);
  const [country, setCountry] = useState("");
  const auth = AuthService.getCurrentUser();
  const [gender, setGender] = useState("male");
  const [members, setMembers] = useState([])
  const [FlirtPopUP, setFlirtPopUP] = useState(false);

  const [cities, setCities] = useState([]);
  const location = useLocation();
  const [searchKeyword, setSearchKeyword] = useState('');

  const [isListVisible, setIsListVisible] = useState(true);
  const queryParams = new URLSearchParams(location.search);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredData, setfilteredData] = useState([]);
  const [miles, setMiles] = useState(50);
  const [selectedCity, setSelectedCity] = useState({ uniqueId: "", city: "" });

  

  const sendFlirt = (id) => {
    DataService.PostFlirt(id).then(
      () => {
        toast.success("Wink Sent");
        setFlirtPopUP(false)
        setTimeout(() => {
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
      }
    );
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
    setIsListVisible(true); // Show the list when the input changes
  };
  // Access the state data
  const param1 = queryParams.get('param1');
  const param2 = queryParams.get('param2');
  const param3 = queryParams.get('param3')
  const param4 = queryParams.get('param4')
  const param5 = queryParams.get('param5')
  const param6 = queryParams.get('param6')
  const param7 = queryParams.get('param7')

  const [ageGroup, setAgeGroup] = useState({ minValue: 18, maxValue: 100 });

  const handleSliderChange = ({ minValue, maxValue }) => {
    setAgeGroup({ minValue, maxValue });
  };
  const getCity = async () => {
    await DataService.getCities(searchKeyword).then((data) => {
      setCities(data?.data?.data);
    });
  };

  const handleHideCity = (selectedCity) => {
    setSelectedCity(selectedCity);
    setSearchKeyword(selectedCity.city);
    setCities([]);
    setIsListVisible(false);
  };

  useEffect(() => {
    getCity();
  }, [searchKeyword]);


  useEffect(() => {
    setGender(param1);
    setCountry(param2);
    setAgeGroup({ minValue: Number(param3) || 18, maxValue: Number(param4) || 100 });
  }, []);
  

  const getTotalMembers = async () => {
    await DataService.getMembers().then((data) => {
      setMembers(data?.data);
    });
  };
  useEffect(() => {
    getCity()
    getTotalMembers()
  }, []);

  const getsearchData = async () => {
    await DataService.searchUsers(param1, param2, param3,param4,param5,param6,param7).then(
      (response) => {
        const totalUsers = response?.data?.data?.total_users;
        const totalPages = Math.ceil(totalUsers / 20);
        setUsers(response?.data?.data.users);
        setfilteredData(response?.data?.data?.users);
        setTotalPages(totalPages);
        ref.current.complete();
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        setLoading(false);
        toast.error("No Results Found with Selected Country & Gender!");
        setUsers([]);
      }
    );
  };
  useEffect(() => {
    getsearchData(20, 1);
  }, [param1, param2, param3, param4, param5, param6,param7]);

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const getUserProfile = async () => {
    await DataService.getAllFriend(userId).then((data) => {
      setProfile(data?.data?.data);
      ref.current.complete();
    });
  };

  const searchData = async (limit,page) => {
    try {
      const response = await DataService.searchUsers(limit,page,gender, selectedCity.uniqueId, ageGroup.minValue, ageGroup.maxValue,miles);
      const totalUsers = response?.data?.data?.total_users;
      const totalPages = Math.ceil(totalUsers / 20);
      setUsers(response?.data?.data.users);
      setfilteredData(response?.data?.data?.users);
      setTotalPages(totalPages);
      ref.current.complete();
      // toast.success("Data Searched");
    } catch (error) {
      const resMessage =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      setLoading(false);
      toast.error("No Results Found with Selected Country & Gender!");
      setUsers([]);
    }
  };



  const handlePageChange = async (page) => {
    setCurrentPage(page);
    await getsearchData(20, page);
  };
  

  const renderPaginationButtons = () => {
    console.log(totalPages);
    const maxVisibleButtons = 5;
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisibleButtons / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    const buttons = [];
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? "activated" : ""}
          disabled={loading}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="user_pagination">
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={loading}
          >
            <i class="fas fa-chevron-left"></i>
          </button>
        )}
        {buttons}
        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={loading}
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        )}
      </div>
    );
  };


  

  useEffect(() => {
    ref.current.continuousStart();
    if (userId) {
      getUserProfile();
    }
  }, [userId]);

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
        searchData();
        getUserProfile();
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
        searchData();
        getUserProfile();
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

  const handleNotification = (id) => {
    DataService.TrackProfile(id).then(
      () => {
        setTimeout(() => {
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
      }
    );
  };
  const goBack = () => {
    navigate(-1);
  };
  const handleImage = (e) => {
    e.target.src = ProfileAvatar
  }
  
  return (
    <>
      <LoadingBar color="#C952A0" ref={ref} height={5} shadow={true} />
      <section className="active_profilesSec height_search">
        <div className="container">
          <div className="back_button">
            <button onClick={goBack}> <i class="fas fa-long-arrow-alt-left"></i> Back</button>
          </div>
          <div className="active_secFlex">
            <div className="activeM" style={{ flex: "1" }}>
              <div className="search_formSec">
                <h4>Quick Search</h4>
                <div className="search_main">
                  <div className="search_gender_inner">
                    <p>
                      <strong>Gender</strong>
                    </p>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="gender"
                        id="gender_male"
                        value="male"
                        checked={gender === "male"}
                        onChange={handleGenderChange}
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
                        id="gender_Female"
                        value="Female"
                        checked={gender === "Female"}
                        onChange={handleGenderChange}
                      />
                      <label class="form-check-label" for="gender_Female">
                        Female
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="gender"
                        id="gender_other"
                        value="All"
                        checked={gender === "All"}
                        onChange={handleGenderChange}
                      />
                      <label class="form-check-label" for="gender_other">
                        Both
                      </label>
                    </div>
                  </div>

                  <div className="form_field country mb-3 search_m">
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
                  <div className="range_Age">
                    <label>
                      <strong>Within {miles} miles</strong>
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={100}
                      value={miles}
                      id="custom-range"
                      onChange={(e) => setMiles(parseInt(e.target.value, 10))}
                    />
                  </div>
                  <div className="range_Age">
                    <label>
                      <strong>Select Age</strong>
                    </label>
                    <MultiRangeSlider
                      min={18}
                      max={100}
                      minValue={ageGroup.minValue}
                      maxValue={ageGroup.maxValue}
                      onChange={handleSliderChange}
                    />
                  </div>
                  <div className="button_search">
                    <button className="search_submit" onClick={()=>searchData(20, 1)}>
                      Search<i class="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="active_mainArea">
                {filteredData && filteredData.length > 0 ? (
                  filteredData.map((item, i) => {
                    if (item?.id !== userId) {
                      const isFriend = profile?.friends?.some(
                        (op) => op?.id === item?.id
                      );
                      return (
                        <div className="active_mainProfile" key={i}>
                          <div className="active_mainFlex">
                            <div className="active_mainL">
                            <Link to={"/single-profile/" + item.id}>
                              <img src={item?.profile_path ? item?.profile_path : ProfileOne} alt="" onError={handleImage} />
                              </Link>
                            </div>
                            <div className="active_mainR">
                              <h4>{item?.name}</h4>
                              <span className="active_age">
                                {item?.age}~
                                {item?.gender === "male"
                                  ? "M"
                                  : item?.gender === "Female"
                                    ? "F"
                                    : "Other"}
                              </span>
                              <span>
                                <i className="fas fa-map-marker-alt"></i>
                               {item?.city_name}
                              </span>
                              <br />
                              {auth ? (
                                isFriend ? (
                                  <button
                                    className="add_friend already_friend"
                                    onClick={() => removeFriend(item?.id)}
                                  >
                                    Remove Friend
                                    <i className="fas fa-user-minus"></i>
                                  </button>
                                ) : (
                                  <button
                                    className="add_friend"
                                    onClick={() => addFriend(item?.id)}
                                  >
                                    Add Friend
                                    <i className="fas fa-user-plus"></i>
                                  </button>
                                )
                              ) : (
                                ""
                              )}
                              <p>{item?.description}</p>
                            </div>
                          </div>
                          <div className="active_actionSec">
                            <button onClick={() => handleNotification(item.id)}>
                              <Link to={"/single-profile/" + item.id}>
                                View<i className="fas fa-eye"></i>
                              </Link>
                            </button>
                            {/* <button>
                              Like<i className="fas fa-thumbs-up"></i>
                            </button>
                            <button>
                              Send Wink<i className="fas fa-heart"></i>
                            </button> */}
                              {auth && (
                                <button onClick={()=>setFlirtPopUP(!FlirtPopUP)}>
                                  Send Wink<i className="fas fa-heart"></i>
                                </button>
                              )}
                            <button>
                              <Link to={"/chats/" + item.id}>
                                Send Message<i class="fas fa-comment-alt"></i>
                              </Link>
                            </button>
                          </div>
                          {FlirtPopUP && (
                                <div className="main_sendFlirt">
                                  <div className="sendFlirt">
                                    <button className="new_flirt_cross" onClick={() => setFlirtPopUP(false)}>
                                      <i class="fas fa-times"></i>
                                    </button>
                                    <div className="sendFlirt_inner ">
                                      <h2></h2>
                                      <p style={{fontSize:"18px"}}>Flirt your way to fun for just <b>100 credits</b> <br/> try it now!</p>
                                        <button className="send_ok_flirt" onClick={() => sendFlirt(item.id)}>Send</button>
                                    </div>
                                  </div>
                                </div>
                              )}
                        </div>
                      );
                    }
                    return null; // Skip rendering for the user's own profile
                  })
                ) : (
                  <p>No Data Found</p>
                )}
              </div>
              {renderPaginationButtons()}

              {!auth &&
                <button
                  className="main_button my-4"
                  onClick={() => (window.location.href = "/#signup")}
                >
                  Create Account<i class="fas fa-long-arrow-alt-right"></i>
                </button>
              }

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchResults;