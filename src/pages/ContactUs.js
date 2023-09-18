import React, { useEffect } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

const ContactUs = () => {
  useEffect(() => {
    document.title = "Contact Us";
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
      <Footer />
    </>
  );
};

export default ContactUs;
