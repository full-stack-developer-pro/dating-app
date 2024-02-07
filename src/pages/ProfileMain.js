import React, { useState, useEffect, useRef } from 'react'
import NavbarProfile from '../common/NavbarProfile';
import Footer from '../common/Footer';
import DataService from '../services/data.service';
import moment from "moment";
import Verified from "../images/verified.jpg";
import NoImage from "../images/noImage.png"
import { Link } from 'react-router-dom';

const ProfileMain = () => {

    const [profile, setProfile] = useState([]);
    const userId = JSON.parse(localStorage.getItem("d_user"));

    const getUserProfile = async () => {
        await DataService.getSingleProfile(userId).then((data) => {
            setProfile(data?.data?.data?.user);

        });
    };


    useEffect(() => {
        window.scrollTo(0, 0);
        getUserProfile();
    }, []);
    
    const handleImage = (e) => {
        e.target.src = NoImage
    }
    return (
        <>
            <NavbarProfile />
            <div className='container'>
                <div className="show_edit_bgareatwo">
                    <div className="profileFlex">
                        <div className="profileFlexL">
                            <img onError={handleImage} src={profile?.profile_path} />
                            {/* <div className="gender_iop">
                        <i class="fas fa-venus"></i>
                      </div> */}
                        </div>
                        <div className="profileFlexR">
                            <div className="profile_title">
                                <div className="d-flex align-items-center justify-content-between">
                                    <h2>
                                        {profile?.name}
                                        <i className="fas fa-circle"></i>
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
                                    <i class="fas fa-map-marker-alt"></i> {profile?.country}
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
                                        <i class="fas fa-map-marker-alt"></i> Country
                                    </p>
                                    <p>:</p>
                                    <p>
                                        {profile?.country}
                                    </p>
                                </div>
                                {/* <div className="profileEntry">
                  <p>
                    <i class="fas fa-clock"></i> Timezone
                  </p>
                  <p>:</p>
                  <p>{profile?.timezone?.label}</p>
                </div> */}
                                {/* <div className="profileEntry">
                  <p>
                    <i class="fas fa-text-height"></i> Height
                  </p>
                  <p>:</p>
                  <p>{profile?.height}</p>
                </div> */}
                            </div>
                            <div className="profile_dFlexR">
                                {/* <div className="profileEntry">
                  <p>
                    <i class="fas fa-weight"></i> Weight
                  </p>
                  <p>:</p>
                  <p>{profile?.weight}Kg</p>
                </div> */}
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
                                {/* <div className="profileEntry">
                  <p>
                    <i class="fab fa-servicestack"></i> Hair Length
                  </p>
                  <p>:</p>
                  <p>{profile?.hair_length}</p>
                </div> */}
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
            </div>
            <Footer />
        </>
    )
}

export default ProfileMain