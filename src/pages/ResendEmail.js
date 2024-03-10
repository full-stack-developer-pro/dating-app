import React, { useState } from 'react'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'
import "../customCss/ForgotPassword.css"
import { ToastContainer, toast } from "react-toastify";
import DataService from '../services/data.service';
import { useNavigate } from 'react-router-dom/dist';
import NavbarProfile from '../common/NavbarProfile';


const ResendEmail = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")




    const ChangePass = (e) => {
        e.preventDefault();
      
        const data = {
            email:email
        };

        DataService.ChangeEmail(data).then(
            () => {
                toast.success('Email changed Successfully');
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                toast.error(resMessage, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setLoading(false);
            }
        );
    };


    return (
        <>
            <NavbarProfile />
            <section className="profile_restPassword">

            </section>
            <div className="forgot_pass_back">
                <div className='container'>
                    <from onSubmit={ChangePass}>
                        <div className="forgot_pass_main">
                            <h2>Update Email Address</h2>
                            <div className="pass_field">
                                <label>Email</label>
                                <input type="email" onChange={(e) => setEmail(e.target.value)} />
                               
                            </div>
                             
                            <div className="submit-btn">
                                <button type='submit' onClick={ChangePass}>Save and Send Email</button>
                            </div>
                        </div>
                    </from>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default ResendEmail