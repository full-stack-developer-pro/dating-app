import React, { useEffect, useState, useRef } from "react";
import "../customCss/Home.css";
import "../customCss/SingleL.css";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import ProfileOne from "../images/profile1.jpg";
import ProfileTwo from "../images/profile2.jpg";
import ProfileThree from "../images/profile3.jpg";
import ProfileFour from "../images/profile4.jpg";
import ReactFlagsSelect from "react-flags-select";
import { Link, useParams } from "react-router-dom";
import DataService from "../services/data.service";
import LoadingBar from "react-top-loading-bar";
import { useNavigate } from "react-router-dom";


const SingleLProfile = () => {
  const navigate = useNavigate();
  const params = useParams();
  const ref = useRef(null);
  const [profile, getProfile] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [selectedGender, setSelectGender] = useState("All")
  const [isChecked, setIsChecked] = useState(false);


  const HandleSelection = (e) => {
    setSelectGender(e.target.value)
  }
  const myStateData = {
    key1: selectedGender,
    key2: searchCountry,
  };


  const getUserProfile = async () => {
    await DataService.getSingleProfile(params.id).then((data) => {
      getProfile(data?.data?.data);
      ref.current.complete();
    });
  };



  useEffect(() => {
    ref.current.continuousStart();
    document.title = "Profile";
    window.scrollTo(0, 0);
    getUserProfile();

  }, []);
  return (
    <>
      <Navbar />
      <LoadingBar color="#C952A0" ref={ref} height={5} shadow={true} />
      <section className="profile_bannerSec">
        <div className="container">
          <h1>User Profile</h1>
          <span>Home / User Profile</span>
        </div>
      </section>
      <section className="single_profileArea">
        <div className="container">
          <div className="single_Pflex">
            <div className="single_pL">
              <div className="single_lockOpen">
                <img src={ProfileOne} alt="" />
                <h5>{profile?.name}</h5>
                <span className="single_age" style={{textTransform : 'capitalize'}}>{profile?.age} ~ {profile?.gender}</span>
                <span>
                  <i class="fas fa-map-marker-alt"></i> {profile?.city}, {profile?.country}
                </span>
                <button className="view_full">View Full Profile</button>
                <div className="single_actionFlex">
                  <button>Like</button>
                  <button>Follow</button>
                  <button>Block</button>
                </div>
              </div>
              <h4>Who is Online</h4>
              <div className="online_profiles">
              <Link to="/chats">
                <div className="onlineInner">
                  <img src={ProfileOne} alt="" />
                  <i class="fas fa-circle"></i>
                </div>
                </Link>
                <Link to="/chats">
                <div className="onlineInner">
                  <img src={ProfileThree} alt="" />
                  <i class="fas fa-circle"></i>
                </div>
                </Link>
                <Link to="/chats">
                <div className="onlineInner">
                  <img src={ProfileFour} alt="" />
                  <i class="fas fa-circle"></i>
                </div>
                </Link>
              </div>
            </div>
            <div className="single_pM">
              <div className="single_gallerySec">
                <div className="gallery_inner">
                  <div className="lock_overlay">
                  <img src={ProfileOne} alt="" />
                  </div>
                  <i class="fas fa-lock"></i>
                </div>
                <div className="gallery_inner">
                  <div className="lock_overlay">
                  <img src={ProfileTwo} alt="" />
                  </div>
                  <i class="fas fa-lock"></i>
                </div>
                <div className="gallery_inner">
                  <div className="lock_overlay">
                  <img src={ProfileThree} alt="" />
                  </div>
                  <i class="fas fa-lock"></i>
                </div>
                <div className="gallery_inner">
                  <div className="lock_overlay">
                  <img src={ProfileFour} alt="" />
                  </div>
                  <i class="fas fa-lock"></i>
                </div>
              </div>
              <button className="send_m">Send Message<i class="fas fa-paper-plane"></i></button>
            </div>
            <div className="single_pR">
              <div className="search_formSec">
                <h4>Quick Search</h4>
                <div className="search_gender">
                <div className="form_field mb-3">
                    <p>
                      <strong>My Gender</strong>
                    </p>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="gender"
                        id="gender_other"
                        value="other"
                        checked={selectedGender === "All"}
                        onChange={HandleSelection}
                      />
                      <label class="form-check-label" for="gender_other">
                        All
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="gender"
                        id="gender_male"
                        value="male"
                        checked={selectedGender === "male"}
                        onChange={HandleSelection}
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
                        checked={selectedGender === "female"}
                        onChange={HandleSelection}
                      />
                      <label class="form-check-label" for="gender_female">
                        Female
                      </label>
                    </div>
                   
                  </div>
                </div>
                <div className="form_field country mb-3">
                  <label>
                    <strong>Select Location</strong>
                  </label>
                  <ReactFlagsSelect
                    selected={searchCountry}
                    onSelect={(code) => setSearchCountry(code)}
                    required
                  />
                </div>
                <Link className="search_submit" to={`/search-results?param1=${myStateData.key1}&param2=${myStateData.key2}`}>
                  Search<i class="fas fa-search"></i>
                </Link>
              </div>
              <div className="recently_joined">
                <h3>Members Near You</h3>
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
      <Footer />
    </>
  );
};

export default SingleLProfile;
