import React, { useEffect } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import About from "../images/about.jpg";

const AboutUs = () => {
  useEffect(() => {
    document.title = "About Us";
  }, []);
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
              <h2>Lorem Ipsum</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id
                fermentum nisi. Suspendisse nunc dui, vehicula sed nunc ac,
                suscipit dapibus nibh. Vivamus at convallis quam. Quisque
                malesuada, orci ac ultricies egestas, libero nisi euismod eros,
                in varius nisl odio non mi. Curabitur porta bibendum sodales. Ut
                efficitur vulputate leo, eget scelerisque ligula vulputate et.
                Duis eu tempus nisi. Morbi ultricies, libero quis viverra
                dignissim, mauris nisl vehicula ipsum, in aliquam nulla sem id
                mauris. Donec ac volutpat nulla. Fusce venenatis lacus ac neque
                aliquam, sed ultrices massa elementum.{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 p-lg-0 p-3">
              <h2>Donec ac volutpat nulla</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id
                fermentum nisi. Suspendisse nunc dui, vehicula sed nunc ac,
                suscipit dapibus nibh. Vivamus at convallis quam. Quisque
                malesuada, orci ac ultricies egestas, libero nisi euismod eros,
                in varius nisl odio non mi. Curabitur porta bibendum sodales. Ut
                efficitur vulputate leo, eget scelerisque ligula vulputate et.
                Duis eu tempus nisi. Morbi ultricies, libero quis viverra
                dignissim, mauris nisl vehicula ipsum, in aliquam nulla sem id
                mauris. Donec ac volutpat nulla. Fusce venenatis lacus ac neque
                aliquam, sed ultrices massa elementum.{" "}
              </p>
              <p>
                Morbi interdum viverra lorem, eget euismod risus malesuada nec.
                Curabitur non gravida velit. Suspendisse potenti. Donec accumsan
                elit vel lorem sollicitudin, placerat fermentum urna posuere.
                Integer sit amet ultricies est. Suspendisse tristique massa
                orci, a dapibus ligula pretium non. Vestibulum tristique velit
                in mi vestibulum, vel placerat massa maximus. Quisque mollis
                lectus lorem, ut rhoncus massa semper nec. Pellentesque non
                massa eget nunc placerat bibendum sit amet sit amet ex. In quis
                lacus convallis, consequat purus non, dapibus nisi.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutUs;
