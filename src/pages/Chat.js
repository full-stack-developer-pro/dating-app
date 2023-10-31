import React, { useState, useEffect, useRef } from "react";
import "../customCss/Chat.css"
import DataService from "../services/data.service";
import moment from "moment";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

import { Link, useParams } from "react-router-dom";
import Footer from "../common/Footer";

const Chats = () => {
    const params = useParams()
    const socket = io("https://dating-app-backend-xyrj.onrender.com:3000");
    const bottomRef = useRef(null);
    const [allChat, setAllChat] = useState([]);
    const [filteredData, setfilteredData] = useState([]);
    const [expandedChat, setExpandedChat] = useState();
    const [mobileAdjust, setMobileAdjust] = useState(true);
    const [expandedChatMessages, setExpandedChatMessages] = useState([]);
    const [showExpandedChat, setShowExpandedChat] = useState(false);
    const [fDisabled, setFDisabled] = useState(true);
    const [noticeCount, setNoticeCount] = useState('');
    const [message, setMessage] = useState();
    const [profile, setProfile] = useState([]);

    const getUserProfile = async () => {
        await DataService.getSingleProfile(params.id).then((data) => {
            setProfile(data?.data?.data);
        });
    };
    // console.log(profile)

    // const getAllChats = async () => {
    //     await DataService.getAllChats()
    //         .then(async (data) => {
    //             setAllChat(data?.data?.data);
    //             setfilteredData(data?.data?.data);
    //         })
    //         .catch((error) => {
    //             const resMessage =
    //                 (error.response &&
    //                     error.response.data &&
    //                     error.response.data.message) ||
    //                 error.message ||
    //                 error.toString();
    //         });
    // };
    const onChangeSearch = (e) => {
        if (e.target.value) {
            const result = allChat.filter((value) => {
                return value.Sender?.first_name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase());
            });
            setfilteredData(result);
        } else {
            setfilteredData(allChat);
        }
    };
    const expandChat = async (id) => {
        await DataService.getSingleProfile(params.id)
            .then(async (data) => {
                setMobileAdjust(true)
                setExpandedChat(data?.data?.data);
                setExpandedChatMessages(data?.data?.data?.Messages.reverse());
                setShowExpandedChat(true);
                setFDisabled(false);
            })

            .catch((error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
            });
    };


    socket.on("chat_message", (data) => {
        console.log("Received message:", data);
        expandChat(data.chat_id);
        console.log(data);
    });
    //   socket.on('chat_message', (data) => {expandChat(data.id)});

    let user_id = JSON.parse(localStorage.getItem("d_user"));
    const sendMessage = (e) => {
        e.preventDefault();
        const data = {
            senderId: user_id,
            receiverId: params.id,
            message: message,
            // createdBy: user_id,
        };
        console.log("Sending message:", data);
        socket.emit("chat_message", data);
        expandChat(params.id);
        setMessage("");
    };
    const setUser = () => {
        let user_id = JSON.parse(localStorage.getItem("d_user"));
        socket.emit("user_added", user_id);
    };

    useEffect(() => {
        getUserProfile()
        // getAllChats();
        setUser();
    }, []);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [expandedChat]);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 950) {
                setMobileAdjust(false);
            } else {
                setMobileAdjust(true);
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);








    return (
        <>
            <div className="chat_sec">
                <div className="chat_flex">
                    <div className="chat_flexL">
                        <div className="searchBar">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Messages here..."
                                onChange={onChangeSearch}
                            />
                            <i class="fas fa-search"></i>
                        </div>
                        {/* {filteredData && filteredData.length > 0 ? (
                            filteredData.map((item, i) => {
                                return (
                                    <>
                                        <div
                                            className="chat_outer"
                                            onClick={() => expandChat(item.id)}
                                        >
                                            <div className="chat_outerImg">
                                                <img src="https://i.pravatar.cc/300" alt="" />
                                            </div>
                                            <div className="chat_outerName">
                                                <h5>
                                                    {item?.Receiver?.first_name
                                                        ? item?.Receiver?.first_name
                                                        : "Random Company"}
                                                </h5>
                                                <p>
                                                    {item?.is_last_message_read === 0 ? (
                                                        <strong>{item?.last_message_text}</strong>
                                                    ) : (
                                                        item?.last_message_text
                                                    )}
                                                </p>
                                                <span>
                                                    <i class="far fa-clock"></i>
                                                    {item?.updatedAt
                                                        ? moment(item?.updatedAt).format("LT")
                                                        : moment(item?.createdAt).format("LT")}
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                );
                            })
                        ) : (
                            <p className="text-center my-4">No Messages Found !!!</p>
                        )} */}
                    </div>
                    {mobileAdjust && (
                        <div className="chat_flexR">
                            {showExpandedChat ? (
                                <>
                                    <div className="chat_expHead">
                                        <div className="back_buttonT">
                                            <button className="back" onClick={(e) => setMobileAdjust(false)}>
                                                <i class="fas fa-long-arrow-alt-left"></i>
                                            </button>
                                        </div>
                                        <div className="chat_expHeadL">
                                            <img src="https://i.pravatar.cc/300" alt="" />
                                        </div>
                                        <div className="chat_expHeadR">
                                            <h5>
                                                {profile.name}
                                                <i class="fas fa-circle"></i>
                                            </h5>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="chat_expHead">
                                        <div className="back_buttonT">
                                            <button className="back" onClick={(e) => setMobileAdjust(false)}>
                                                <i class="fas fa-long-arrow-alt-left"></i>
                                            </button>
                                        </div>
                                        <div className="chat_expHeadL">
                                            <img src="https://i.pravatar.cc/300" alt="" />
                                        </div>
                                        <div className="chat_expHeadR">
                                            <h5>
                                                {profile.name}
                                                <i class="fas fa-circle"></i>
                                            </h5>
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="chat_expBody">
                                {showExpandedChat ? (
                                    expandedChat ? (
                                        expandedChatMessages.map((item, i) => {
                                            return (
                                                <>
                                                    {item.sent_by === user_id.id ? (
                                                        <>
                                                            <div className="chat_right">
                                                                <p className="text_message">
                                                                    {item.message_text}
                                                                    <i class="fas fa-check"></i>
                                                                </p>
                                                                <span>
                                                                    <i class="far fa-clock"></i>
                                                                    {moment(item?.createdAt).format("LT")}
                                                                </span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="chat_left">
                                                                <p className="text_message">
                                                                    {item.message_text}
                                                                </p>
                                                                <span>
                                                                    <i class="far fa-clock"></i>
                                                                    {moment(item?.createdAt).format("LT")}
                                                                </span>
                                                            </div>
                                                        </>
                                                    )}
                                                </>
                                            );
                                        })
                                    ) : (
                                        <>
                                            <p>None</p>
                                        </>
                                    )
                                ) : (
                                    <>
                                        <p>Select a Chat to proceed</p>
                                    </>
                                )}
                                <div ref={bottomRef} />
                            </div>
                            <div className="chat_footer">
                                <form onSubmit={sendMessage}>
                                    <div className="chat_footer_flex">
                                        <input
                                            type="text"
                                            placeholder="Type Your Message ..."
                                            className="form-control"
                                            // disabled={fDisabled}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                        <button
                                            className="main_button"
                                            // disabled={fDisabled}
                                            onClick={sendMessage}
                                        >
                                            <i class="fas fa-paper-plane"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};
export default Chats;
