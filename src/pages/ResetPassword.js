import React, { useState } from 'react'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'
import "../customCss/ForgotPassword.css"
import { ToastContainer, toast } from "react-toastify";
import DataService from '../services/data.service';
import { useNavigate } from 'react-router-dom/dist';


const ResetPassword = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("")
    const [password, setPassword] = useState("")

    const url = window.location.href;
    const token = url.split('/reset-password/')[1];

    const ChangePass = (e) => {
        e.preventDefault();
        const data = {}
        data.token = token
        data.password = password
        data.password_confirmation = confirmPassword
        DataService.NewPassword(data).then(
            () => {
                toast.success("Password Changed SuccessFully");
                navigate("/")
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
                    <from onSubmit={ChangePass}>
                        <div className="forgot_pass_main">
                            <h2>Reset password</h2>
                            <div className="pass_field">
                                <label>Password</label>
                                <input type='password' onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="pass_field">
                                <label>Confirm Password</label>
                                <input type='password' onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <div className="submit-btn">
                                <button type='submit' onClick={ChangePass}>Submit</button>
                            </div>
                        </div>
                    </from>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default ResetPassword