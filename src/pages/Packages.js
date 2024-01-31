import React, { useState, useEffect } from 'react'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'
import "../customCss/Package.css"
import DataService from '../services/data.service'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import AddIcon from "../images/add-icon.png"
import GiftIcon from "../images/gift-icon.png"

const Packages = () => {
    const [packages, setPackages] = useState([]);
    const [message, setMessage] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const getPlans = async () => {
        await DataService.getPackages().then((data) => {
            setPackages(data?.data?.data);

        });
    };
    useEffect(() => {
        getPlans()
    }, [])

    const handlePayment = (item) => {
        setMessage("");
        const data = {};
        data.amount = item.price;
        data.plan_id = item.id
        DataService.GeneratePayment(data).then(
            (response) => {
                if (response.data.status === "Success") {
                    toast("Link generated successfully!");
                    console.log(response.data.data.url);
                    const paymentUrl = response.data.data.url;
                    window.location.replace(paymentUrl);
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
    const goBack = () => {
        navigate(-1);
    };
    return (
        <>
            <div className='packages_box_area'>
                <div className="yellow_area">
                    <div className='container'>
                        <h2><i onClick={goBack} class="fas fa-long-arrow-alt-left"></i>Purchase credits</h2>
                    </div>
                </div>
                <div className="tow_packages">
                    <div className='container'>
                        <p><i class="fas fa-exclamation-circle"></i> To send a message on Milf Hub costs 100 credits. Follow the steps below to purchase your credits.</p>
                    </div>
                </div>
                <div className='step_packages'>
                    <div className='container'>
                        <div className='step_package_inner'>
                            <h2>Step 1</h2>
                            <h3>Choose a package</h3>
                        </div>
                    </div>
                </div>

                <div className="container">
                    {
                        packages?.length > 0 ? packages?.map((item) => {
                            return (
                                <>
                                    <div className="packages_boxes_area">

                                        <div className='packages_first'>
                                            <h2><b>{item.credits}</b><br />
                                                credits</h2>
                                        </div>

                                        {
                                            item.bonus == 0 ?
                                                <div className='packages_gift_two'>
                                                </div>
                                                :
                                                <div className='packages_gift'>
                                                    <div className="promo_item">
                                                        <img className="plus_img" src={AddIcon} />
                                                        <img src={GiftIcon} />
                                                        <h2>FREE</h2>
                                                        <h3>{item?.bonus} <br />credits
                                                        </h3>
                                                    </div>
                                                </div>
                                        }

                                        <div className='packages_middle'>
                                            <h3>{item.currency} {item.price}</h3>
                                        </div>
                                        <div className='packages_last'>
                                            <button onClick={() => handlePayment(item)}>Buy</button>
                                        </div>
                                    </div>
                                </>
                            )
                        }) : ""
                    }
                </div>

            </div>


            <Footer />
        </>
    )
}

export default Packages