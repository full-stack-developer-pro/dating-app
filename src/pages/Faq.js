import React, { useState, useEffect } from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import "../customCss/Accordins.css"
import DataService from '../services/data.service';
import parse from 'html-react-parser';


const AccordionItem = ({ title, content, isOpen, toggleAccordion }) => {
    return (
        <div className="accordion-item">
            <div className="accordion-header" onClick={toggleAccordion}>
                <h2>{title}</h2>
                <span>{isOpen ? '▼' : '►'}</span>
            </div>
            {isOpen && <div className="accordion-content">{content}</div>}
        </div>
    );
};

function App() {
    const parse = require('html-react-parser').default;

    const [faqData, setFaqData] = useState([]);

    const getFaq = async () => {
        DataService.getFAQ().then((data) => {
            setFaqData(data?.data?.data);
        });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        getFaq();
    }, []);

    const [accordionState, setAccordionState] = useState({});

    const toggleAccordion = (index) => {
        setAccordionState(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    return (
        <>
            <Navbar />
            <section className="profile_bannerSec" style={{ padding: "60px 0px", minHeight: "40vh" }}>
                <div className="container">
                    <h1 style={{fontSize:"26px"}}>Frequently Asked Questions</h1>
                </div>
            </section>
            <div className="container">
                <div className="main_accordins">
                    <div className='main_heading_accordin'>
                        <h1>How can we help you?</h1>
                        <p>Frequently Asked Questions</p>
                    </div>

                    <div className='main_flex_acc'>
                        {
                            faqData?.length > 0 ? faqData?.map((item, index) => (
                                <AccordionItem
                                    key={index}
                                    title={item.heading}
                                    content={parse(item.description)}
                                    isOpen={accordionState[index]}
                                    toggleAccordion={() => toggleAccordion(index)}
                                />
                            )) : ""
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default App;
