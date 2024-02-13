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
import DatingCouple from "../images/datingAppCouple.png";
import DatingGirl from "../images/datingAppGirl.png";
import HowIt from "../images/how_it.jpg";
import DataService from "../services/data.service";
import LoadingBar from "react-top-loading-bar";
import SelectSearch from 'react-select-search';
// import { io } from "socket.io-client";
import axios from "axios";
import MultiRangeSlider from "multi-range-slider-react";
import ProfileAvatar from "../images/profile-avatar.png"

const Home = () => {
  // const socket = new WebSocket("ws://api.digitalmarketingcoursesinchandigarh.in:9091");

  const ref = useRef(null);
  const auth = AuthService.getCurrentUser();
  useEffect(() => {
    document.title = "Home";
    window.scrollTo(0, 0);
    ref.current.continuousStart();
    getAllUsers();
  }, []);
  const userId = JSON.parse(localStorage.getItem("d_user"));

  const today = new Date().toISOString().split("T")[0];

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);

  const [signup, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [stepFour, setStepFour] = useState(false);
  const [showError, setShowError] = useState(false);
  const [hide, setHide] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [apiError, setApiError] = useState("");

  const [isListVisible, setIsListVisible] = useState(true);

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
    setIsListVisible(true); // Show the list when the input changes
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  //Fields States Here
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("female");
  const [age, setAge] = useState("male");
  const [dob, setDob] = useState("");
  const [country, setCountry] = useState("");
  const [searchCountry, setSearchCountry] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [eyecolor, setEyeColor] = useState("");
  const [haircolor, setHairColor] = useState("");
  const [hairlength, setHairLength] = useState("");
  const [maritalstatus, setMaritalStatus] = useState("");
  const [hobbies, setHobbies] = useState([]);

  const [inputValue, setInputValue] = useState("");
  const [topBanner, setTopBanner] = useState([]);
  const [middleBanner, setMiddleBanner] = useState([]);
  const [secondLastBanner, setSecondLastBanner] = useState([]);
  // const [lastBanner, setlLastBanner] = useState([]);
  const [selectedGender, setSelectGender] = useState("All");
  const [selectedGenderSearch, setSelectedGenderSearch] = useState("female");
  const [members, setMembers] = useState([]);
  const [displayCount, setDisplayCount] = useState(6);
  const [ageGroup, setAgeGroup] = useState({ minValue: 18, maxValue: 100 });
  const [error, setError] = useState('');
  const [FlirtPopUP, setFlirtPopUP] = useState(false);



  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDob(selectedDate);
    const calculatedAge = calculateAge(selectedDate);
    setAge(calculatedAge);
  };

  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
  const maxDate = eighteenYearsAgo.toISOString().split('T')[0];


  // errors 
  const minLength = 6;
  const handleChange = (e) => {
    const enteredPassword = e.target.value;
    setPassword(enteredPassword);
  };
  const isPasswordValid = password.length >= minLength;

  const handleEmailChange = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);
    if (!enteredEmail.includes('@')) {
      setError('Email address must contain the @ symbol.');
    } else {
      setError('');
    }
  };
  // errors 

  const handleSliderChange = ({ minValue, maxValue }) => {
    setAgeGroup({ minValue, maxValue });
  };

  const handleViewAllClick = () => {
    setDisplayCount(users.length);
  };

  const HandleSelection = (e) => {
    setSelectGender(e.target.value);
  };
  const SearchHandleSelection = (e) => {
    setSelectedGenderSearch(e.target.value);
  };
  //  const ageGroupString = `${ageGroup.minValue}-${ageGroup.maxValue}`;

  const myStateData = {
    key1: selectedGenderSearch,
    key2: searchKeyword,
    key3: ageGroup.minValue,
    key4: ageGroup.maxValue,
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setHobbies([...hobbies, inputValue]);
      setInputValue("");
    }
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleDelete = (index) => {
    const newHobbies = [...hobbies];
    newHobbies.splice(index, 1);
    setHobbies(newHobbies);
  };
  const handleShowOne = () => {
    setStepTwo(false);
    setStepThree(false);
    setStepOne(true);
  };
  const handleBackOne = () => {
    setStepTwo(false);
    setStepThree(false);
    setStepFour(false);
    setStepOne(true);
  };
  const handleBackTwo = () => {
    setStepThree(false);
    setStepFour(false);
    setStepOne(false);
    setStepTwo(true);
  };
  const handleBackThree = () => {
    setStepTwo(false);
    setStepFour(false);
    setStepOne(false);
    setStepThree(true);
  };
  const handleShowTwo = () => {
    if (gender === "" || dob === "" || searchKeyword === "" || isChecked === false) {
      setShowError(true);
    } else {
      setShowError(false);
      setStepOne(false);
      setStepThree(false);
      setStepFour(false);
      setStepTwo(true);
    }
  };
  const handleShowThree = () => {
    if (
      username === "" ||
      name === "" ||
      email === "" ||
      password === ""
      // description === ""
    ) {
      setShowError(true);
    } else {
      setShowError(false);
      setStepTwo(false);
      setStepOne(false);
      setStepFour(false);
      setStepThree(true);
    }
  };
  const handleShowFour = () => {

    setShowError(false);
    setStepTwo(false);
    setStepOne(false);
    setStepThree(false);
    setStepFour(true);

  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (
    //   eyecolor === "" ||
    //   haircolor === "" ||
    //   maritalstatus === "" ||
    //   hobbies === ""
    // ) {
    //   setShowError(true);
    // } else {
    const data = {};
    data.is_fake = false;
    data.name = name;
    data.username = username;
    data.email = email;
    data.password = password;
    data.gender = gender;
    data.birthdate = dob;
    data.description = description;
    data.country = searchKeyword;
    data.city = searchKeyword;
    data.age = age;
    data.postcode = "16601";
    data.timezone = ["ds"];
    data.height = parseInt(height) ? parseInt(height) : "45";
    data.weight = parseInt(weight) ? parseInt(weight) : "56";
    data.eye_color = eyecolor ? eyecolor : "black";
    data.hair_color = haircolor ? eyecolor : "black";
    data.hair_length = "sd";
    data.marital_status = maritalstatus ? maritalstatus : "unmarried";
    data.interests = hobbies ? hobbies : "";
    data.credits = 200;
    data.free_message = "Hello world";
    data.is_verified = 0;
    data.is_flagged = false;
    data.photo = "https://example.com/path/to/photo.jpg";
    setLoading(true);
    await AuthService.register(data).then(
      () => {
        setLoading(false);
        toast.success("Profile create successfully! Please Login Now", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setApiError(resMessage);
        // toast.error(resMessage, {
        //   position: toast.POSITION.TOP_RIGHT,
        // });
      }
    );
    // }
  };

  const getAllUsers = async () => {
    await DataService.getAllUsers().then((data) => {
      setUsers(data?.data?.data?.users);
      ref.current.complete();
    });
  };
  // console.log(users)

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
        getAllUsers();
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
        getAllUsers();
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
  const [profile, setProfile] = useState([]);

  const getUserProfile = async () => {
    await DataService.getAllFriend(userId).then((data) => {
      setProfile(data?.data?.data);
    });
  };
  useEffect(() => {
    if (userId) {
      getUserProfile();
    }
  }, [userId]);

  const getTop = async () => {
    await DataService.getTopBanner().then((data) => {
      setTopBanner(data?.data?.data[0]);
      ref.current.complete();
    });
  };
  const getMiddle = async () => {
    await DataService.getMiddleBanner().then((data) => {
      setMiddleBanner(data?.data?.data[0]);
      ref.current.complete();
    });
  };
  const getSecondLast = async () => {
    await DataService.getSecondLastBanner().then((data) => {
      setSecondLastBanner(data?.data?.data[0]);
      ref.current.complete();
    });
  };
  // const getLast = async () => {
  //   await DataService.getLastBanner().then((data) => {
  //     setlLastBanner(data?.data?.data[0]);
  //     ref.current.complete();
  //   });
  // };
  // const getTotalMembers = async () => {
  //   await DataService.getMembers().then((data) => {
  //     setMembers(data?.data);
  //   });
  // };



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
    getTop();
    getMiddle();
    getSecondLast();
    // getLast();
    // getTotalMembers();
  }, []);

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
        setMessage(resMessage);
      }
    );
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
        setMessage(resMessage);
      }
    );
  };


  // let userid = JSON.parse(localStorage.getItem("d_user"));
  // const sendFlirt = (e, id) => {
  //   if (auth) {
  //     // e.preventDefault();
  //     const data = {
  //       senderId: userid,
  //       receiverId: id,
  //       message: "😃",
  //       // flirtMessage: flirtMessage
  //     };
  //     socket.emit("chat_message", data);
  //     // socket.on('chat_error', { message: 'Insufficient credits' });
  //     setTimeout(() => { }, 1000);
  //     setMessage("");
  //   } else {
  //     toast.error("Please Login First !!");
  //   }
  // };
  // socket.on("chat_error", (message) => {
  //   toast.error(message.message);
  //   setTimeout(() => { }, 2000);
  // });

  // socket.on("new_message", (data) => {
  //   setTimeout(() => { }, 1000);
  //   console.log("Received message:", data);
  //   console.log(data);
  // });

  // const setUser = () => {
  //   let userid = JSON.parse(localStorage.getItem("d_user"));
  //   socket.emit("user_added", userid);
  // };

  const handleImage = (e) => {
    e.target.src = ProfileAvatar
  }
  const handleBottom = (e) => {
    e.target.src = ProfileAvatar
  }


  return (
    <>
      <Navbar />
      <LoadingBar color="#C952A0" ref={ref} height={5} shadow={true} />
      <div
        className={auth ? "top_banner_two" : "top_banner"}
        id="signup"
        style={{
          background: `linear-gradient(#30024346, #15021b69), url(${DatingCouple})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50%",
        }}
      >

        <div className="top_bannerInner">
          {auth ? (
            ""
          ) : (
            <div className="signup_sec">
              <div className="signup_popup">
                <div className="signup_inner">
                  <h2>Sign Up Free!</h2>
                  <div className="signup_formSec">
                    {apiError && <h1 style={{ color: "red", fontSize: "15px", textAlign: "center", background: "#ffd8d8", padding: "10px 8px" }}>{apiError}</h1>}
                    {showError && (
                      <div className="error_bar">
                        <p>Please Fill out All fields !!</p>
                      </div>
                    )}
                    {stepOne && (
                      <div className="firstStep">
                        <div className="signup_topBar">
                          <span className="one active">1</span>
                          <span className="two">2</span>
                          <span className="three">3</span>
                          <span className="four">4</span>
                        </div>
                        <div className="form_field mb-3">
                          <p>
                            <strong>My Gender</strong>
                          </p>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="gender"
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
                              value="other"
                              checked={gender === "other"}
                              onChange={handleGenderChange}
                            />
                            <label class="form-check-label" for="gender_other">
                              Other
                            </label>
                          </div>
                        </div>
                        {/* <div class="form-floating mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder=""
                            required
                            onChange={(e) => setAge(e.target.value)}
                          />
                          <label for="floatingInput">My Age</label>
                        </div> */}
                        <div class="form-floating mb-3">
                          <input
                            type="date"
                            class="form-control"
                            id="floatingInput"
                            placeholder=""
                            required
                            max={maxDate}
                            onChange={handleDateChange}
                          />
                          <label for="floatingInput">Date of Birth</label>
                        </div>
                        <div className="form_field country mb-3 new_city">
                          <label>
                            <strong>My Location</strong>
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
                          {/* <select id="citySelect" onChange={(e)=>setCountry(e.target.value)}>
                            <option value="">Select a City/Town</option>
                            {cities.map((city, index) => (
                              <option key={index} value={city.city}>
                                {city.city}
                              </option>
                            ))}
                          </select> */}

                          {/* <ReactFlagsSelect
                            selected={country}
                            onSelect={(code) => setCountry(code)}
                            required
                          /> */}
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            I confirm that my age is 18+
                          </label>
                        </div>
                        <div className="signup_buttons">
                          <button
                            className="main_button next_button"
                            onClick={handleShowTwo}
                          >
                            Next<i class="fas fa-long-arrow-alt-right"></i>
                          </button>
                        </div>
                      </div>
                    )}
                    {stepTwo && (
                      <div className="secondStep">
                        <div className="signup_topBar">
                          <span className="one active">1</span>
                          <span className="two active">2</span>
                          <span className="three">3</span>
                          <span className="four">4</span>
                        </div>
                        <div class="form-floating mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder=""
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                          <label for="floatingInput">Username</label>
                        </div>
                        <div class="form-floating mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder=""
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <label for="floatingInput">Your Name</label>
                        </div>
                        <div class="form-floating mb-3">
                          <input
                            type="email"
                            class="form-control"
                            id="floatingInput"
                            placeholder=""
                            required
                            value={email}
                            onChange={handleEmailChange}
                          />
                          <label for="floatingInput">Email</label>
                          {error && <div style={{ color: 'red', fontSize: "14px", paddingTop: "10px" }}>{error}</div>}
                        </div>

                        <div class="form-floating mb-3">
                          <input
                            type="password"
                            class="form-control"
                            id="floatingInput"
                            placeholder=""
                            required
                            value={password}
                            onChange={handleChange}
                          />
                          <label for="floatingInput">Password</label>
                          {!isPasswordValid && (
                            <div style={{ color: 'red', fontSize: "14px", paddingTop: "10px" }}>Password must be at least 6 characters long</div>
                          )}
                        </div>



                        <div className="signup_buttons">
                          <button
                            className="main_button back_button"
                            onClick={handleBackOne}
                          >
                            <i class="fas fa-long-arrow-alt-left"></i> Back
                          </button>
                          <button
                            className="main_button next_button"
                            onClick={handleShowThree}
                          >
                            Next <i class="fas fa-long-arrow-alt-right"></i>
                          </button>
                        </div>
                      </div>
                    )}
                    {stepThree && (
                      <div className="thirdStep">
                        <div className="signup_topBar">
                          <span className="one active">1</span>
                          <span className="two active">2</span>
                          <span className="three active">3</span>
                          <span className="four">4</span>
                        </div>

                        {/* <div className="form-field row mb-3">
                          <div className="col-sm-6">
                            <div class="select_singup">
                              <label for="floatingInput">Eye Color</label>
                              <select value={eyecolor}
                                onChange={(e) => setEyeColor(e.target.value)}>
                                <option value="Black">Black</option>
                                <option value="Brown">Brown</option>
                              </select>
                            
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div class="select_singup">
                              <label for="floatingInput">Hair Color</label>
                              <select value={haircolor}
                                onChange={(e) => setHairColor(e.target.value)}>
                                <option value="Black">Black</option>
                                <option value="Brown">Brown</option>
                              </select>
                           
                            </div>
                          </div>
                        </div> */}

                        <div className="form-field row mb-3">

                          <div className="col-sm-12">
                            <div class="select_singup">
                              <label for="floatingInput">Marital Status</label>

                              <select value={maritalstatus}
                                onChange={(e) =>
                                  setMaritalStatus(e.target.value)
                                }>
                                <option value="Married">Married</option>
                                <option value="Unmarried">Unmarried</option>
                              </select>
                              {/* <input
                                type="text"
                                class="form-control"
                                id="floatingInput"
                                placeholder=""
                                required
                                value={maritalstatus}
                                onChange={(e) =>
                                  setMaritalStatus(e.target.value)
                                }
                              /> */}
                            </div>
                          </div>
                        </div>
                        <div className="form_field mb-3">
                          <div className="hobbies-list">
                            {hobbies.map((hobby, index) => (
                              <Hobby
                                key={index}
                                hobby={hobby}
                                onDelete={() => handleDelete(index)}
                              />
                            ))}
                          </div>
                          <div class="form-floating mb-3">
                            <input
                              type="text"
                              class="form-control"
                              id="floatingInput"
                              placeholder="Interests"
                              value={inputValue}
                              onChange={handleInputChange}
                              onKeyPress={handleKeyPress}
                              required
                            />
                            <label for="floatingInput">Interests</label>
                          </div>
                        </div>
                        <div class="form-floating mb-3">
                          <textarea
                            class="form-control"
                            placeholder=""
                            id="floatingTextarea2"
                            style={{ height: "100px" }}
                            onChange={(e) => setDescription(e.target.value)}
                          ></textarea>
                          <label for="floatingTextarea2">Description</label>
                        </div>
                        {/* <div class="form-floating mb-3">
                          <input
                            type="date"
                            class="form-control"
                            id="floatingInput"
                            placeholder=""
                            required
                            max={maxDate}                           
                             onChange={(e) => setDob(e.target.value)}
                          />
                          <label for="floatingInput">Date of Birth</label>
                        </div> */}
                        {/* 
                        <div className="form_field row mb-3">
                          <div className="col-sm-6">
                            <div class="form-floating mb-3">
                              <input
                                type="text"
                                class="form-control"
                                id="floatingInput"
                                placeholder=""
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                              />
                              <label for="floatingInput">City</label>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div class="form-floating mb-3">
                              <input
                                type="text"
                                class="form-control"
                                id="floatingInput"
                                value={postal}
                                placeholder=""
                                onChange={(e) => setPostal(e.target.value)}
                              />
                              <label for="floatingInput">Postal Code</label>
                            </div>
                          </div>
                        </div>
                        <div className="form-field row mb-3">
                          <div className="col-sm-6">
                            <div class="form-floating mb-3">
                              <input
                                type="text"
                                class="form-control"
                                id="floatingInput"
                                placeholder=""
                                required
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                              />
                              <label for="floatingInput">Height</label>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div class="form-floating mb-3">
                              <input
                                type="text"
                                class="form-control"
                                id="floatingInput"
                                placeholder=""
                                required
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                              />
                              <label for="floatingInput">Weight</label>
                            </div>
                          </div>
                        </div> */}
                        {/* <div className="form_field mb-3">
                          <p>Select Timezone</p>
                          <TimezoneSelect
                            value={timezone}
                            onChange={setTimezone}
                            required
                          />
                        </div> */}
                        <div className="sku_btn">
                          <button className="Skip_btn" onClick={handleShowFour}>Skip this</button>
                        </div>
                        <div className="signup_buttons">
                          <button
                            className="main_button back_button"
                            onClick={handleBackTwo}
                          >
                            <i class="fas fa-long-arrow-alt-left"></i> Back
                          </button>
                          <button
                            className="main_button next_button"
                            onClick={handleSubmit}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    )}
                    {stepFour && (
                      <div className="fourthStep">
                        <div className="signup_topBar">
                          <span className="one active">1</span>
                          <span className="two active">2</span>
                          <span className="three active">3</span>
                          <span className="four active">4</span>
                        </div>
                        <div className="new_skiptext" style={{ textAlign: "center", padding: "15px 0px" }} >
                          <label for="floatingInput" style={{ color: " #ef48b5", fontSize: "18px", fontWeight: "600" }}>Continue with these <br /> sigup details !</label>
                        </div>
                        {/* <div className="form-field row mb-3">
                          <div className="col-sm-6">
                            <div class="form-floating mb-3">
                              <input
                                type="text"
                                class="form-control"
                                id="floatingInput"
                                placeholder=""
                                required
                                onChange={(e) => setHeight(e.target.value)}
                              />
                              <label for="floatingInput">Height</label>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div class="form-floating mb-3">
                              <input
                                type="text"
                                class="form-control"
                                id="floatingInput"
                                placeholder=""
                                required
                                onChange={(e) => setWeight(e.target.value)}
                              />
                              <label for="floatingInput">Weight</label>
                            </div>
                          </div>
                        </div> */}

                        <div className="signup_buttons">
                          <button
                            className="main_button back_button"
                            onClick={handleBackThree}
                          >
                            <i class="fas fa-long-arrow-alt-left"></i> Back
                          </button>
                          <button
                            className="main_button next_button"
                            onClick={handleSubmit}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="content_sec">
            {/* <img src={Heart} alt="" className="heartTwo" /> */}
            <h1>{topBanner?.heading}</h1>
            <p dangerouslySetInnerHTML={{ __html: topBanner?.description }}></p>
            {
              !auth && (
                <button
                  className="main_button"
                  onClick={() => (window.location.href = "/#signup")}
                >
                  Join Free Now!<i class="fas fa-chevron-right"></i>
                </button>
              )
            }

            {/* <img src={HeartTwo} alt="" className="heartOne" /> */}
          </div>
        </div>
      </div>
      <section className="about_section">
        <div className="container">
          <div className="about_flex">
            <div className="about_flexL">
              {middleBanner?.images?.length > 0 ? (
                <img
                  onError={handleBottom}
                  src={
                    "http://api.digitalmarketingcoursesinchandigarh.in/" + middleBanner?.images[0]?.path
                  }
                  alt=""
                />
              ) :
                ""
              }
            </div>
            <div className="about_flexR">
              <h2>{middleBanner?.heading}</h2>
              <p
                style={{ fontSize: "14px", fontFamily: "'Outfit', sans-serif" }}
                dangerouslySetInnerHTML={{ __html: middleBanner?.description }}
              ></p>
            </div>
          </div>
        </div>
      </section>
      <section className="active_profilesSec">
        <div className="container">
          <div className="active_secFlex">
            <div className="activeM">
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
                        name="searchgender"
                        id="gender_all_search"
                        value="all"
                        checked={selectedGenderSearch === "all"}
                        onChange={SearchHandleSelection}
                      />
                      <label class="form-check-label" for="gender_all_search">
                        All
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="searchgender"
                        id="gender_male_search"
                        value="male"
                        checked={selectedGenderSearch === "male"}
                        onChange={SearchHandleSelection}
                      />
                      <label class="form-check-label" for="gender_male_search">
                        Male
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="searchgender"
                        id="gender_female_search"
                        value="female"
                        checked={selectedGenderSearch === "female"}
                        onChange={SearchHandleSelection}
                      />
                      <label class="form-check-label" for="gender_female_search">
                        Female
                      </label>
                    </div>

                  </div>
                  <div className="form_field country mb-3 search_m ">
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
                    {/* <select id="citySelect" onChange={(e) => setSearchCountry(e.target.value)}>
                      <option value="">Select a City/Town</option>
                      {cities.map((city, index) => (
                        <option key={index} value={city.city}>
                          {city.city}
                        </option>
                      ))}
                    </select> */}
                    {/* <ReactFlagsSelect
                      placeholder="Select a Town or City"
                      selected={searchCountry}
                      onSelect={(code) => setSearchCountry(code)}
                      required
                    /> */}
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
                    <Link
                      className="search_submit"
                      to={`/search-results?param1=${myStateData.key1}&param2=${myStateData.key2}&param3=${myStateData.key3}&param4=${myStateData.key4}`}
                    >
                      Search<i class="fas fa-search"></i>
                    </Link>
                  </div>
                </div>


              </div>


              <div className="active_mainArea">
                {users && users.length > 0 ? (
                  users.slice(0, displayCount).map((item, i) => {
                    if (item?.id !== userId) {
                      const isFriend = profile?.friends?.some(
                        (op) => op?.id === item?.id
                      );
                      return (
                        <>
                          <div className="active_mainProfile" key={i}>
                            <div className="active_mainFlex">
                              <div className="active_mainL">
                                {/* ProfileOne */}
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
                              </button> */}
                              {auth && (
                                <button onClick={() => setFlirtPopUP(!FlirtPopUP)}>
                                  Send Flirt<i className="fas fa-heart"></i>
                                </button>


                              )}

                              {auth && (
                                <button>
                                  <Link to={"/chats/" + item.id}>
                                    Message<i class="fas fa-comment-alt"></i>
                                  </Link>
                                </button>
                              )}
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
                    return null; // Skip rendering for the user's own profile
                  })
                ) : (
                  <p>No Data Found</p>
                )}
              </div>
              {/*              
              <button
                className="main_button my-4"
                onClick={() => (window.location.href = "/#signup")}
              >
                Sign Up Free!<i class="fas fa-long-arrow-alt-right"></i>
              </button> */}

              {users && users.length > displayCount && (
                <button className="main_button my-4" onClick={handleViewAllClick}>View All</button>
              )
              }
            </div>
          </div>
        </div>
      </section>
      <section className="about_section">
        <div className="container">
          <div className="about_flex">
            <div className="about_flexR">
              <h2>{secondLastBanner?.heading}</h2>
              <p style={{ fontSize: "14px", fontFamily: "'Outfit', sans-serif" }}
                dangerouslySetInnerHTML={{
                  __html: secondLastBanner?.description,
                }}
              ></p>
              {
                !auth && (
                  <button
                    className="main_button"
                    onClick={() => (window.location.href = "/#signup")}
                  >
                    Join For Free Here Right Now
                  </button>
                )}

            </div>
            <div className="about_flexL">
              {secondLastBanner?.images?.length > 0 ? (
                <img
                  onError={handleBottom}
                  src={
                    "http://api.digitalmarketingcoursesinchandigarh.in/" +
                    secondLastBanner?.images[0]?.path
                  }
                  alt=""
                />
              ) : ""}
            </div>
          </div>

        </div>
      </section>



      <Footer />
    </>
  );
};

export default Home;
