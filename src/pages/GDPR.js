import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import "../customCss/PrivacyPolicy.css";
import DataService from "../services/data.service";

const GDPR = () => {
  const [gdprData, setgdprData] = useState([]);
  const [html, setHTML] = useState({ __html: "" });

  const getGdprPolicy = async () => {
    DataService.getGdpr().then((data) => {
      setgdprData(data?.data?.data);
      setHTML({ __html: data?.data?.data?.description });
    });
  };
  useEffect(() => {
    document.title = "GDPR";
    window.scrollTo(0, 0);
    getGdprPolicy();
  }, []);
  return (
    <>
      <Navbar />
      <section
        className="profile_bannerSec"
        style={{ padding: "60px 0px", minHeight: "50vh" }}
      >
        <div className="container">
          <h1>GDPR</h1>
        </div>
      </section>
      <div className="privay_mainSec">
        <div className="container">
          <h2>{gdprData?.heading}</h2>
          <p dangerouslySetInnerHTML={html}></p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GDPR;
