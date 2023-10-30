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



const EditProfile = () => {
  const ref = useRef(null);
  const today = new Date().toISOString().split("T")[0];
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
  const [profile, getProfile] = useState([]);
  const userId = JSON.parse(localStorage.getItem("d_user"));
  const getUserProfile = async () => {
    await DataService.getSingleProfile(userId).then((data) => {
      getProfile(data?.data?.data);
      setGender(data?.data?.data?.gender)
      setCountry(data?.data?.data?.country)
      setUsername(data?.data?.data?.username)
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
  useEffect(() => {
    document.title = "Profile";
    window.scrollTo(0, 0);
    getUserProfile();
    ref.current.continuousStart();
  }, [userId]);
  return (
    <>
      <Navbar />
      <LoadingBar color="#C952A0" ref={ref} height={5} shadow={true} />
      <section className="profile_bannerSec">
        <div className="container">
          <h1>My Profile</h1>
          <span>Home / Profile</span>
        </div>
      </section>
      <section className="editProfile">
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
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
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
            </div>
          <div className="col-sm-6">
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
          </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div class="form-floating mb-3">
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
              <div class="form-floating mb-3">
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
            </div>
            <div className="col-sm-6">
              <div class="form-floating mb-3">
                <input
                  type="date"
                  class="form-control"
                  id="floatingInput"
                  placeholder=""
                  required
                  max={today}
                  onChange={(e) => setDob(e.target.value)}
                />
                <label for="floatingInput">Date of Birth</label>
              </div>
            </div>
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
          <div className="row">
            <div className="col-sm-12">
              <div className="form_field mb-3">
                <p>Select Timezone</p>
                <TimezoneSelect
                  value={timezone}
                  onChange={setTimezone}
                  required
                />
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
                <HobbyEdit
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
        </div>
      </section>
      {/* <section className="main_proflieSec">
        <div className="container">
          <div className="profileFlex">
            <div className="profileFlexL">
              <img src={ProfileOne} alt="" />
              <div className="gender_iop">
                <i class="fas fa-venus"></i>
              </div>
            </div>
            <div className="profileFlexR">
              <div className="profile_title">
                <div className="d-flex align-items-center justify-content-between">
                  <h2>
                    {profile?.name}
                    <i className="fas fa-circle"></i>
                  </h2>
                  <button
                    className="main_button"
                    style={{ margin: "0", padding: "10px 35px" }}
                  >
                    Edit Profile<i class="fas fa-pencil-alt"></i>
                  </button>
                </div>
                <p>
                  <i class="fas fa-map-marker-alt"></i> {profile?.city},{" "}
                  {profile?.country}
                </p>
                <p>{profile?.description}</p>
              </div>
            </div>
          </div>
          <div className="profile_descriptionSec">
            <div className="profile_dflex">
              <div className="verified_badge">
                <img src={Verified} alt="" />
              </div>
              <div className="profile_dFlexL">
                <div className="profileEntry">
                  <p>
                    <i class="fas fa-envelope"></i> Email
                  </p>
                  <p>:</p>
                  <p>{profile?.email}</p>
                </div>
                <div className="profileEntry">
                  <p>
                    <i class="fas fa-user"></i> Gender
                  </p>
                  <p>:</p>
                  <p>
                    {profile?.gender === "male"
                      ? "Male"
                      : profile?.gender === "female"
                      ? "Female"
                      : "Other"}
                  </p>
                </div>
                <div className="profileEntry">
                  <p>
                    <i class="fas fa-birthday-cake"></i> Birth Date
                  </p>
                  <p>:</p>
                  <p>{moment(profile?.birthdate).format("LL")}</p>
                </div>
                <div className="profileEntry">
                  <p>
                    <i class="fas fa-map-marker-alt"></i> City
                  </p>
                  <p>:</p>
                  <p>
                    {profile?.city}, {profile?.postcode}
                  </p>
                </div>
                <div className="profileEntry">
                  <p>
                    <i class="fas fa-clock"></i> Timezone
                  </p>
                  <p>:</p>
                  <p>{profile?.timezone?.label}</p>
                </div>
                <div className="profileEntry">
                  <p>
                    <i class="fas fa-text-height"></i> Height
                  </p>
                  <p>:</p>
                  <p>{profile?.height}</p>
                </div>
              </div>
              <div className="profile_dFlexR">
                <div className="profileEntry">
                  <p>
                    <i class="fas fa-weight"></i> Weight
                  </p>
                  <p>:</p>
                  <p>{profile?.weight}Kg</p>
                </div>
                <div className="profileEntry">
                  <p>
                    <i class="fas fa-eye"></i> Eye Color
                  </p>
                  <p>:</p>
                  <p>{profile?.eye_color}</p>
                </div>
                <div className="profileEntry">
                  <p>
                    <i class="fas fa-tint"></i> Hair Color
                  </p>
                  <p>:</p>
                  <p>{profile?.hair_color}</p>
                </div>
                <div className="profileEntry">
                  <p>
                    <i class="fab fa-servicestack"></i> Hair Length
                  </p>
                  <p>:</p>
                  <p>{profile?.hair_length}</p>
                </div>
                <div className="profileEntry">
                  <p>
                    <i class="fas fa-ring"></i> Marital Status
                  </p>
                  <p>:</p>
                  <p>{profile?.marital_status}</p>
                </div>
                <div className="profileEntry">
                  <p>
                    <i class="fas fa-futbol"></i> Interests
                  </p>
                  <p>:</p>
                  <p>
                    {profile?.interests && profile?.interests.length > 0
                      ? profile?.interests?.map((item, i) => {
                          return item + ", ";
                        })
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <Footer />
    </>
  );
};

export default EditProfile;
