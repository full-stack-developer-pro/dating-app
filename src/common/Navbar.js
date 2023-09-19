import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import Logo from "../images/dating-logo.png";
import "../customCss/Navbar.css";
import TimezoneSelect from "react-timezone-select";
import Hobby from "../pages/Hobby";
import OP from "../images/dating-banner.jpg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [signup, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [showError, setShowError] = useState(false);
  const [hide, setHide] = useState(false);

  //Fields States Here

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("male");
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
  const handleShowTwo = () => {
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
      setStepOne(false);
      setStepThree(false);
      setStepTwo(true);
    }
  };
  const handleShowThree = () => {
    if (
      gender === "" ||
      dob === "" ||
      country === "" ||
      city === "" ||
      postal === "" ||
      timezone === ""
    ) {
      setShowError(true);
    } else {
      setShowError(false);
      setStepTwo(false);
      setStepOne(false);
      setStepThree(true);
    }
  };
  const handleSubmit = () => {
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
      alert("Form Submitted Successfully !!!");
    }
  };
  return (
    <>
      <div className="main_navbar">
        <div className="navbar_flex">
          <div className="navbarL">
          <Link to="/">
            <img src={Logo} alt="" />
            </Link>
          </div>
          <div className="navbarR">
            <button className="main_buttonTwo" onClick={() => setLogin(true)}>
              Login<i class="fas fa-sign-in-alt"></i>
            </button>
            <button className="main_button" onClick={() => setSignUp(true)}>
              Signup<i class="fas fa-user"></i>
            </button>
          </div>
          {signup && (
            <div className="main_signUp">
              <div className="signup_popup">
                <button className="close_icon" onClick={() => setSignUp(false)}>
                  <i class="fas fa-times"></i>
                </button>
                <div className="signup_inner">
                  <h2>Create Account</h2>
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
                      {stepOne && (
                        <div className="firstStep">
                          <div className="signup_topBar">
                            <span className="one active">1</span>
                            <span className="two">2</span>
                            <span className="three">3</span>
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
                          <div class="form-floating">
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
                          </div>
                          <div className="form_field mb-3">
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
                              <label
                                class="form-check-label"
                                for="gender_female"
                              >
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
                              <label
                                class="form-check-label"
                                for="gender_other"
                              >
                                Other
                              </label>
                            </div>
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
                          <div className="form_field country mb-3">
                            <ReactFlagsSelect
                              selected={country}
                              onSelect={(code) => setCountry(code)}
                              required
                            />
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
                              onClick={handleShowOne}
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
                                  onChange={(e) =>
                                    setHairLength(e.target.value)
                                  }
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
                                  onChange={(e) =>
                                    setMaritalStatus(e.target.value)
                                  }
                                />
                                <label for="floatingInput">
                                  Marital Status
                                </label>
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
                              onClick={handleShowTwo}
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
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
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
                        />
                        <label for="floatingInput">Email address</label>
                      </div>
                      <div class="form-floating mb-4">
                        <input
                          type="password"
                          class="form-control"
                          id="floatingPassword"
                          placeholder="Password"
                        />
                        <label for="floatingPassword">Password</label>
                      </div>
                      <p className="forgot_pass">Forgot Password</p>
                      <div className="form_field">
                        <button className="main_button">Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
          {hide && (
          <div className="main_signUp main_login">
            <div className="signup_popup" style={{ background: "#fff" }}>
              <button className="close_icon" onClick={() => setLogin(false)}>
                <i class="fas fa-times"></i>
              </button>
              <div className="orders">
                <h2>Refund Details</h2>
                <div className="orders_inner">
                  <table>
                    <thead>
                      <tr>
                        <th scope="col" width="50%">
                          Item
                        </th>
                        <th scope="col" width="10%">
                          Cost
                        </th>
                        <th scope="col" width="10%">
                          Quantity
                        </th>
                        <th scope="col" width="10%">
                          Total
                        </th>
                        <th scope="col" width="10%">
                          Tax
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="item">
                          <img
                            src="https://api.yourbasket.co.ke/uploads/1687856420134_mosquitonet.jpeg"
                            alt=""
                          />
                          <p>Pink Hair Straightener</p>
                        </td>
                        <td>$52</td>
                        <td>1</td>
                        <td>$45</td>
                        <td>$12</td>
                      </tr>
                      <tr>
                        <td><strong>Discount:</strong></td><td>$0</td>
                      </tr>
                      <tr>
                        <td><strong>Shipping:</strong></td><td>$0</td>
                      </tr>
                      <tr>
                        <td><strong>Tax:</strong></td><td>$12</td>
                      </tr>
                      <tr>
                        <td><strong>Order Total:</strong></td><td>$71</td>
                      </tr>
                      <tr>
                        <td style={{color:'tomato'}}><strong>Refunded:</strong></td><td style={{color:'tomato'}}>-$0</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="order_button">
                    <button>Request Refund</button>
                    <button>Cancel</button>
                  </div>
                  
                    <>
                      <div className="order_sec">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault1"
                          >
                            <div className="op">
                              <div className="opL">
                                <img
                                  src="https://api.yourbasket.co.ke/uploads/1687856420134_mosquitonet.jpeg"
                                  alt=""
                                />
                              </div>
                              <div className="opR">
                                <h4>Generic Bamboo 6Tier Wooden Shoe Rack</h4>
                                <p>Ksh. 6390</p>
                              </div>
                            </div>
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault2"
                          >
                            <div className="op">
                              <div className="opL">
                                <img
                                  src="https://api.yourbasket.co.ke/uploads/1687856420134_mosquitonet.jpeg"
                                  alt=""
                                />
                              </div>
                              <div className="opR">
                                <h4>Pink Hair Straightener</h4>
                                <p>Ksh. 6390</p>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                      <div class="form-floating mb-4">
                        <input
                          type="email"
                          class="form-control"
                          id="floatingInput"
                          placeholder="name@example.com"
                        />
                        <label for="floatingInput">
                          Reason for Cancellation
                        </label>
                      </div>
                      <div class="form-floating mb-4">
                        <input
                          type="file"
                          class="form-control"
                          id="floatingInput"
                          placeholder="name@example.com"
                        />
                        <label for="floatingInput">
                          Choose Video or Images to upload
                        </label>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <button
                          style={{
                            background: "#c14833",
                            color: "#fff",
                            padding: "9px 25px",
                            borderRadius: "5px",
                            border: "0px",
                          }}
                        >
                          Cancel Order
                        </button>
                      </div>
                    </>
                  
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
