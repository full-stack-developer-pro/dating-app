import React from "react";
import Logo from "../images/dating-logo.png";
import { Link } from "react-router-dom";
import '../customCss/Footer.css'

const Footer = () => {
  return (
    <>
      <div className="footer_main">
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
                <i class="fas fa-map-marker-alt"></i>The Mall, St. James's,
                London SW1Y 5AH, United Kingdom
              </p>
              <p>
                <i class="fas fa-phone"></i>+254 743 022 022
              </p>
              <p>
                <i class="far fa-envelope"></i>wecare@yourbasket.co.ke
              </p>
              <h5>Connect with Us</h5>
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
          <div className="copyright_sec">
            <p>Copyright © 2023. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
