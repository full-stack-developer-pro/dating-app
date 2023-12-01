import React, { useState, useEffect } from "react";
import Logo from "../images/dating-app-logo.png";
import { Link } from "react-router-dom";
import "../customCss/Footer.css";
import DataService from "../services/data.service";

const Footer = () => {
  const [contactData, setContactData] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);

  // const getContactData = async () => {
  //   await DataService.getContactUs().then((data) => {
  //     const catData = data.data.data[0];
  //     setContactData(catData);
  //   });
  // };
  // const getSocialLinks = async () => {
  //   await DataService.getSocialLinks().then((data) => {
  //     const catData = data.data.data[0];
  //     setSocialLinks(catData);
  //   });
  // };

  useEffect(() => {
    // getContactData();
    // getSocialLinks();
  }, []);
  return (
    <>
      <div className="footer_FSec">
        <div className="container">
          <div className="footer_FFlex">
            <div className="footer_FL">
              <img src={Logo} alt="" />
              <ul>
                <li>
                  <Link to="/">
                    <i class="fas fa-circle"></i>Browse profiles
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i class="fas fa-circle"></i>Messages
                  </Link>
                </li>
                <li>
                  <Link to="/profile">
                    <i class="fas fa-circle"></i>My profile
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i class="fas fa-circle"></i>My visitors
                  </Link>
                </li>
                <li>
                  <Link to="/edit-profile">
                    <i class="fas fa-circle"></i>Account settings
                  </Link>
                </li>
                <li>
                  <Link to="/search-results">
                    <i class="fas fa-circle"></i>Search by county
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer_FM">
              <h5>About Us</h5>
              <ul>
                <li>
                  <Link to="/terms-conditions">
                    <i class="fas fa-circle"></i>Terms of Use
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy">
                    <i class="fas fa-circle"></i>Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i class="fas fa-circle"></i>GDPR
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer_FR">
              <h5>Support</h5>
              <ul>
                <li>
                  <Link to="/">
                    <i class="fas fa-circle"></i>Report abuse
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i class="fas fa-circle"></i>Frequently Asked Questions
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i class="fas fa-circle"></i>Helpdesk
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer_bottomBar">
          <div className="new_line">
            <p style={{ color: "white", marginTop: "10px", marginBottom: "10px" }}>Persons appearing in photographs and videos may not be actual members. Other data for illustrative purposes only. MilfHub.co.uk does not conduct criminal background screening of its members.</p>
          </div>
            <p>
              Disclaimer: This website contains adult material, all members and
              persons appearing on this site have contractually represented to
              us that they are 18 years of age or older. Copyright © 1996-2023
              Ind Z Gib Ltd. All rights reserved.{" "}
            </p>
          </div>
        </div>
      </div>
      {/* <div className="footer_main">
        <div className="container">
          <div className="footer_flex">
            <div className="footer_logo">
              <img src={Logo} alt="" />
              <h5>Dating Website</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                pharetra metus ut arcu posuere.
              </p>
            </div>
            <div className="footer_links">
              <h4>Important Links</h4>
              <ul>
                <li>
                  <Link to="/about-us">
                    <i class="fas fa-circle"></i>About Us
                  </Link>
                </li>
                <li>
                  <Link to="/blogs">
                    <i class="fas fa-circle"></i>Blogs
                  </Link>
                </li>
                <li>
                  <Link to="/contact-us">
                    <i class="fas fa-circle"></i>Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy">
                    <i class="fas fa-circle"></i>Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-conditions">
                    <i class="fas fa-circle"></i>Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer_contact">
              <h4>Contact Us</h4>
              <p>
                <i class="fas fa-map-marker-alt"></i>
                {contactData?.address}
              </p>
              <p>
                <i class="fas fa-phone"></i>
                {contactData?.phoneNumber}
              </p>
              <p>
                <i class="far fa-envelope"></i>
                {contactData?.email}
              </p>
              <h5>Connect with Us</h5>
              <div className="social_bar">
                <Link to={socialLinks?.facebook}>
                  <i class="fab fa-facebook-f"></i>
                </Link>
                <Link to={socialLinks?.twitter}>
                  <i class="fab fa-twitter"></i>
                </Link>
                <Link to={socialLinks?.instagram}>
                  <i class="fab fa-instagram"></i>
                </Link>
                <Link to={socialLinks?.linkedin}>
                  <i class="fab fa-linkedin-in"></i>
                </Link>
                <Link to={socialLinks?.snapchat}>
                  <i class="fab fa-snapchat-ghost"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="copyright_sec">
            <p>Copyright © 2023. All Rights Reserved.</p>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Footer;
