import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import "../customCss/PrivacyPolicy.css";
import DataService from "../services/data.service";


const TermsConditions = () => {
  const [termsData, setTermsData] = useState([]);
  const [html, setHTML] = useState({ __html: "" });

  const getTermsConditions = async () => {
    DataService.getTermsConditions().then((data) => {
        setTermsData(data?.data?.data);
        setHTML({ __html: data?.data?.data?.description });
    
    });
  };
  useEffect(() => {
    document.title = "Terms & Conditions";
    window.scrollTo(0, 0);
    getTermsConditions();
  }, []);
  return (
    <>
      <Navbar />
      <section className="profile_bannerSec" style={{padding:"60px 0px",minHeight:"50vh"}}>
        <div className="container">
          <h1>Terms & Conditions</h1>
          <span>Home / Terms & Conditions</span>
        </div>
      </section>
      <div className="privay_mainSec">
        <div className="container">
        <h2>{termsData?.heading}</h2>
         <p dangerouslySetInnerHTML={html}></p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsConditions;
