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
import { useLocation, useNavigate, useHistory } from 'react-router-dom';
// import { useParams } from "react-router-dom";
import MultiRangeSlider from "multi-range-slider-react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import NavbarProfile from "../common/NavbarProfile";
import ProfileAvatar from "../images/profile-avatar.png"
import LanguageSelector from "../common/LanguageSelector";


const MAX_COUNT = 5;

const Profile = () => {
  const city_iid = JSON.parse(localStorage.getItem("city_id"))
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
  const [miles, setMiles] = useState(150);
  const [selectedCity, setSelectedCity] = useState({ uniqueId: city_iid ? city_iid : "", city: "" });

  const [isFirstRender, setIsFirstRender] = useState(true);
  const [flirtId, setFlirtId] = useState(null);


  const openFlirtPopup = (id) => {
    setFlirtId(id);
    setFlirtPopUP(true);
  };

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

  // ... (other useEffect hooks)

  const isInitialRender = useRef(true);

  // ... (other useEffect hooks)

  useEffect(() => {
    if (!isInitialRender.current) {
      const cityIdParam = queryParams.get("cityId");
      const cityNameParam = queryParams.get("cityName");

      if (cityIdParam && cityNameParam) {
        setSelectedCity({
          uniqueId: cityIdParam,
          city: cityNameParam,
        });
      }
    } else {
      isInitialRender.current = false;
    }
  }, [location.search]);

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
    setIsListVisible(true);
    if (e.target.value === '') {
      setSelectedCity({ uniqueId: "", city: "" });
    }
  };
  const updateFilters = (newMiles, newAgeGroup) => {
    setMiles(newMiles);
    setAgeGroup(newAgeGroup);
  };

  const handleSliderChange = ({ minValue, maxValue }) => {
    updateFilters(miles, { minValue, maxValue });
  };

  const handleMilesChange = (e) => {
    updateFilters(parseInt(e.target.value, 10), ageGroup);
  };

  const handleFilterChange = () => {
    if (isListVisible) {
      searchData(20, currentPage);
    }
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
    window.scrollTo(0, 0);
    ref.current.continuousStart();
    getCity()
  }, []);
  ;

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    setSelectedCity({ uniqueId: "", city: "" });

  };


  const searchData = async (limit, page) => {
    try {
      setLoading(true)
      const cityId = selectedCity.uniqueId || '';
      const cityName = selectedCity.city || '';
      const response = await DataService.searchUsers(limit, page, gender, cityId, ageGroup.minValue, ageGroup.maxValue, miles);
      const totalUsers = response?.data?.data?.total_users;
      const totalPages = Math.ceil(totalUsers / limit);
      setUsers(response?.data?.data.users);
      setfilteredData(response?.data?.data?.users);
      setLoading(false)
      setTotalPages(totalPages);
      ref.current.complete();
      // toast.success("Data Searched");
    } catch (error) {
      const resMessage =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      setLoading(false);
      setUsers([]);
    }
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    setGender(params.gender || "");
    setSelectedCity({
      uniqueId: params.cityId || city_iid,
      city: params.cityName || "",
    });
    setAgeGroup({
      minValue: parseInt(params.minAge, 10) || 18,
      maxValue: parseInt(params.maxAge, 10) || 100,
    });

    if (!isFirstRender) {
      searchData(20, 1);
    } else {
      setIsFirstRender(false);
    }
  }, [location.search, isFirstRender]);

  useEffect(() => {
    if (!isFirstRender) {
      const urlSearchParams = new URLSearchParams();
      urlSearchParams.append("gender", gender);
      urlSearchParams.append("miles", miles);
      urlSearchParams.append("cityId", selectedCity.uniqueId ? selectedCity.uniqueId : city_iid);
      urlSearchParams.append("cityName", selectedCity.city);
      urlSearchParams.append("minAge", ageGroup.minValue);
      urlSearchParams.append("maxAge", ageGroup.maxValue);

      navigate({ search: urlSearchParams.toString() });
    }
  }, [gender, miles, selectedCity, ageGroup, navigate, isFirstRender, city_iid]);


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
                          <li onClick={() => handleHideCity(city)} key={city.uniqueId}>
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
                      max={300}
                      value={miles}
                      id="custom-range"
                      onChange={handleMilesChange}
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
                    <button className="search_submit" onClick={handleFilterChange}>
                      Search<i class="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="active_mainArea">
                {loading && (
                  <div className="main_spinner">
                    <div class="spinner-border" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                )}
                {!loading && filteredData && filteredData.length > 0 ? (
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

                                  <img src={item?.avatar ? item?.avatar : ProfileOne} alt="" onError={handleImagenew} />
                                </Link>
                              </div>
                              <div className="active_mainR">
                                <h4>{item?.name}</h4>
                                <span className="active_age">
                                  {item?.age}~
                                  {item?.gender == "male"  || item?.gender == "Male"
                                    ? "M"
                                    : item?.gender == "Female" || item?.gender == "female"
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

                              {auth &&
                                <button key={item.id} onClick={() => openFlirtPopup(item.id)}>
                                  Send Wink<i className="fas fa-heart"></i>
                                </button>
                              }


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
                                    <p style={{ fontSize: "18px" }}>
                                      Flirt your way to fun for just <b>100 credits</b> <br /> try it now!
                                    </p>
                                    <button className="send_ok_flirt" onClick={() => sendFlirt(flirtId)}>
                                      Send
                                    </button>
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
                  <p>No results found.</p>
                )}
              </div>
              {/* Pagination buttons */}
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
      <Footer />
    </>
  );
};

export default Profile;
