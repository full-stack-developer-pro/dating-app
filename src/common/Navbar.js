import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import Logo from "../images/dating-logo.png";
import "../customCss/Navbar.css";
import TimezoneSelect from "react-timezone-select";
import Hobby from "../pages/Hobby";

const Navbar = () => {
  const [selected, setSelected] = useState("");
  const [signup, setSignUp] = useState(false);
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);

  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
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
    setStepOne(false);
    setStepThree(false);
    setStepTwo(true);
  };
  const handleShowThree = () => {
    setStepTwo(false);
    setStepOne(false);
    setStepThree(true);
  };
  return (
    <>
      <div className="main_navbar">
        <div className="navbar_flex">
          <div className="navbarL">
            <img src={Logo} alt="" />
          </div>
          <div className="navbarR">
            <button className="main_buttonTwo">
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
                          />
                          <label for="floatingInput">Password</label>
                        </div>
                        <div class="form-floating">
                          <textarea
                            class="form-control"
                            placeholder=""
                            id="floatingTextarea2"
                            style={{ height: "100px" }}
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
                            />
                            <label class="form-check-label" for="gender_other">
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
                          />
                          <label for="floatingInput">Date of Birth</label>
                        </div>
                        <div className="form_field mb-3">
                          <ReactFlagsSelect
                            selected={selected}
                            onSelect={(code) => setSelected(code)}
                          />
                        </div>
                        <div className="form_field row mb-3">
                          <div className="col-sm-6">
                            <div class="form-floating mb-3">
                              <input
                                type="text"
                                class="form-control"
                                id="floatingInput"
                                placeholder="name@example.com"
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
                                placeholder="name@example.com"
                              />
                              <label for="floatingInput">Postal Code</label>
                            </div>
                          </div>
                        </div>
                        <div className="form_field mb-3">
                          <p>Select Timezone</p>
                          <TimezoneSelect
                            value={selectedTimezone}
                            onChange={setSelectedTimezone}
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
                            onClick={() => setSignUp(false)}
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
        </div>
      </div>
    </>
  );
};

export default Navbar;
