import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import About from "../images/about.jpg";
import DataService from "../services/data.service";

const AboutUs = () => {
  const [data, setData] = useState({});
  const [html, setHTML] = useState({__html: ""});
  const [html2, setHTML2] = useState({__html: ""});
  useEffect(() => {
    document.title = "About Us";
    window.scrollTo(0,0);
    getAboutData();
  }, []);
  const getAboutData = async() => {
    DataService.getAboutUs().then((data) => {
      if(data.data.data.length>0){
          setData(data?.data?.data[0])
          setHTML({__html: data?.data?.data[0]?.Description})
          setHTML2({__html: data?.data?.data[0]?.BottomDescription})
      }   
    });
}
  return (
    <>
      <Navbar />
      <section className="profile_bannerSec">
        <div className="container">
          <h1>About Us</h1>
          <span>Home / About Us</span>
        </div>
      </section>
      <section className="main_pageSec">
        <div className="container my-lg-4 my-sm-2">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <img src={About} alt="" style={{ width: "100%" }} />
            </div>
            <div className="col-sm-6 p-lg-4 p-3">
              <h2>{data?.Heading}</h2>
              <p dangerouslySetInnerHTML={html}></p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 p-lg-0 p-3">
              <h2>{data?.BottomHeading}</h2>
              <p dangerouslySetInnerHTML={html2}></p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutUs;
