import React from "react";
import NotImage from "../images/notfound.jpg";
import { Link } from "react-router-dom";
import Logo from "../images/dating-app-logo-dark.jpg";

const NotFound = () => {
  return (
    <>
      <div className="not_found">
        <Link to="/">
          <img src={Logo} className="not_logo" alt="" />
        </Link>
        <img src={NotImage} alt="" />
        <Link to="/">
          {" "}
          <button className="main_button">
            <i class="fas fa-long-arrow-alt-left me-2"></i>Homepage
          </button>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
