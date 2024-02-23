import React, { useEffect, useState, useRef } from "react";
import "../customCss/Profile.css";
import "../customCss/Home.css";
import ProfileOne from "../images/profile1.jpg";
import Verified from "../images/verified.jpg";
import Footer from "../common/Footer";
import DataService from "../services/data.service";
import moment from "moment";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from 'react-router-dom';
// import { useParams } from "react-router-dom";
import MultiRangeSlider from "multi-range-slider-react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import NavbarProfile from "../common/NavbarProfile";
import ProfileAvatar from "../images/profile-avatar.png"
import LanguageSelector from "../common/LanguageSelector";


const MAX_COUNT = 5;

const Profile = () => {
  const ref = useRef(null);
  // const params = useParams();

  // search filters 
  const navigate = useNavigate()
  const [usersData, setUsers] = useState([]);
  const auth = AuthService.getCurrentUser();
  const [gender, setGender] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [FlirtPopUP, setFlirtPopUP] = useState(false);

  // search filters 
  const [profile, setProfile] = useState([]);
  const userId = JSON.parse(localStorage.getItem("d_user"));
  const [ageGroup, setAgeGroup] = useState({ minValue: 18, maxValue: 100 });
  // const [currentPage, setCurrentPage] = useState(1);
  // const [usersPerPage] = useState(5);
  // const indexOfLastUser = currentPage * usersPerPage;
  // const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // const currentUsers = usersData.slice(indexOfFirstUser, indexOfLastUser);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredData, setfilteredData] = useState([]);
  // const paginate = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };


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


  const getUserProfile = async () => {
    await DataService.getAllFriend(userId).then((data) => {
      setProfile(data?.data?.data);
      ref.current.complete();
    });
  };
  useEffect(() => {
    if (userId) {
      getUserProfile();
    }
  }, [userId]);


  const location = useLocation();
  const [searchKeyword, setSearchKeyword] = useState('');

  const [isListVisible, setIsListVisible] = useState(true);
  const queryParams = new URLSearchParams(location.search);

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
    setIsListVisible(true); // Show the list when the input changes
  };


  const handleSliderChange = ({ minValue, maxValue }) => {
    setAgeGroup({ minValue, maxValue });
  };
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


  useEffect(() => {
    window.scrollTo(0, 0);
    ref.current.continuousStart();
    getCity()
  }, []);
  ;

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };


  const searchData = async (limit, page) => {
    try {
      const response = await DataService.searchUsers(limit, page, gender, searchKeyword, ageGroup.minValue, ageGroup.maxValue);
      const totalUsers = response?.data?.data?.total_users;
      const totalPages = Math.ceil(totalUsers / limit);
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

  useEffect(() => {
    searchData(20, 1);
  }, [gender, searchKeyword, ageGroup.minValue, ageGroup.maxValue]);

  useEffect(() => {
    ref.current.continuousStart();
    if (userId) {
      getUserProfile();
    }
  }, [userId]);

  const addNewFriend = async (id) => {
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

  const handleNotificationTwo = (id) => {
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
  const handleImagenew = (e) => {
    e.target.src = ProfileAvatar
  }

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    await searchData(20, page);
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


  return (
    <>
      {/* <Navbar /> */}
      <NavbarProfile />
      <LoadingBar color="#C952A0" ref={ref} height={5} shadow={true} />
      <section className="active_profilesSec height_search">
        <div className="container">
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
                        id="gender_female"
                        value="female"
                        checked={gender === "female"}
                        onChange={handleGenderChange}
                      />
                      <label class="form-check-label" for="gender_female">
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
                    <button className="search_submit" onClick={searchData}>
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
                        <>
                          <div className="active_mainProfile" key={i}>
                            <div className="active_mainFlex">
                              <div className="active_mainL">
                                <Link to={"/single-profile/" + item.id}>

                                  <img src={item?.profile_path ? item?.profile_path : ProfileOne} alt="" onError={handleImagenew} />
                                </Link>
                              </div>
                              <div className="active_mainR">
                                <h4>{item?.name}</h4>
                                <span className="active_age">
                                  {item?.age}~
                                  {item?.gender === "male"
                                    ? "M"
                                    : item?.gender === "female"
                                      ? "F"
                                      : "Other"}
                                </span>
                                <span>
                                  <i className="fas fa-map-marker-alt"></i>
                                  {item?.country}
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
                                      onClick={() => addNewFriend(item?.id)}
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
                              <button onClick={() => handleNotificationTwo(item.id)}>
                                <Link to={"/single-profile/" + item.id}>
                                  View<i className="fas fa-eye"></i>
                                </Link>
                              </button>

                              <button onClick={() => setFlirtPopUP(!FlirtPopUP)}>
                                Send Wink<i className="fas fa-heart"></i>
                              </button>

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
                                    <p style={{ fontSize: "18px" }}>Flirt your way to fun for just <b>100 credits</b> <br /> try it now!</p>
                                    <button className="send_ok_flirt" onClick={() => sendFlirt(item.id)}>Send</button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </>
                      );
                    }
                    return null;
                  })
                ) : (
                  <p>No Data Found</p>
                )}
              </div>
              {/* Pagination buttons */}
              {renderPaginationButtons()}

              {/* <div className="pagination">
                  <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                  </button>
                  {Array.from({ length: Math.ceil(usersData.length / usersPerPage) }, (_, i) => (
                    <button  key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'page-btn-active' : "button_page"}>
                      {i + 1}
                    </button>
                  ))}
                  <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(usersData.length / usersPerPage)}>
                    Next
                  </button>
                </div> */}
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
      <Footer />
    </>
  );
};

export default Profile;
