import React, { useEffect, useState } from 'react'
import NavbarProfile from '../common/NavbarProfile'
import Footer from '../common/Footer'
import "../customCss/Helpdesk.css"
import { ToastContainer, toast } from "react-toastify";
import DataService from '../services/data.service';

const HelpDesk = () => {
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {};
        data.category = category
        data.description = description
        setLoading(true);
        await DataService.helpdesk(data).then(
            () => {
                setLoading(false);
                toast.success("Form Submitted Successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setLoading(false);
            }
        );
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <NavbarProfile />
            <div className='help_desk_main'>
                <div className='container'>
                    <div className='help_Desk_inner'>
                        <form onSubmit={handleSubmit}>
                            <h2 className='help_main'>Helpdesk</h2>
                            <p>Before submitting your question we kind ask you to search on our Frequently Asked Questions page.</p>
                            <div className='help_desk_cat'>
                                <label>Choose the category of your question</label>
                                <select onChange={(e) => setCategory(e.target.value)}>
                                    <option value="General">General</option>
                                    <option value="Payments">Payments</option>
                                </select>
                            </div>
                            <div className='help_desk_textarea'>
                                <label>Describe your question</label>
                                <textarea onChange={(e) => setDescription(e.target.value)} name="question" placeholder="Please write here..." class="textarea" rows={6}></textarea>
                            </div>
                            <div className='help_desk_btn'>
                                <button className='main_buttonTwo credits'>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default HelpDesk