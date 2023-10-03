import React, { useEffect, useState } from "react";
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
import DatingCouple from '../images/datingAppCouple.png'
import DatingGirl from '../images/datingAppGirl.png'

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [signup, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [stepFour, setStepFour] = useState(false);
  const [showError, setShowError] = useState(false);
  const [hide, setHide] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  //Fields States Here

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("male");
  const [dob, setDob] = useState("");
  const [country, setCountry] = useState("");
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
    if (gender === "" || age === "" || country === "" || isChecked === false) {
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
      password === "" ||
      description === ""
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
    if (dob === "" || city === "" || postal === "" || timezone === "") {
      setShowError(true);
    } else {
      setShowError(false);
      setStepTwo(false);
      setStepOne(false);
      setStepThree(false);
      setStepFour(true);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      height === "" ||
      weight === "" ||
      eyecolor === "" ||
      haircolor === "" ||
      hairlength === "" ||
      maritalstatus === "" ||
      hobbies === ""
    ) {
      setShowError(true);
    } else {
      const data = {};
      data.is_fake = false;
      data.name = name;
      data.username = username;
      data.email = email;
      data.password = password;
      data.gender = gender;
      data.birthdate = dob;
      data.description = description;
      data.country = country;
      data.city = city;
      data.postcode = postal;
      data.timezone = timezone;
      data.height = height;
      data.weight = weight;
      data.eye_color = eyecolor;
      data.hair_color = haircolor;
      data.hair_length = hairlength;
      data.marital_status = maritalstatus;
      data.interests = hobbies;
      data.credits = 200;
      data.free_message = "Hello,world!";
      data.is_verified = true;
      data.is_flagged = false;

      setLoading(true);
      await AuthService.register(data).then(
        () => {
          setLoading(false);
          toast.success("Profile create successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          // navigate('/login-page')

          // buttonref1.current.click();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.msg) ||
            error.message ||
            error.toString();

          setLoading(false);
          toast.error(resMessage, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      );
    }
  };
  return (
    <>
      <Navbar />
      <div className="top_banner">
        <div className="top_bannerInner">
          <div className="signup_sec">
            <div className="signup_popup">
              <div className="signup_inner">
                <h2>Create Account</h2>
                <div className="signup_formSec">
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
                      <div class="form-floating mb-3">
                        <input
                          type="text"
                          class="form-control"
                          id="floatingInput"
                          placeholder=""
                          required
                          onChange={(e) => setAge(e.target.value)}
                        />
                        <label for="floatingInput">My Age</label>
                      </div>
                      <div className="form_field country mb-3">
                        <label>
                          <strong>My Location</strong>
                        </label>
                        <ReactFlagsSelect
                          selected={country}
                          onSelect={(code) => setCountry(code)}
                          required
                        />
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
                        <label class="form-check-label" for="flexCheckDefault">
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
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label for="floatingInput">Email</label>
                      </div>
                      <div class="form-floating mb-3">
                        <input
                          type="password"
                          class="form-control"
                          id="floatingInput"
                          placeholder=""
                          required
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label for="floatingInput">Password</label>
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
                      <div class="form-floating mb-3">
                        <input
                          type="date"
                          class="form-control"
                          id="floatingInput"
                          placeholder=""
                          required
                          onChange={(e) => setDob(e.target.value)}
                        />
                        <label for="floatingInput">Date of Birth</label>
                      </div>

                      <div className="form_field row mb-3">
                        <div className="col-sm-6">
                          <div class="form-floating mb-3">
                            <input
                              type="text"
                              class="form-control"
                              id="floatingInput"
                              placeholder=""
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
                              placeholder=""
                              onChange={(e) => setPostal(e.target.value)}
                            />
                            <label for="floatingInput">Postal Code</label>
                          </div>
                        </div>
                      </div>
                      <div className="form_field mb-3">
                        <p>Select Timezone</p>
                        <TimezoneSelect
                          value={timezone}
                          onChange={setTimezone}
                          required
                        />
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
                          onClick={handleShowFour}
                        >
                          Next <i class="fas fa-long-arrow-alt-right"></i>
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
                      <div className="form-field row mb-3">
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
                              onChange={(e) => setEyeColor(e.target.value)}
                            />
                            <label for="floatingInput">Eye Color</label>
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
                              onChange={(e) => setHairColor(e.target.value)}
                            />
                            <label for="floatingInput">Hair Color</label>
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
                              onChange={(e) => setHairLength(e.target.value)}
                            />
                            <label for="floatingInput">Hair Length</label>
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
                              onChange={(e) => setMaritalStatus(e.target.value)}
                            />
                            <label for="floatingInput">Marital Status</label>
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
                            placeholder="name@example.com"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            required
                          />
                          <label for="floatingInput">Interests</label>
                        </div>
                      </div>
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
          <div className="content_sec">
            {/* <img src={Heart} alt="" className="heartTwo" /> */}
            <h1>Lorem ipsum dolor sit amet consectetur</h1>
            <p>
              Sed blandit eleifend hendrerit. Integer pulvinar congue
              sollicitudin. Ut tincidunt, ligula vel vulputate congue, ex libero
              tristique magna, eu posuere urna nulla at orci.
            </p>
            <button className="main_button">
              Explore<i class="fas fa-chevron-right"></i>
            </button>
            {/* <img src={HeartTwo} alt="" className="heartOne" /> */}
          </div>
        </div>
      </div>
      <section className="about_section">
        <div className="container">
          <div className="about_flex">
            <div className="about_flexL">
              <img src={DatingCouple} alt="" />
            </div>
            <div className="about_flexR">
              <h2>Mauris non nulla faucibus</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                a lacus nec lacus mollis condimentum in id justo. Pellentesque
                eleifend, magna sit amet laoreet euismod, turpis mauris posuere
                tortor, ac tristique sem ex eget lectus. Etiam sed erat magna.
                Nam in mi scelerisque, commodo lacus et, facilisis nibh.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                a lacus nec lacus mollis condimentum in id justo. Pellentesque
                eleifend, magna sit amet laoreet euismod, turpis mauris posuere
                tortor, ac tristique sem ex eget lectus. Etiam sed erat magna.
                Nam in mi scelerisque, commodo lacus et, facilisis nibh.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="active_profilesSec">
        <div className="container">
          <div className="active_secFlex">
            <div className="activeL">
              <ul>
                <li>
                  <i class="fas fa-check-circle"></i>100% Secure
                </li>
                <li>
                  <i class="fas fa-check-circle"></i>Instant Messaging
                </li>
                <li>
                  <i class="fas fa-check-circle"></i>Verified Persons
                </li>
                <li>
                  <i class="fas fa-check-circle"></i>Free Contact
                </li>
              </ul>
              <h4>Who is Online</h4>
              <div className="online_profiles">
                <div className="onlineInner">
                  <img src={ProfileOne} alt="" />
                  <i class="fas fa-circle"></i>
                </div>
                <div className="onlineInner">
                  <img src={ProfileThree} alt="" />
                  <i class="fas fa-circle"></i>
                </div>
                <div className="onlineInner">
                  <img src={ProfileFour} alt="" />
                  <i class="fas fa-circle"></i>
                </div>
              </div>
            </div>
            <div className="activeM">
              <h3>Recently Joined</h3>
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
              <div className="active_mainProfile">
                <div className="active_mainFlex">
                  <div className="active_mainL">
                    <img src={ProfileOne} alt="" />
                  </div>
                  <div className="active_mainR">
                    <h4>Emily Wilson</h4>
                    <span className="active_age">28~F</span>
                    <span>
                      <i class="fas fa-map-marker-alt"></i>London
                    </span>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipiscing elit
                      dolor sit.
                    </p>
                  </div>
                </div>
                <div className="active_actionSec">
                  <button>
                    View<i class="fas fa-eye"></i>
                  </button>
                  <button>
                    Like<i class="fas fa-thumbs-up"></i>
                  </button>
                  <button>
                    Send Flirt<i class="fas fa-heart"></i>
                  </button>
                  <button>
                    Send Message<i class="fas fa-comment-alt"></i>
                  </button>
                </div>
              </div>
              <div className="active_mainProfile">
                <div className="active_mainFlex">
                  <div className="active_mainL">
                    <img src={ProfileTwo} alt="" />
                  </div>
                  <div className="active_mainR">
                    <h4>Emily Wilson</h4>
                    <span className="active_age">28~F</span>
                    <span>
                      <i class="fas fa-map-marker-alt"></i>London
                    </span>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipiscing elit
                      dolor sit.
                    </p>
                  </div>
                </div>
                <div className="active_actionSec">
                  <button>
                    View<i class="fas fa-eye"></i>
                  </button>
                  <button>
                    Like<i class="fas fa-thumbs-up"></i>
                  </button>
                  <button>
                    Send Flirt<i class="fas fa-heart"></i>
                  </button>
                  <button>
                    Send Message<i class="fas fa-comment-alt"></i>
                  </button>
                </div>
              </div>
              <div className="active_mainProfile">
                <div className="active_mainFlex">
                  <div className="active_mainL">
                    <img src={ProfileFour} alt="" />
                  </div>
                  <div className="active_mainR">
                    <h4>Emily Wilson</h4>
                    <span className="active_age">28~F</span>
                    <span>
                      <i class="fas fa-map-marker-alt"></i>London
                    </span>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipiscing elit
                      dolor sit.
                    </p>
                  </div>
                </div>
                <div className="active_actionSec">
                  <button>
                    View<i class="fas fa-eye"></i>
                  </button>
                  <button>
                    Like<i class="fas fa-thumbs-up"></i>
                  </button>
                  <button>
                    Send Flirt<i class="fas fa-heart"></i>
                  </button>
                  <button>
                    Send Message<i class="fas fa-comment-alt"></i>
                  </button>
                </div>
              </div>
              <button className="main_button my-4">
                Create Account<i class="fas fa-long-arrow-alt-right"></i>
              </button>
            </div>
            <div className="activeR">
              <div className="search_formSec">
                <h4>Quick Search</h4>
                <div className="search_gender">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="search_genderAll"
                      checked
                    />
                    <label class="form-check-label" for="search_genderAll">
                      All
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="search_genderMale"
                    />
                    <label class="form-check-label" for="search_genderMale">
                      Male
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="search_genderFemale"
                    />
                    <label class="form-check-label" for="search_genderFemale">
                      Female
                    </label>
                  </div>
                </div>
                <div className="form_field country mb-3">
                  <label>
                    <strong>Select Location</strong>
                  </label>
                  <ReactFlagsSelect
                    selected={country}
                    onSelect={(code) => setCountry(code)}
                    required
                  />
                </div>
                <button className="search_submit">
                  Search<i class="fas fa-search"></i>
                </button>
              </div>
              <div className="member_stats">
                <h4>Member Statistics</h4>
                <div className="stats_flex">
                  <div className="statsL">
                    <p>Total Members</p>
                  </div>
                  <div className="statsM">
                    <p>~</p>
                  </div>
                  <div className="statsR">
                    <p>12101</p>
                  </div>
                </div>
                <div className="stats_flex">
                  <div className="statsL">
                    <p>Active Members</p>
                  </div>
                  <div className="statsM">
                    <p>~</p>
                  </div>
                  <div className="statsR">
                    <p>768</p>
                  </div>
                </div>
                <div className="stats_flex">
                  <div className="statsL">
                    <p>Joined Today</p>
                  </div>
                  <div className="statsM">
                    <p>~</p>
                  </div>
                  <div className="statsR">
                    <p>52</p>
                  </div>
                </div>
                <div className="stats_flex">
                  <div className="statsL">
                    <p>Men Joined Today</p>
                  </div>
                  <div className="statsM">
                    <p>~</p>
                  </div>
                  <div className="statsR">
                    <p>26</p>
                  </div>
                </div>
                <div className="stats_flex">
                  <div className="statsL">
                    <p>Women Joined Today</p>
                  </div>
                  <div className="statsM">
                    <p>~</p>
                  </div>
                  <div className="statsR">
                    <p>26</p>
                  </div>
                </div>
                <div className="stats_flex">
                  <div className="statsL">
                    <p>Messages Sent Today</p>
                  </div>
                  <div className="statsM">
                    <p>~</p>
                  </div>
                  <div className="statsR">
                    <p>125646</p>
                  </div>
                </div>
                <button className="main_button">
                  Join Now<i class="fas fa-long-arrow-alt-right"></i>
                </button>
              </div>
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
      <section className="become_part">
        <div className="container">
          <div className="become_flex">
            <div className="becomeL">
              <img src={News} alt="" />
            </div>
            <div className="becomeR">
              <h2>Become Part of Community</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                a lacus nec lacus mollis condimentum in id justo.
              </p>
              <button className="main_button">Register</button>
            </div>
          </div>
        </div>
      </section>
      <section className="about_section">
        <div className="container">
          <div className="about_flex">
            
            <div className="about_flexR">
              <h2>Mauris non nulla faucibus</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                a lacus nec lacus mollis condimentum in id justo. Pellentesque
                eleifend, magna sit amet laoreet euismod, turpis mauris posuere
                tortor, ac tristique sem ex eget lectus. Etiam sed erat magna.
                Nam in mi scelerisque, commodo lacus et, facilisis nibh.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                a lacus nec lacus mollis condimentum in id justo. Pellentesque
                eleifend, magna sit amet laoreet euismod, turpis mauris posuere
                tortor, ac tristique sem ex eget lectus. Etiam sed erat magna.
                Nam in mi scelerisque, commodo lacus et, facilisis nibh.
              </p>
              <button className="main_button">Register</button>
            </div>
            <div className="about_flexL">
              <img src={DatingGirl} alt="" />
            </div>
            
          </div>
        </div>
      </section>
      {/* <section className="profiles_section">
        <div className="container">
          <div className="profiles_mainSec">
            <h2 className="main_title">Explore Some Profiles Here</h2>
          </div>
          <div className="profile_flex">
            <div className="profile_inner">
              <img src={ProfileOne} alt="" />
              <div className="gender_ico_f">
                <i class="fas fa-venus"></i>
              </div>
              <div className="profile_body">
                <div className="d-flex align-items-center justify-content-between">
                  <h5>Emily Wilson</h5>
                  <h6 className="f-gender">24~F</h6>
                </div>
                <p className="profile_location">
                  <i class="fas fa-map-marker-alt"></i>London
                </p>
                <p className="profile_description">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit dolor
                  sit.
                </p>
                <div className="profile_buttons">
                  <Link to="/chats">
                    <button className="chat_now">Start Chat</button>
                  </Link>
                  <button className="add_friend">
                    <i class="fas fa-user-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="profile_inner">
              <img src={ProfileTwo} alt="" />
              <div className="gender_ico_m">
                <i class="fas fa-mars"></i>
              </div>
              <div className="profile_body">
                <div className="d-flex align-items-center justify-content-between">
                  <h5>Emily Wilson</h5>
                  <h6 className="f-gender">27~M</h6>
                </div>
                <p className="profile_location">
                  <i class="fas fa-map-marker-alt"></i>New York
                </p>
                <p className="profile_description">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit dolor
                  sit.
                </p>
                <div className="profile_buttons">
                  <Link to="/chats">
                    <button className="chat_now">Start Chat</button>
                  </Link>
                  <button className="add_friend">
                    <i class="fas fa-user-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="profile_inner">
              <img src={ProfileThree} alt="" />
              <div className="gender_ico_f">
                <i class="fas fa-venus"></i>
              </div>
              <div className="profile_body">
                <div className="d-flex align-items-center justify-content-between">
                  <h5>Emily Wilson</h5>
                  <h6 className="f-gender">31~F</h6>
                </div>
                <p className="profile_location">
                  <i class="fas fa-map-marker-alt"></i>Egypt
                </p>
                <p className="profile_description">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit dolor
                  sit.
                </p>
                <div className="profile_buttons">
                  <Link to="/chats">
                    <button className="chat_now">Start Chat</button>
                  </Link>
                  <button className="add_friend">
                    <i class="fas fa-user-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="profile_inner">
              <img src={ProfileFour} alt="" />
              <div className="gender_ico_m">
                <i class="fas fa-mars"></i>
              </div>
              <div className="profile_body">
                <div className="d-flex align-items-center justify-content-between">
                  <h5>Emily Wilson</h5>
                  <h6 className="f-gender">36~M</h6>
                </div>
                <p className="profile_location">
                  <i class="fas fa-map-marker-alt"></i>France
                </p>
                <p className="profile_description">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit dolor
                  sit.
                </p>
                <div className="profile_buttons">
                  <Link to="/chats">
                    <button className="chat_now">Start Chat</button>
                  </Link>
                  <button className="add_friend">
                    <i class="fas fa-user-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="profile_inner">
              <img src={ProfileThree} alt="" />
              <div className="gender_ico_f">
                <i class="fas fa-venus"></i>
              </div>
              <div className="profile_body">
                <div className="d-flex align-items-center justify-content-between">
                  <h5>Emily Wilson</h5>
                  <h6 className="f-gender">31~F</h6>
                </div>
                <p className="profile_location">
                  <i class="fas fa-map-marker-alt"></i>Egypt
                </p>
                <p className="profile_description">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit dolor
                  sit.
                </p>
                <div className="profile_buttons">
                  <Link to="/chats">
                    <button className="chat_now">Start Chat</button>
                  </Link>
                  <button className="add_friend">
                    <i class="fas fa-user-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="profile_inner">
              <img src={ProfileFour} alt="" />
              <div className="gender_ico_m">
                <i class="fas fa-mars"></i>
              </div>
              <div className="profile_body">
                <div className="d-flex align-items-center justify-content-between">
                  <h5>Emily Wilson</h5>
                  <h6 className="f-gender">36~M</h6>
                </div>
                <p className="profile_location">
                  <i class="fas fa-map-marker-alt"></i>France
                </p>
                <p className="profile_description">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit dolor
                  sit.
                </p>
                <div className="profile_buttons">
                  <Link to="/chats">
                    <button className="chat_now">Start Chat</button>
                  </Link>
                  <button className="add_friend">
                    <i class="fas fa-user-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="profile_inner">
              <img src={ProfileOne} alt="" />
              <div className="gender_ico_f">
                <i class="fas fa-venus"></i>
              </div>
              <div className="profile_body">
                <div className="d-flex align-items-center justify-content-between">
                  <h5>Emily Wilson</h5>
                  <h6 className="f-gender">24~F</h6>
                </div>
                <p className="profile_location">
                  <i class="fas fa-map-marker-alt"></i>London
                </p>
                <p className="profile_description">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit dolor
                  sit.
                </p>
                <div className="profile_buttons">
                  <Link to="/chats">
                    <button className="chat_now">Start Chat</button>
                  </Link>
                  <button className="add_friend">
                    <i class="fas fa-user-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="profile_inner">
              <img src={ProfileTwo} alt="" />
              <div className="gender_ico_m">
                <i class="fas fa-mars"></i>
              </div>
              <div className="profile_body">
                <div className="d-flex align-items-center justify-content-between">
                  <h5>Emily Wilson</h5>
                  <h6 className="f-gender">27~M</h6>
                </div>
                <p className="profile_location">
                  <i class="fas fa-map-marker-alt"></i>New York
                </p>
                <p className="profile_description">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit dolor
                  sit.
                </p>
                <div className="profile_buttons">
                  <Link to="/chats">
                    <button className="chat_now">Start Chat</button>
                  </Link>
                  <button className="add_friend">
                    <i class="fas fa-user-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="load_more">
            <button className="main_button">
              Load More<i class="fas fa-long-arrow-alt-right"></i>
            </button>
          </div>
        </div>
      </section> */}

      <section className="how_it_works">
        <div className="container">
          <div className="how_it_worksInner">
            <h2 className="main_title">How It Works</h2>
            <img src={Steps} alt="" />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
