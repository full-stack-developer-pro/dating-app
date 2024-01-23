import React, { useEffect, useState } from "react";
import Logo from "../images/dating-app-logo.png";
import "../customCss/Navbar.css";
import OP from "../images/dating-banner.jpg";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import DataService from "../services/data.service";
import profile1 from "../images/profile1.jpg"
import moment from "moment";

const NavbarProfile = () => {
    const [loading, setLoading] = useState(false);
    const [packages, setPackages] = useState("");
    const [payments, setPayments] = useState(false);
    const [notifications, setNotifications] = useState('');
    const [notificationLength, setNotificationLength] = useState('');
    const auth = AuthService.getCurrentUserTokken();
    const [message, setMessage] = useState("");
    const [profile, setProfile] = useState("");
    const [notification, setShowNotification] = useState(false);
    const navigate = useNavigate();

    const handlePayment = (price) => {
        setMessage("");
        const data = {};
        // data.userId = user_id;
        data.amount = price;

        DataService.GeneratePayment(data).then(
            (response) => {
                if (response.data.status === "Success") {
                    toast("Link generated successfully!");
                    console.log(response.data.data.url);
                    const paymentUrl = response.data.data.url;
                    window.location.replace(paymentUrl); // Use replace for proper redirection
                } else {
                    toast("Failed to generate the payment link.");
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
    const getPlans = async () => {
        if (auth) {
            await DataService.getPackages().then((data) => {
                setPackages(data?.data?.data);

            })
        }
    };
    console.log(packages)
    useEffect(() => {
        getPlans()
    }, [])

    const getNotifications = async () => {
        if (auth) {
            await DataService.getNotification().then((data) => {
                setNotifications(data?.data?.data?.notifications);
                setNotificationLength(data?.data?.data?.counts.unread)
            })
        }
    };

    useEffect(() => {
        getNotifications()
    }, [])

    const handleNotification = (id) => {
        const data = {}
        data.ids = [id]
        DataService.UpdateNotification(data).then(
            () => {
                setTimeout(() => {

                }, 2000)
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
                setMessage(resMessage);
            }
        );
    };


    return (
        <>
            {payments && (
                <div className="payments_popup">
                    <div className="payments_inner">
                        <div className="container">
                            <div className="payments_flexOne">

                                <div className="payment_bg">
                                    <div className="cross_btn">
                                        <i onClick={() => setPayments(false)} class="fas fa-window-close"></i>
                                    </div>
                                    {
                                        packages?.length > 0 ? packages?.map((item) => {
                                            return (
                                                <>

                                                    <div className="payments_plan">
                                                        <h2>{item.credits}</h2>
                                                        <span className="bonus">{item.bonus}</span>
                                                        <h4>credits</h4>
                                                        <hr />
                                                        <h3>Just For</h3>
                                                        <p>
                                                            <span>{item.currency} {item.price}</span>
                                                        </p>
                                                        <hr />
                                                        <button className="main_button" onClick={() => handlePayment(item.price)}>Purchase Now</button>
                                                    </div>
                                                </>
                                            )
                                        }) : ""
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}

            {
                auth && (
                    <>
                    <div className="cradits_bg">

                        <div className="maincreadits">
                            <div className="main_craedits_one">
                         <Link to="/">
                                <img src={Logo} alt="" />
                            </Link>
                            </div>
                        <div className="main_craedits_two" style={{ padding: "10px 0px" }}>
                           
                                {notification && (
                                    <div className="notification_main">
                                        <div className="notification_pop">
                                            <div className="payment_bg_notification">
                                                <div className="notification_heading">
                                                    <h2>Notifications</h2>
                                                </div>
                                                {
                                                    notifications?.length > 0 ? notifications?.map((item) => {
                                                        return (
                                                            <>

                                                                {/* {item?.user ? (
                                <Link to={"/single-profile/" + item?.user?.id}>
                                  <div className="mainnotification_text" onClick={() => handleNotification(item.id)}>
                                    <div className="ntificationone">
                                      <img src={item?.user ? item?.user?.profile_path : profile1} />
                                    </div>
                                    <div className="notification_text">
                                      <p>
                                        {item?.body}
                                      </p>
                                      <h2>Just now</h2>
                                    </div>
                                  </div>
                                </Link>

                              ) : null} */}

                                                                {item?.user ? (
                                                                    <Link to={"/single-profile/" + item?.user?.id}>
                                                                        <div className="mainnotification_text" onClick={() => handleNotification(item.id)}>
                                                                            <div className="ntificationone">
                                                                                <img src={item?.user ? item?.user?.profile_path : profile1} />
                                                                            </div>
                                                                            <div className="notification_text">
                                                                                <p>
                                                                                    {item?.body}
                                                                                </p>

                                                                                <h2>{item?.created_at ? moment(item?.created_at).format('LT') : " "}</h2>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                ) : (
                                                                    <div className="mainnotification_text" onClick={() => handleNotification(item.id)}>
                                                                        <div className="ntificationone">
                                                                            <img src={profile1} />
                                                                        </div>
                                                                        <div className="notification_text">
                                                                            <p>
                                                                                {item?.body}
                                                                            </p>
                                                                            <h2>{item?.created_at ? moment(item?.created_at).format('LT') : " "}</h2>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                            </>
                                                        )
                                                    }) : ""
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="notification_area">
                                    <i onClick={() => setShowNotification(!notification)} class="fas fa-bell"></i>
                                    <div className="notification_count" style={{backgroundColor:"#fff"}}>
                                        <h1 style={{color:"#300243"}}>{notificationLength}</h1>
                                    </div>
                                </div>
                                <div className="span_credits white_spancredits">
                                    <h1 style={{color:"#fff"}}>Account Balance</h1>
                                    <p style={{color:"#fff"}}><b style={{ marginRight: "10px",color:"#fff"}}>{profile?.credits}</b> Credits</p>
                                </div>
                                <div className="buy_nowbtn">
                                    <button className="main_buttonTwo credits" onClick={() => setPayments(true)}>
                                        Buy now
                                    </button>
                                </div>

                        </div>
                        </div>
                    </div>
                    </>
                )
            }

        </>
    )
}

export default NavbarProfile