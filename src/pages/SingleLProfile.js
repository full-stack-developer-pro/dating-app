import React, { useEffect, useState } from "react";
import "../customCss/Home.css";
import "../customCss/SingleL.css";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import ProfileOne from "../images/profile1.jpg";
import ProfileTwo from "../images/profile2.jpg";
import ProfileThree from "../images/profile3.jpg";
import ProfileFour from "../images/profile4.jpg";
import ReactFlagsSelect from "react-flags-select";

const SingleLProfile = () => {
  const [country, setCountry] = useState("");

  useEffect(() => {
    document.title = "Profile";
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Navbar />
      
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
                <h5>Jessica M.</h5>
                <span className="single_age">28 ~ F</span>
                <span>
                  <i class="fas fa-map-marker-alt"></i> London
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
