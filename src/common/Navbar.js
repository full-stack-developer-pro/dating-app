import React from "react";
import Logo from "../images/dating-logo.png";

const Navbar = () => {
  return (
    <>
      <div className="main_navbar">
      <div className="navbar_flex">
        <div className="navbarL">
          <img src={Logo} alt="" />
        </div>
        <div className="navbarR">
          <button className="main_buttonTwo">
            Login<i class="fas fa-sign-in-alt"></i>
          </button>
          <button className="main_button">
            Signup<i class="fas fa-user"></i>
          </button>
        </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
