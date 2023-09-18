import React, {useEffect} from "react";
import Navbar from "../common/Navbar";
import "../customCss/Profile.css";
import "../customCss/Home.css";
import ProfileOne from "../images/profile1.jpg";
import Verified from "../images/verified.jpg";
import Footer from "../common/Footer";

const Profile = () => {
  useEffect(() => {
    document.title = "Profile"
},[])
  return (
    <>
      <Navbar />
      <section className="profile_bannerSec">
        <div className="container">
          <h1>My Profile</h1>
          <span>Home / Profile</span>
        </div>
      </section>
      <section className="main_proflieSec">
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
                    Emily Jackson<i className="fas fa-circle"></i>
                  </h2>
                  <button
                    className="main_button"
                    style={{ margin: "0", padding: "10px 35px" }}
                  >
                    Chat Now<i class="far fa-comments"></i>
                  </button>
                </div>
                <p>
                  <i class="fas fa-map-marker-alt"></i> London
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  ut imperdiet est. Fusce lobortis iaculis neque at dignissim.
                  Cras aliquet erat sed egestas sagittis.
                </p>
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
                  <p>emily@dopmail.com</p>
                </div>
                <div className="profileEntry">
                  <p>
                    <i class="fas fa-user"></i> Gender
                  </p>
                  <p>:</p>
                  <p>Female</p>
                </div>
                <div className="profileEntry">
                  <p>
                    <i class="fas fa-birthday-cake"></i> Birth Date
                  </p>
                  <p>:</p>
                  <p>01 Jan. 1987</p>
                </div>
                <div className="profileEntry">
                  <p>
                    <i class="fas fa-map-marker-alt"></i> City
                  </p>
                  <p>:</p>
                  <p>London, 121101</p>
                </div>
                <div className="profileEntry">
                  <p>
                    <i class="fas fa-clock"></i> Timezone
                  </p>
                  <p>:</p>
                  <p>UTC + 9.30</p>
                </div>
                <div className="profileEntry">
                  <p>
                    <i class="fas fa-text-height"></i> Height
                  </p>
                  <p>:</p>
                  <p>5'6"</p>
                </div>
              </div>
              <div className="profile_dFlexR">
                <div className="profileEntry">
                  <p>
                    <i class="fas fa-weight"></i> Weight
                  </p>
                  <p>:</p>
                  <p>50Kg</p>
                </div>
                <div className="profileEntry">
                  <p>
                    <i class="fas fa-eye"></i> Eye Color
                  </p>
                  <p>:</p>
                  <p>Brown</p>
                </div>
                <div className="profileEntry">
                  <p>
                    <i class="fas fa-tint"></i> Hair Color
                  </p>
                  <p>:</p>
                  <p>Black</p>
                </div>
                <div className="profileEntry">
                  <p>
                    <i class="fab fa-servicestack"></i> Hair Length
                  </p>
                  <p>:</p>
                  <p>Long</p>
                </div>
                <div className="profileEntry">
                  <p>
                    <i class="fas fa-ring"></i> Marital Status
                  </p>
                  <p>:</p>
                  <p>Single</p>
                </div>
                <div className="profileEntry">
                  <p>
                    <i class="fas fa-futbol"></i> Interests
                  </p>
                  <p>:</p>
                  <p>Music, Travel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Profile;
