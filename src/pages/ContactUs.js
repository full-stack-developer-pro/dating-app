import React, { useEffect } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import "../customCss/ContactUs.css";
import { Link } from "react-router-dom";

const ContactUs = () => {
  useEffect(() => {
    document.title = "Contact Us";
    window.scrollTo(0,0)
  }, []);
  return (
    <>
      <Navbar />
      <section className="profile_bannerSec">
        <div className="container">
          <h1>Contact Us</h1>
          <span>Home / Contact Us</span>
        </div>
      </section>
      <div className="main_contactSection">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-7">
              <div class="mapouter">
                <div class="gmap_canvas">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158857.83988653394!2d-0.26640295916129586!3d51.528739805084825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sin!4v1695099943051!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    title="gmaps"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    style={{ borderRadius: "25px" }}
                  ></iframe>
                </div>
              </div>
            </div>
            <div className="col-sm-5">
              <div className="contact_right">
                <h2>Contact Us</h2>
                <h4>Address</h4>
                <p>The Mall, St. James's, London SW1Y 5AH, United Kingdom</p>
                <h4>Information</h4>
                <p>
                  <strong>Phone Number</strong> : +123 456 789 0134
                  <br />
                  <strong>Email</strong> : wecare@datingapp.com
                </p>
                <h4>Connect with Us</h4>
                <div className="social_bar">
                  <Link to="">
                    <i class="fab fa-facebook-f"></i>
                  </Link>
                  <Link to="">
                    <i class="fab fa-twitter"></i>
                  </Link>
                  <Link to="">
                    <i class="fab fa-instagram"></i>
                  </Link>
                  <Link to="">
                    <i class="fab fa-linkedin-in"></i>
                  </Link>
                  <Link to="">
                    <i class="fab fa-snapchat-ghost"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
