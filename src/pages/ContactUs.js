import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import "../customCss/ContactUs.css";
import { Link } from "react-router-dom";
import DataService from "../services/data.service";

const ContactUs = () => {
  const [contactData, setContactData] = useState([])
  const [socialLinks, setSocialLinks] = useState([])


  const getContactData = async() => {
    await DataService.getContactUs().then((data) => {
      const catData = data.data.data;
        setContactData(catData)
    });
}
const getSocialLinks = async() => {
  await DataService.getSocialLinks().then((data) => {
    const catData = data.data.data;
      setSocialLinks(catData);
  });
}
const mapUrl = `https://maps.google.com/maps?q=${contactData.lat},${contactData.long}&z=12&output=embed`;

    useEffect(() => {
        document.title = "Contact Us"
        window.scrollTo(0,0);
        getContactData();
        getSocialLinks();
      },[])
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
                  width="100%"
                    height="450"
                    title="gmaps"
                    allowfullscreen=""
                    loading="lazy"
                    src={mapUrl}
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
                <p>{contactData?.address}</p>
                <h4>Information</h4>
                <p>
                  <strong>Phone Number</strong> : {contactData?.phoneNumber}
                  <br />
                  <strong>Email</strong> : {contactData?.email}
                </p>
                <h4>Connect with Us</h4>
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
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
