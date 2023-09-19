import React, {useEffect} from "react";
import "../customCss/Home.css";
import Heart from "../images/heart.png";
import Navbar from "../common/Navbar";
import ProfileOne from "../images/profile1.jpg";
import ProfileTwo from "../images/profile2.jpg";
import ProfileThree from "../images/profile3.jpg";
import ProfileFour from "../images/profile4.jpg";
import About from "../images/about.jpg";
import Steps from "../images/steps.png";
import Footer from "../common/Footer";

const Home = () => {
  useEffect(() => {
 window.scrollTo(0,0)
  },[])
  return (
    <>
      <Navbar />
      <div className="top_banner">
        <div className="content_sec">
          <img src={Heart} alt="" className="heartTwo" />
          <h1>Lorem ipsum dolor sit amet consectetur</h1>
          <p>
            Sed blandit eleifend hendrerit. Integer pulvinar congue
            sollicitudin. Ut tincidunt, ligula vel vulputate congue, ex libero
            tristique magna, eu posuere urna nulla at orci.
          </p>
          <button className="main_button">
            Explore<i class="fas fa-chevron-right"></i>
          </button>
          <img src={Heart} alt="" className="heartOne" />
        </div>
      </div>
      <section className="profiles_section">
        <div className="container">
          <div className="profiles_mainSec">
            <h2 className="main_title">Explore Some Profiles Here</h2>
          </div>
          <div className="profile_flex">
            <div className="profile_inner">
              <img src={ProfileOne} alt="" />
              <div className="gender_ico_f">
                <i class="fas fa-venus"></i>
              </div>
              <div className="profile_body">
                <div className="d-flex align-items-center justify-content-between">
                  <h5>Emily Wilson</h5>
                  <h6 className="f-gender">24~F</h6>
                </div>
                <p className="profile_location">
                  <i class="fas fa-map-marker-alt"></i>London
                </p>
                <p className="profile_description">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit dolor
                  sit.
                </p>
                <div className="profile_buttons">
                  <button className="chat_now">Start Chat</button>
                  <button className="add_friend">
                    <i class="fas fa-user-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="profile_inner">
              <img src={ProfileTwo} alt="" />
              <div className="gender_ico_m">
                <i class="fas fa-mars"></i>
              </div>
              <div className="profile_body">
                <div className="d-flex align-items-center justify-content-between">
                  <h5>Emily Wilson</h5>
                  <h6 className="f-gender">27~M</h6>
                </div>
                <p className="profile_location">
                  <i class="fas fa-map-marker-alt"></i>New York
                </p>
                <p className="profile_description">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit dolor
                  sit.
                </p>
                <div className="profile_buttons">
                  <button className="chat_now">Start Chat</button>
                  <button className="add_friend">
                    <i class="fas fa-user-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="profile_inner">
              <img src={ProfileThree} alt="" />
              <div className="gender_ico_f">
                <i class="fas fa-venus"></i>
              </div>
              <div className="profile_body">
                <div className="d-flex align-items-center justify-content-between">
                  <h5>Emily Wilson</h5>
                  <h6 className="f-gender">31~F</h6>
                </div>
                <p className="profile_location">
                  <i class="fas fa-map-marker-alt"></i>Egypt
                </p>
                <p className="profile_description">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit dolor
                  sit.
                </p>
                <div className="profile_buttons">
                  <button className="chat_now">Start Chat</button>
                  <button className="add_friend">
                    <i class="fas fa-user-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="profile_inner">
              <img src={ProfileFour} alt="" />
              <div className="gender_ico_m">
                <i class="fas fa-mars"></i>
              </div>
              <div className="profile_body">
                <div className="d-flex align-items-center justify-content-between">
                  <h5>Emily Wilson</h5>
                  <h6 className="f-gender">36~M</h6>
                </div>
                <p className="profile_location">
                  <i class="fas fa-map-marker-alt"></i>France
                </p>
                <p className="profile_description">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit dolor
                  sit.
                </p>
                <div className="profile_buttons">
                  <button className="chat_now">Start Chat</button>
                  <button className="add_friend">
                    <i class="fas fa-user-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="profile_inner">
              <img src={ProfileThree} alt="" />
              <div className="gender_ico_f">
                <i class="fas fa-venus"></i>
              </div>
              <div className="profile_body">
                <div className="d-flex align-items-center justify-content-between">
                  <h5>Emily Wilson</h5>
                  <h6 className="f-gender">31~F</h6>
                </div>
                <p className="profile_location">
                  <i class="fas fa-map-marker-alt"></i>Egypt
                </p>
                <p className="profile_description">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit dolor
                  sit.
                </p>
                <div className="profile_buttons">
                  <button className="chat_now">Start Chat</button>
                  <button className="add_friend">
                    <i class="fas fa-user-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="profile_inner">
              <img src={ProfileFour} alt="" />
              <div className="gender_ico_m">
                <i class="fas fa-mars"></i>
              </div>
              <div className="profile_body">
                <div className="d-flex align-items-center justify-content-between">
                  <h5>Emily Wilson</h5>
                  <h6 className="f-gender">36~M</h6>
                </div>
                <p className="profile_location">
                  <i class="fas fa-map-marker-alt"></i>France
                </p>
                <p className="profile_description">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit dolor
                  sit.
                </p>
                <div className="profile_buttons">
                  <button className="chat_now">Start Chat</button>
                  <button className="add_friend">
                    <i class="fas fa-user-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="profile_inner">
              <img src={ProfileOne} alt="" />
              <div className="gender_ico_f">
                <i class="fas fa-venus"></i>
              </div>
              <div className="profile_body">
                <div className="d-flex align-items-center justify-content-between">
                  <h5>Emily Wilson</h5>
                  <h6 className="f-gender">24~F</h6>
                </div>
                <p className="profile_location">
                  <i class="fas fa-map-marker-alt"></i>London
                </p>
                <p className="profile_description">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit dolor
                  sit.
                </p>
                <div className="profile_buttons">
                  <button className="chat_now">Start Chat</button>
                  <button className="add_friend">
                    <i class="fas fa-user-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="profile_inner">
              <img src={ProfileTwo} alt="" />
              <div className="gender_ico_m">
                <i class="fas fa-mars"></i>
              </div>
              <div className="profile_body">
                <div className="d-flex align-items-center justify-content-between">
                  <h5>Emily Wilson</h5>
                  <h6 className="f-gender">27~M</h6>
                </div>
                <p className="profile_location">
                  <i class="fas fa-map-marker-alt"></i>New York
                </p>
                <p className="profile_description">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit dolor
                  sit.
                </p>
                <div className="profile_buttons">
                  <button className="chat_now">Start Chat</button>
                  <button className="add_friend">
                    <i class="fas fa-user-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="load_more">
            <button className="main_button">
              Load More<i class="fas fa-long-arrow-alt-right"></i>
            </button>
          </div>
        </div>
      </section>
      <section className="about_section">
        <div className="container">
          <div className="about_flex">
            <div className="about_flexL">
              <img src={About} alt="" />
            </div>
            <div className="about_flexR">
              <h2>Mauris non nulla faucibus</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                a lacus nec lacus mollis condimentum in id justo. Pellentesque
                eleifend, magna sit amet laoreet euismod, turpis mauris posuere
                tortor, ac tristique sem ex eget lectus. Etiam sed erat magna.
                Nam in mi scelerisque, commodo lacus et, facilisis nibh.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                a lacus nec lacus mollis condimentum in id justo. Pellentesque
                eleifend, magna sit amet laoreet euismod, turpis mauris posuere
                tortor, ac tristique sem ex eget lectus. Etiam sed erat magna.
                Nam in mi scelerisque, commodo lacus et, facilisis nibh.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="how_it_works">
        <div className="container">
          <div className="how_it_worksInner">
            <h2 className="main_title">How It Works</h2>
            <img src={Steps} alt="" />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
