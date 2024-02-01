import React, { useEffect, useState, useRef } from "react";
import Navbar from "../common/Navbar";
import "../customCss/Profile.css";
import "../customCss/Home.css";
import ProfileOne from "../images/profile1.jpg";
import Verified from "../images/verified.jpg";
import Footer from "../common/Footer";
import DataService from "../services/data.service";
import moment from "moment";
import LoadingBar from "react-top-loading-bar";
import TimezoneSelect from "react-timezone-select";
import ReactFlagsSelect from "react-flags-select";
import HobbyEdit from "./HobbyEdit";
import { ToastContainer, toast } from 'react-toastify';
import NavbarProfile from "../common/NavbarProfile";
import UploadGallery from "./UploadGallery";


const EditProfile = () => {
  const ref = useRef(null);
  const today = new Date().toISOString().split("T")[0];
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("male");
  const [birthdate, setBirthdate] = useState("");
  const [age, setAge] = useState("male");
  const [dob, setDob] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  // const [timezone, setTimezone] = useState(
  //   Intl.DateTimeFormat().resolvedOptions().timeZone
  // );
  const [timezone, setTimezone] = useState([Intl.DateTimeFormat().resolvedOptions().timeZone]);

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [eye_color, setEyeColor] = useState("");
  const [hair_color, setHairColor] = useState("");
  const [hair_length, setHairLength] = useState("");
  const [is_fake, setIsfake] = useState("");
  const [isflagged, setIsflagged] = useState("");
  const [isverified, setIsverified] = useState("");
  const [free_message, setFree_message] = useState("");
  const [message, setMessage] = useState("");


  const [marital_status, setMaritalStatus] = useState("");
  const [interests, setInterests] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [profile, getProfile] = useState([]);
  const [loading, setLoading] = useState(false)
  const [cities, setCities] = useState([]);
  const [credits, setCredits] = useState("");
  const [status, setStatus] = useState("");
  const [searchKeyword, setSearchKeyword] = useState('');
  const [profileImage, setProfileImage] = useState('');


  const [showEditProfile, setShowEditProfile] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showUploads, setShowUploads] = useState(false);
  const [recentPayments, setRecentPayments] = useState('');

  const userId = JSON.parse(localStorage.getItem("d_user"));
  const [isListVisible, setIsListVisible] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState("off");
  const [notificationValue, setNotificationValue] = useState("");


  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
    setIsListVisible(true); // Show the list when the input changes
  };
  const getUserProfile = async () => {
    await DataService.getSingleProfile(userId).then((data) => {
      getProfile(data?.data?.data?.user);
      setGender(data?.data?.data?.user?.gender)
      setSearchKeyword(data?.data?.data?.user?.country)
      setCredits(data?.data?.data?.user?.credits)
      setUsername(data?.data?.data?.user?.username)
      setDescription(data?.data?.data?.user?.description)
      let sDate = data?.data?.data?.user?.birthdate.split("T");
      setBirthdate(sDate[0])
      setName(data?.data?.data?.user?.name)
      setCity(data?.data?.data?.user?.city)
      setPostcode(data?.data?.data?.user?.postcode)
      setHeight(data?.data?.data?.user?.height)
      setWeight(data?.data?.data?.user?.weight)
      setEyeColor(data?.data?.data?.user?.eye_color)
      setHairColor(data?.data?.data?.user?.hair_color)
      setHairLength(data?.data?.data?.user?.hair_length)
      setMaritalStatus(data?.data?.data?.user?.marital_status)
      setHobbies(data?.data?.data?.user?.interests || []);
      setIsfake(data?.data?.data?.user?.is_fake)
      setIsflagged(data?.data?.data?.user?.is_flagged)
      setIsverified(data?.data?.data?.user?.is_verified)
      setAge(data?.data?.data?.user?.age)
      setFree_message(data?.data?.data?.user?.free_message)
      setStatus(data?.data?.data?.user?.status)
      setEmail(data?.data?.data?.user?.email)
      setPassword(data?.data?.data?.user?.password)
      setProfileImage(data?.data?.data?.user?.profile_path)
      const sendNotificationsValue = data?.data?.data?.user?.send_notifications;

      setNotificationValue(sendNotificationsValue);

      setNotificationStatus(sendNotificationsValue === 1 ? "on" : "off");

      ref.current.complete();
    });
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
    setBirthdate(selectedDate);
    const calculatedAge = calculateAge(selectedDate);
    setAge(calculatedAge);
  };

  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
  const maxDate = eighteenYearsAgo.toISOString().split('T')[0];

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
    document.title = "Profile";
    window.scrollTo(0, 0);
    getUserProfile();
    ref.current.continuousStart();
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {};
    data.is_fake = false;
    data.name = name;
    data.username = username;
    data.email = email;
    data.password = password;
    data.gender = gender;
    data.birthdate = birthdate;
    // data.description = description;
    data.country = searchKeyword;
    data.city = city;
    data.age = age;
    data.postcode = postcode;
    // data.timezone = timezone;
    // data.height = height;
    // data.weight = weight;
    data.eye_color = eye_color;
    data.hair_color = hair_color;
    // data.hair_length = hair_length;
    data.marital_status = marital_status;
    data.interests = hobbies;
    data.free_message = free_message;
    data.is_verified = isverified;
    data.is_flagged = isflagged;
    data.credits = credits;
    data.status = status
    data.photo = profileImage;


    DataService.UpdateProfile(userId, data).then(
      () => {
        toast.success('Profile updated successfully!', {
          position: toast.POSITION.TOP_RIGHT
        });

      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        toast.error(resMessage, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    );

  };


  const handleButtonClick = (section) => {
    setShowEditProfile(false);
    setShowNotification(false);
    setShowPayment(false);
    setShowUploads(false)
    switch (section) {
      case 'edit':
        setShowEditProfile(true);
        break;
      case 'notification':
        setShowNotification(true);
        break;
      case 'payment':
        setShowPayment(true);
        break;
      case 'uploads':
        setShowUploads(true)
        break;
      default:
        break;
    }
  };

  const getRecentPayments = async () => {
    await DataService.getOldPayments().then((data) => {
      console.log(data?.data?.data)
      setRecentPayments(data?.data?.data);

    });
  };

  useEffect(() => {
    getRecentPayments()
  }, [])

  const handleNotification = () => {
    const data = {}
    data.status = notificationStatus
    DataService.statusNotification(notificationStatus, data).then(
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

  return (
    <>
      <NavbarProfile />
      <LoadingBar color="#C952A0" ref={ref} height={5} shadow={true} />
      <div className="container">
        <div className="show_edit_bgarea edit_profile_area">

          <div className="edit_profile_function" >
            <button className={showEditProfile ? 'active' : ''} onClick={() => handleButtonClick('edit')} style={{ color: "#000", fontSize: "18px", fontWeight: "600" }}>Edit my profile</button>
            <button className={showUploads ? 'active' : ''} onClick={() => handleButtonClick('uploads')} style={{ color: "#000", fontSize: "18px", fontWeight: "600" }}>My Photos</button>
            <button className={showNotification ? 'active' : ''} onClick={() => handleButtonClick('notification')} style={{ color: "#000", fontSize: "18px", fontWeight: "600" }}>Notifications</button>
            <button className={showPayment ? 'active' : ''} onClick={() => handleButtonClick('payment')} style={{ color: "#000", fontSize: "18px", fontWeight: "600" }}>Payments</button>
          </div>
          {
            showEditProfile && (
              <>
                <section className="editProfile">
                  <form onSubmit={handleSubmit}>
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-12">

                          <div className="form_field mb-3">
                            <p>
                              <strong>My Gender</strong>
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
                                value="other"
                                checked={gender === "other"}
                                onChange={handleGenderChange}
                              />
                              <label class="form-check-label" for="gender_other">
                                Other
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
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

                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <div class="edit_profile mb-3">
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
                        </div>
                        <div className="col-sm-6">
                          <div class="edit_profile mb-3">
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
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <div class="edit_profile mb-3">
                            <input
                              type="email"
                              class="form-control"
                              id="floatingInput"
                              placeholder=""
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <label for="floatingInput">Email</label>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div class="edit_profile mb-3">
                            <input
                              type="password"
                              class="form-control"
                              id="floatingInput"
                              placeholder=""
                              required
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <label for="floatingInput">Password</label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">

                        </div>

                      </div>
                      <div className="form_field row mb-3">

                        <div className="col-sm-6">
                          <div class="edit_profile mb-3">
                            <input
                              type="text"
                              class="form-control"
                              id="floatingInput"
                              placeholder=""
                              value={postcode}
                              onChange={(e) => setPostcode(e.target.value)}
                            />
                            <label for="floatingInput">Postal Code</label>
                          </div>

                        </div>
                        <div className="col-sm-6">

                          <div class="edit_profile mb-3">
                            <input
                              type="date"
                              class="form-control"
                              id="floatingInput"
                              placeholder=""
                              required
                              max={maxDate}
                              value={birthdate}
                              onChange={handleDateChange}
                            />
                            <label for="floatingInput">Date of Birth</label>

                          </div>
                        </div>
                      </div>

                      <div className="form-field row mb-3">

                      </div>
                      <div className="form-field row mb-3">
                        <div className="col-sm-6">
                          <div class="edit_profile mb-3">
                            <input
                              type="text"
                              class="form-control"
                              id="floatingInput"
                              placeholder=""
                              required
                              value={eye_color}
                              onChange={(e) => setEyeColor(e.target.value)}
                            />
                            <label for="floatingInput">Eye Color</label>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div class="edit_profile mb-3">
                            <input
                              type="text"
                              class="form-control"
                              id="floatingInput"
                              placeholder=""
                              required
                              value={hair_color}
                              onChange={(e) => setHairColor(e.target.value)}
                            />
                            <label for="floatingInput">Hair Color</label>
                          </div>
                        </div>
                      </div>
                      <div className="form-field row mb-3">

                        <div className="col-sm-12">
                          <div class="edit_profile mb-3">
                            <input
                              type="text"
                              class="form-control"
                              id="floatingInput"
                              placeholder=""
                              required
                              value={marital_status}
                              onChange={(e) => setMaritalStatus(e.target.value)}
                            />
                            <label for="floatingInput">Marital Status</label>
                          </div>
                        </div>
                      </div>
                      <div className="form_field mb-3">
                        <div className="hobbies-list">
                          {hobbies.map((hobby, index) => (
                            <HobbyEdit
                              key={index}
                              hobby={hobby}
                              onDelete={() => handleDelete(index)}
                            />
                          ))}
                        </div>
                        <div class="edit_profile mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            required
                          />
                          <label for="floatingInput">Interests</label>
                        </div>
                        <div className="buttton_update">
                          <button class="main_button" type="submit" onClick={handleSubmit}>Update profile</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </section>
              </>
            )
          }
          {
            showNotification && (
              <>
                <div className="email_notification">
                  <div className="notification_turn">
                    <h2>Email Notifications</h2>
                    <div className="enable_notification">
                      <h2>Enable all email notifications</h2>
                      <label class="switch">
                        <input
                          type="checkbox"
                          value={notificationValue}
                          checked={notificationStatus === "on"}
                          onChange={(e) => setNotificationStatus(e.target.checked ? "on" : "off")}
                        />
                        <span class="slider round" ></span>
                      </label>
                    </div>
                    <div className="save_btnnotification">
                      <button className="save_btn" onClick={handleNotification}>Save</button>
                    </div>
                  </div>
                </div>
              </>
            )
          }
          {
            showUploads && (
              <UploadGallery />
            )
          }

          {
            showPayment && (
              <>
                <div className="payments_old_data">
                  <h2 >Payment Transactions</h2>
                  <div id="transactions">
                    <table class="table is-fullwidth">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Reference</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      {
                        recentPayments &&
                        recentPayments?.map((item) => {
                          return (
                            <>
                              <tbody>
                                <tr>
                                  <td>{item?.created_at ? moment(item?.created_at).format('ll') : " "}</td>
                                  <td>{item?.saleID}</td>
                                  <td>{item?.priceCurrency} {item?.priceAmount}</td>
                                </tr>
                              </tbody>
                            </>
                          )
                        })
                      }
                    </table>
                  </div>
                </div>
              </>
            )
          }
        </div>

      </div>
      <Footer />
    </>
  );
};

export default EditProfile;
