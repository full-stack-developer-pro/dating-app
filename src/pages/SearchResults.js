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


const SearchResults = () => {
  const [users, setUsers] = useState([]);
  const ref = useRef(null);
  const userId = JSON.parse(localStorage.getItem("d_user"));
  const [loading, setLoading] = useState(false);
  const [profile, getProfile] = useState([]);
  const [country, setCountry] = useState("");
  const auth = AuthService.getCurrentUser();


  const getUserProfile = async () => {
    await DataService.getSingleProfile(userId).then((data) => {
      getProfile(data?.data?.data);
    });
  };
  const searchData = async () => {
    await DataService.searchUsers("male",country).then((data) => {
        setUsers(data?.data?.data)
      ref.current.complete();
    });
  };
  useEffect(() => {
   searchData();
   ref.current.continuousStart();
  },[])
  useEffect(() => {
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
            searchData()
            getUserProfile()
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
            searchData()
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
  return (
    <>
      <LoadingBar color="#C952A0" ref={ref} height={5} shadow={true} />
        <section className="active_profilesSec">
        <div className="container">
          <div className="active_secFlex">
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
                <button className="search_submit" onClick={searchData}>
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
                <button
                  className="main_button"
                  onClick={() => (window.location.href = "/#signup")}
                >
                  Join Now<i class="fas fa-long-arrow-alt-right"></i>
                </button>
              </div>
            </div>
            <div className="activeM" style={{flex: '1'}}>
              <h3>Recently Joined</h3>
              <div className="active_recent">
                <Link to="/single-profile">
                  <div className="active_rInner">
                    <img src={ProfileOne} alt="" />
                    <h4>Jessica M.</h4>
                  </div>
                </Link>
                <Link to="/single-profile">
                  <div className="active_rInner">
                    <img src={ProfileTwo} alt="" />
                    <h4>Emily W.</h4>
                  </div>
                </Link>
                <Link to="/single-profile">
                  <div className="active_rInner">
                    <img src={ProfileThree} alt="" />
                    <h4>Jessica M.</h4>
                  </div>
                </Link>
                <Link to="/single-profile">
                  <div className="active_rInner">
                    <img src={ProfileFour} alt="" />
                    <h4>Emily W.</h4>
                  </div>
                </Link>
              </div>

              {users && users.length > 0 ? (
                users.map((item, i) => {
                  if (item?._id !== userId) {
                    const isFriend = profile?.friends?.some(
                      (op) => op?.friends === item?._id
                    );
                    return (
                      <div className="active_mainProfile" key={i}>
                        <div className="active_mainFlex">
                          <div className="active_mainL">
                            <img src={ProfileOne} alt="" />
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
                              {item?.city}, {item?.country}
                            </span>
                            <br />
                            {auth ?  
                            isFriend ? (
                              <button className="add_friend already_friend"
                              onClick={() => removeFriend(item?._id)}>
                                Remove Friend
                                <i className="fas fa-user-minus"></i>
                              </button>

                            ) : (
                              <button
                                className="add_friend"
                                onClick={() => addFriend(item?._id)}
                              >
                                Add Friend
                                <i className="fas fa-user-plus"></i>

                              </button>
                            )
                            : ''}
                            <p>{item?.description}</p>
                          </div>
                        </div>
                        <div className="active_actionSec">
                          <button>
                            <Link to={'/single-profile/'+item._id}>
                              View<i className="fas fa-eye"></i>
                            </Link>
                          </button>
                          <button>
                            Like<i className="fas fa-thumbs-up"></i>
                          </button>
                          <button>
                            Send Flirt<i className="fas fa-heart"></i>
                          </button>
                          <button>
                            <Link to={"/chats/"+item._id}>
                                  Send Message<i class="fas fa-comment-alt"></i>
                                </Link>
                          </button>
                        </div>
                      </div>
                    );
                  }
                  return null; // Skip rendering for the user's own profile
                })
              ) : (
                <p>No Data Found</p>
              )}
              <button
                className="main_button my-4"
                onClick={() => (window.location.href = "/#signup")}
              >
                Create Account<i class="fas fa-long-arrow-alt-right"></i>
              </button>
            </div>
           
          </div>
        </div>
      </section>
    </>
  )
}

export default SearchResults