import React, { useState } from 'react'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'
import "../customCss/ForgotPassword.css"
import { ToastContainer, toast } from "react-toastify";
import DataService from '../services/data.service';

const Resetlink = () => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")

    const sendForgetEmail = (e) => {
        e.preventDefault();
        const data = {
            email: email

        }
        DataService.ForgotEmail(data).then(
            () => {
                toast.success("Link sent to yuor email");
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
            <Navbar />
            <section className="profile_restPassword">
            </section>
            <div className="forgot_pass_back">
                <div className='container'>
                    <div className="forgot_pass_main">
                        <form onSubmit={sendForgetEmail}>

                        <h2>Forgot password</h2>
                        <div className="pass_field">
                            <label>Email</label>
                            <input type='email' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="submit-btn">
                            <button type='submit' onSubmit={()=>sendForgetEmail()}>Reset my password</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Resetlink