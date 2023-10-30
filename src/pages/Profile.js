import React, {useEffect, useState, useRef} from "react";
import Navbar from "../common/Navbar";
import "../customCss/Profile.css";
import "../customCss/Home.css";
import ProfileOne from "../images/profile1.jpg";
import Verified from "../images/verified.jpg";
import Footer from "../common/Footer";
import DataService from "../services/data.service";
import moment from "moment";
import LoadingBar from 'react-top-loading-bar'
import { Link } from "react-router-dom";

const Profile = () => {
  const ref = useRef(null)
  const [profile, getProfile] = useState([]);
  const userId = JSON.parse(localStorage.getItem("d_user"))

  const getUserProfile = async () => {
    await DataService.getSingleProfile(userId).then((data) => {
      getProfile(data?.data?.data);
      ref.current.complete()
    });
  };
  useEffect(() => {
    document.title = "Edit Profile"
    window.scrollTo(0,0)
    getUserProfile();
    ref.current.continuousStart()
},[userId])
  return (
    <>
      <Navbar />
      <LoadingBar color='#C952A0' ref={ref} height={5} shadow={true} />
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
                   {profile?.name}<i className="fas fa-circle"></i>
                  </h2>
                  <Link to={"/edit-profile"}>
                  <button
                    className="main_button"
                    style={{ margin: "0", padding: "10px 35px" }}
                  >
                    Edit Profile<i class="fas fa-pencil-alt"></i>
                  </button>
                  </Link>
                </div>
                <p>
                  <i class="fas fa-map-marker-alt"></i> {profile?.city}, {profile?.country}
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
                  <p>{profile?.gender==="male" ? "Male" : profile?.gender === "female" ? "Female" : "Other"}</p>
                </div>
                <div className="profileEntry">
                  <p>
                    <i class="fas fa-birthday-cake"></i> Birth Date
                  </p>
                  <p>:</p>
                  <p>{moment(profile?.birthdate).format('LL')}</p>
                </div>
                <div className="profileEntry">
                  <p>
                    <i class="fas fa-map-marker-alt"></i> City
                  </p>
                  <p>:</p>
                  <p>{profile?.city}, {profile?.postcode}</p>
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
                  <p>{profile?.interests && profile?.interests.length>0 ? profile?.interests?.map((item,i) => {return(item+", ")}) : ''}</p>
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
