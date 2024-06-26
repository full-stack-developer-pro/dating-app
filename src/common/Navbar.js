import React, { useEffect, useState } from "react";
import Logo from "../images/dating-app-logo.png";
import "../customCss/Navbar.css";
import OP from "../images/dating-banner.jpg";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DataService from "../services/data.service";
import profile1 from "../images/profile1.jpg";
import moment from "moment";
import ProfileAvatar from "../images/profile-avatar.png";
import NotificationEye from "../images/NotifcationEye.png"

const Navbar = () => {
  const auth = AuthService.getCurrentUserTokken();
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  const [signup, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [showError, setShowError] = useState(false);
  const [hide, setHide] = useState(false);

  //Fields States Here

  // const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
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
  const [profile, setProfile] = useState("");
  const [notification, setShowNotification] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const userId = JSON.parse(localStorage.getItem("d_user"));

  const getUserProfile = async () => {
    if (auth) {
      await DataService.getSingleProfile(userId).then((data) => {
        setProfile(data?.data?.data?.user);
      });
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [packages, setPackages] = useState("");
  const [payments, setPayments] = useState(false);
  const [notifications, setNotifications] = useState("");
  const [notificationLength, setNotificationLength] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
  
    try {
      await AuthService.login(username, password);
  
      toast.success("Login Successful!!");
        navigate("/profile");
      
    } catch (error) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
  
      toast.error(resMessage, {
        position: toast.POSITION.TOP_RIGHT,
      });
  
      setMessage(resMessage);
    } finally {
      setLoading(false);
    }
  };
  
  const logout = (e) => {
    localStorage.removeItem("d_user");
    localStorage.removeItem("d_userToken");
    localStorage.removeItem("city_id");

    navigate("/");
    window.location.reload();
  };

  const handlePayment = (price) => {
    setMessage("");
    const data = {};
    // data.userId = user_id;
    data.amount = price;

    DataService.GeneratePayment(data).then(
      (response) => {
        if (response.data.status === "Success") {
          toast("Link generated successfully!");
          console.log(response.data.data.url);
          const paymentUrl = response.data.data.url;
          window.location.replace(paymentUrl); // Use replace for proper redirection
        } else {
          toast("Failed to generate the payment link.");
        }
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
  const getPlans = async () => {
    if (auth) {
      await DataService.getPackages().then((data) => {
        setPackages(data?.data?.data);
      });
    }
  };
  useEffect(() => {
    getPlans();
  }, []);

  const getNotifications = async () => {
    if (auth) {
      await DataService.getNotification().then((data) => {
        setNotifications(data?.data?.data?.notifications);
        setNotificationLength(data?.data?.data?.counts.unread);
      });
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const handleNotification = (id) => {
    const data = {};
    data.ids = [id];
    DataService.UpdateNotification(data).then(
      () => {
        setTimeout(() => { }, 2000);
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

  // const handleME = (e) => {
  //   e.target.src = { profile1 }
  // }

  return (
    <>
      <ToastContainer />
      {payments && (
        <div className="payments_popup">
          <div className="payments_inner">
            <div className="container">
              <div className="payments_flexOne">
                <div className="payment_bg">
                  <div className="cross_btn">
                    <i
                      onClick={() => setPayments(false)}
                      class="fas fa-window-close"
                    ></i>
                  </div>
                  {packages?.length > 0
                    ? packages?.map((item) => {
                      return (
                        <>
                          <div className="payments_plan">
                            <h2>{item.credits}</h2>
                            <span className="bonus">{item.bonus}</span>
                            <h4>credits</h4>
                            <hr />
                            <h3>Just For</h3>
                            <p>
                              <span>
                                {item.currency} {item.price}
                              </span>
                            </p>
                            <hr />
                            <button
                              className="main_button"
                              onClick={() => handlePayment(item.price)}
                            >
                              Purchase Now
                            </button>
                          </div>
                        </>
                      );
                    })
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {auth && (
        <>
          <div className="credits_box" style={{ padding: "10px 0px" }}>
            {notification && (
              <div className="notification_main">
                <div className="notification_pop">
                  <div className="payment_bg_notification">
                    <div className="notification_heading">
                      <h2>Notifications</h2>
                    </div>
                    {notifications?.length > 0
                      ? notifications?.map((item) => {
                        return (
                          <>
                            {/* {item?.user ? (
                                <Link to={"/single-profile/" + item?.user?.id}>
                                  <div className="mainnotification_text" onClick={() => handleNotification(item.id)}>
                                    <div className="ntificationone">
                                      <img src={item?.user ? item?.user?.avatar : profile1} />
                                    </div>
                                    <div className="notification_text">
                                      <p>
                                        {item?.body}
                                      </p>
                                      <h2>Just now</h2>
                                    </div>
                                  </div>
                                </Link>

                              ) : null} */}

                            {item?.user ? (
                              <Link to={item.type === 'message' ? "/chats/" + item?.user?.id : "/single-profile/" + item?.user?.id}>
                                <div
                                  className="mainnotification_text"
                                  onClick={() => handleNotification(item.id)}
                                >
                                  <div className="ntificationone">
                                    <img
                                      src={
                                        item?.user
                                          ? item?.user?.avatar
                                          : ProfileAvatar
                                      }
                                    />
                                    <img className="notiEye" src={NotificationEye} />

                                  </div>
                                  <div className="notification_text">
                                    <p>{item?.body}</p>

                                    <h2>
                                      {item?.created_at
                                        ? moment(item?.created_at).format(
                                          "LT"
                                        )
                                        : " "}
                                    </h2>
                                  </div>
                                </div>
                              </Link>
                            ) : (
                              <div
                                className="mainnotification_text"
                                onClick={() => handleNotification(item.id)}
                              >
                                <div className="ntificationone">
                                  <img
                                    src={item?.image ? item?.image?.url : ProfileAvatar}
                                    alt="notification_image"
                                  />
                                  <img className="notiEye" src={NotificationEye} />

                                </div>
                                <div className="notification_text">
                                  <p>{item?.body}</p>
                                  <h2>
                                    {item?.created_at
                                      ? moment(item?.created_at).format("LT")
                                      : " "}
                                  </h2>
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })
                      : ""}
                  </div>
                </div>
              </div>
            )}
            <div className="notification_area">
              <i
                onClick={() => setShowNotification(!notification)}
                class="fas fa-bell"
              ></i>
              <div className="notification_count">
                <h1>{notificationLength}</h1>
              </div>
            </div>
            <div className="span_credits">
              <h1>Account Balance</h1>
              <p>
                <b style={{ marginRight: "10px" }}>{profile?.credits}</b>{" "}
                Credits
              </p>
            </div>
            <div className="buy_nowbtn">
              <Link to="/packages">
                <button className="main_buttonTwo credits">Buy now</button>
              </Link>
            </div>
          </div>
        </>
      )}

      <div className="main_navbar">
        <div className="navbar_flex">
          <div className="navbarL">
            <Link to="/">
              <img src={Logo} alt="" />
            </Link>
          </div>
          <div className="navbarR">
            {auth ? (
              <>
                {/* <div className="span_credits">
                <h1>Account Balance</h1>
                <p><span></span>200 Credits</p>
               </div> */}
                {/* <button className="main_buttonTwo credits" >
               Buy now
                </button> */}
                <button
                  className="main_buttonTwo"
                  onClick={() => navigate("/profile")}
                >
                  My Profile<i class="fas fa-user"></i>
                </button>
                <button className="main_button" onClick={logout}>
                  Logout<i class="fas fa-sign-in-alt"></i>
                </button>
              </>
            ) : (
              <>
                <button
                  className="main_buttonTwo"
                  onClick={() => setLogin(true)}
                >
                  Login<i class="fas fa-sign-in-alt"></i>
                </button>
                {/* <button className="main_button" onClick={() => window.location.href = "/#signup"}>
              Signup<i class="fas fa-user"></i>
            </button> */}
              </>
            )}
          </div>

          {login && (
            <div className="main_signUp main_login">
              <div className="signup_popup login_popup">
                <button className="close_icon" onClick={() => setLogin(false)}>
                  <i class="fas fa-times"></i>
                </button>
                <div className="signup_inner ">
                  <h2>Login</h2>
                  <p>Enter your details to login</p>
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
                      <Link to="/forgot-password"><p className="forgot_pass">Forgot Password</p></Link>

                      <div className="form_field">
                        <button className="main_button" onClick={handleLogin} disabled={loading}>
                          {loading ? "Logging in..." : "Submit"}
                        </button>
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
                          <td>
                            <strong>Discount:</strong>
                          </td>
                          <td>$0</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Shipping:</strong>
                          </td>
                          <td>$0</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Tax:</strong>
                          </td>
                          <td>$12</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Order Total:</strong>
                          </td>
                          <td>$71</td>
                        </tr>
                        <tr>
                          <td style={{ color: "tomato" }}>
                            <strong>Refunded:</strong>
                          </td>
                          <td style={{ color: "tomato" }}>-$0</td>
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
