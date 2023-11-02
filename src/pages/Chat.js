import React, { useState, useEffect, useRef } from "react";
import "../customCss/Chat.css";
import DataService from "../services/data.service";
import moment from "moment";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { Link, useParams, useNavigate } from "react-router-dom";
import Footer from "../common/Footer";
import LoadingBar from "react-top-loading-bar";

const Chats = () => {
    const params = useParams();
    const ref = useRef(null);
    const socket = io("https://dating-app-backend-xyrj.onrender.com");
    const bottomRef = useRef(null);
    const [allChat, setAllChat] = useState([]);
    const [filteredData, setfilteredData] = useState([]);
    const [expandedChat, setExpandedChat] = useState();
    const [mobileAdjust, setMobileAdjust] = useState(true);
    const [expandedChatMessages, setExpandedChatMessages] = useState([]);
    const [showExpandedChat, setShowExpandedChat] = useState(true);
    const [fDisabled, setFDisabled] = useState(true);
    const [noticeCount, setNoticeCount] = useState("");
    const [message, setMessage] = useState();
    const [profile, setProfile] = useState([]);
    const [personalProfile, setPersonalProfile] = useState([]);

    const UserProfile = async () => {
        await DataService.getSingleProfile(user_id).then((data) => {
            setPersonalProfile(data?.data?.data);
        });
    };
    let credits = personalProfile?.credits
    console.log(credits)
    useEffect(() => {
        UserProfile()
    }, [])


    const getUserProfile = async () => {
        await DataService.getSingleProfile(params.id).then((data) => {
            setProfile(data?.data?.data);
        });
    };
    // console.log(profile)

    const onChangeSearch = (e) => {
        if (e.target.value) {
            const result = allChat.filter((value) => {
                return value.name.toLowerCase().includes(e.target.value.toLowerCase());
            });
            setfilteredData(result);
        } else {
            setfilteredData(allChat);
        }
    };


    const expandChat = async (id) => {
        await DataService.getSingleProfile(params.id)
            .then(async (data) => {
                setMobileAdjust(true);
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
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    //   socket.on('chat_message', (data) => {expandChat(data.id)});

    let user_id = JSON.parse(localStorage.getItem("d_user"));

    const sendMessage = (e) => {
        e.preventDefault();
        // if (credits > 0) {

        const data = {
            senderId: user_id,
            receiverId: params.id,
            message: message,
            // createdBy: user_id,
        };
        socket.emit("chat_message", data);
        // UserProfile()
        setTimeout(() => {
            getExpandedChat();
        }, 1000);
        setMessage("");
        // } else {
        // alert('Insufficient credits')
        // socket.emit('chat_error', alert('Insufficient credits'))
        // }
    };



    socket.on("new_message", (data) => {
        setTimeout(() => {
            getExpandedChat();
        }, 1000);
        console.log("Received message:", data);
        expandChat(data.chat_id);
        console.log(data);
    });


    const setUser = () => {
        let user_id = JSON.parse(localStorage.getItem("d_user"));
        socket.emit("user_added", user_id);
    };

    useEffect(() => {
        getUserProfile();
        // getAllChats();
        setUser();
    }, []);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [expandedChatMessages]);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 950) {
                setMobileAdjust(true);
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
    const getExpandedChat = async () => {
        await DataService.getChatBox(user_id, params.id).then((data) => {
            setExpandedChatMessages(data?.data);
            ref.current.complete();
        });
    };
    const getChatList = async () => {
        await DataService.getAllChats(user_id)
            .then(async (data) => {
                setAllChat(data?.data);
                setfilteredData(data?.data);
                ref.current.complete();
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
    const sendTo = (id) => {
        navigate("/chats/" + id);
        window.location.reload();
    };

    useEffect(() => {
        ref.current.continuousStart();
        getChatList();
        getExpandedChat(); // Load expanded chat messages initially.
    }, []);

    // Consolidate these two useEffect hooks into one.
    useEffect(() => {
        getExpandedChat();
    }, [user_id, params.id]);
    // useEffect(() => {
    //     ref.current.continuousStart();
    //     getChatList();
    // }, []);
    // useEffect(() => {
    //     getExpandedChat();

    // }, [expandedChatMessages])

    return (
        <>
            <LoadingBar color="#C952A0" ref={ref} height={5} shadow={true} />
            <div className="chat_sec">
                <div className="chat_flex">
                    <div className="chat_flexL">
                        <div className="chat_topFlex">
                            <div className="chat_topL">
                                <button className="chat_back" onClick={goBack}>
                                    <i class="fas fa-long-arrow-alt-left"></i>
                                </button>
                            </div>
                            <div className="chat_topR">
                                <div className="searchBar">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search Messages here..."
                                        onChange={onChangeSearch}
                                    />
                                    <i class="fas fa-search"></i>
                                </div>
                            </div>
                        </div>

                        {filteredData && filteredData.length > 0 ? (
                            filteredData.map((item, i) => {
                                return (
                                    <>
                                        <div
                                            className="chat_outer"
                                            onClick={() => sendTo(item?._id)}
                                        >
                                            <div className="chat_outerImg">
                                                <img src="https://i.pravatar.cc/300" alt="" />
                                            </div>
                                            <div className="chat_outerName">
                                                <h5>{item?.name ? item?.name : "Random Company"}</h5>
                                                {/* <p>
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
                                                </span> */}
                                            </div>
                                        </div>
                                    </>
                                );
                            })
                        ) : (
                            <p className="text-center my-4">No Messages Found !!!</p>
                        )}
                    </div>
                    {mobileAdjust && (
                        <div className="chat_flexR">
                            {showExpandedChat ? (
                                <>
                                    <div className="chat_expHead">
                                        <div className="back_buttonT">
                                            <button
                                                className="back"
                                                onClick={(e) => setMobileAdjust(false)}
                                            >
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
                                            <button
                                                className="back"
                                                onClick={(e) => setMobileAdjust(false)}
                                            >
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
                                    expandedChatMessages
                                        ?.slice()
                                        .reverse()
                                        .map((item, i) => {
                                            return (
                                                <>
                                                    {item.senderId === user_id ? (
                                                        <>
                                                            <div className="chat_right">
                                                                <p className="text_message">
                                                                    {item.message}
                                                                    <i className="fas fa-check"></i>
                                                                </p>
                                                                <span>
                                                                    <i className="far fa-clock"></i>
                                                                    {moment(item?.createdAt).format("lll")}
                                                                </span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="chat_left">
                                                                <p className="text_message">{item.message}</p>
                                                                <span>
                                                                    <i className="far fa-clock"></i>
                                                                    {moment(item?.createdAt).format("lll")}
                                                                </span>
                                                            </div>
                                                        </>
                                                    )}
                                                </>
                                            );
                                        })
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
