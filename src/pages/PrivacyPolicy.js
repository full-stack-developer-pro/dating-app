import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import "../customCss/PrivacyPolicy.css";
import DataService from "../services/data.service";

const PrivacyPolicy = () => {
  const [privacyData, setPrivacyData] = useState([]);
  const [html, setHTML] = useState({ __html: "" });

  const getPrivacyPoicy = async () => {
    DataService.getPrivacyPoicy().then((data) => {
      if (data.data.data.length > 0) {
        setPrivacyData(data?.data?.data[0]);
        setHTML({ __html: data?.data?.data[0]?.description });
      }
    });
  };
  useEffect(() => {
    document.title = "Privacy Policy";
    window.scrollTo(0, 0);
    getPrivacyPoicy();
  }, []);
  return (
    <>
      <Navbar />
      <section className="profile_bannerSec">
        <div className="container">
          <h1>Privacy Policy</h1>
          <span>Home / Privacy Policy</span>
        </div>
      </section>
      <div className="privay_mainSec">
        <div className="container">
          <h2>{privacyData?.heading}</h2>
          <p dangerouslySetInnerHTML={html}></p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
