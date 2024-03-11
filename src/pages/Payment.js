
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../images/dating-app-logo-dark.jpg";
import { toast } from "react-toastify";
import { useLocation } from 'react-router-dom';
import DataService from '../services/data.service';
import { useNavigate } from 'react-router-dom';
const Payments = () => {
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  let user_id = JSON.parse(localStorage.getItem("d_user"));
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const saleId = queryParams.get("saleID");
  const navigate = useNavigate();


  const handlePayment = () => {
    setMessage("");
    const data = {};
    data.userId = user_id
    data.saleId = saleId
    DataService.verifyPayment(data).then(
      (response) => {
        if (response.status === "Success" || response.status === "success") {
          toast("Verify successfully!");
          navigate("/");
        } else {
          toast.error("Failed to verify");
        }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.msg) ||
          error.message ||
          error.toString();
        setLoading(false);
        toast.error(resMessage, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    );

  };

  return (
    <>
   <div className="not_found">
        <Link to="/">
          <img src={Logo} className="not_logo" alt="" />
        </Link>
        <h2>Thank you for payment</h2>

        <Link to="/">
          {" "}
          <button className="main_button" onClick={()=>handlePayment()}>
           Verify 
          </button>
        </Link>
      </div>
    
    </>
  );
};

export default Payments;

