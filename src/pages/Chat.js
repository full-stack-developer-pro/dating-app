import React, { useState, useEffect, useRef } from "react";
import "../customCss/Chat.css";
import DataService from "../services/data.service";
import moment from "moment";
import { toast } from "react-toastify";
import { Link, useParams, useNavigate } from "react-router-dom";
import Footer from "../common/Footer";
import LoadingBar from "react-top-loading-bar";
// import { useHistory } from 'react-router-dom';
// import EmojiPicker from 'emoji-picker-react';

const Chats = () => {

  const params = useParams();
  const ref = useRef(null);
  
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
  const [payments, setPayments] = useState(false);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // const history = useHistory();
  let user_id = JSON.parse(localStorage.getItem("d_user"));
  
  const socket = new WebSocket(`ws://api.digitalmarketingcoursesinchandigarh.in:9091/?user_id=${user_id}`);

  const UserProfile = async () => {
    await DataService.getSingleProfile(user_id).then((data) => {
      console.log(data.data.data.user)
      setPersonalProfile(data?.data?.data);
    });
  };
  let credits = personalProfile?.credits;
  //   console.log(credits);
  useEffect(() => {
    UserProfile();
  }, []);

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


  // payment

  const handlePayment = (price) => {
    setMessage("");
    const data = {};
    data.userId = user_id
    data.amount = price
    DataService.GeneratePayment(data).then(
      (response) => {
        if (response.data.success) {
          toast("Link generated successfully!");
          const paymentUrl = response.data.data.url;
          window.location.href = paymentUrl;
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

  const getExpandedChat = async () => {
    await DataService.getChatBox(user_id, params.id).then((data) => {
      const chatData = data?.data?.data?.chat;
      const messages = chatData?.messages || [];
      setExpandedChatMessages(messages);
      ref.current.complete();
    });
  };
  // payment

  socket.addEventListener("open", (event) => {
    // console.log("WebSocket connection opened:", event);
  
    // Once the connection is open, you can send a message
    setUser();
  });
  socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    console.log("Received message:", data);
  
    if (data.type === "chat_error") {
      toast.error(data.message);
      setTimeout(() => {
        setPayments(true);
      }, 2000);
    } else if (data.type === "new_message") {
      setTimeout(() => {
        getExpandedChat();
      }, 1000);
      console.log(data);
    }
  });
  
  // Function to send a message
  // const sendMessage = (e) => {
  //   e.preventDefault();
  //   const data = {
  //     senderId: user_id,
  //     receiverId: params.id,
  //     message: message,
  //   };
  
  //   // Send the message as a JSON string
  //   socket.send(JSON.stringify({ type: "chat_message", data }));
  
  //   setTimeout(() => {
  //     getExpandedChat();
  //   }, 1000);
  
  //   setMessage("");
  // };

 
  
  const sendMessage = (e) => {
    e.preventDefault();
    const data = {
      user_id: user_id,
      to_user_id: params.id,
      msg: message,
    };
    

    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(data));
      setTimeout(() => {
        getExpandedChat();
      }, 1000);
      setMessage("");
    } else {
      console.error("WebSocket is not open. Message not sent.");
    }
  };

  const setUser = () => {
    let user_id = JSON.parse(localStorage.getItem("d_user"));
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(user_id));
    } else {
      setTimeout(() => setUser(), 100);
    }
  };
  // Function to set the user
  // const setUser = () => {
  //   let user_id = JSON.parse(localStorage.getItem("d_user"));
  //   socket.send(JSON.stringify({ type: "user_added", user_id }));
  // };

  // const sendMessage = (e) => {
  //   e.preventDefault();
  //   const data = {
  //     senderId: user_id,
  //     receiverId: params.id,
  //     message: message,
  //     // flirtMessage: flirtMessage
  //   };
  //   socket.emit("chat_message", data);
  //   // socket.on('chat_error', { message: 'Insufficient credits' });
  //   setTimeout(() => {
  //     getExpandedChat();
  //   }, 1000);
  //   setMessage("");
  // };
  // socket.on("chat_error", (message) => {
  //   toast.error(message.message);
  //   setTimeout(() => {
  //     setPayments(true);
  //   }, 2000);
  // });

  // socket.on("new_message", (data) => {
  //   setTimeout(() => {
  //     getExpandedChat();
  //   }, 1000);
  //   console.log("Received message:", data);
  //   expandChat(data.chat_id);
  //   console.log(data);
  // });

  // const setUser = () => {
  //   let user_id = JSON.parse(localStorage.getItem("d_user"));
  //   socket.emit("user_added", user_id);
  // };

  useEffect(() => {
    getUserProfile();
    getChatList();
    setUser();
  }, []);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
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

  const getChatList = async () => {
    await DataService.getAllChats(user_id)
      .then(async (data) => {
        console.log(data.data.data.chats)
        setAllChat(data?.data?.data?.chats);
        setfilteredData(data?.data?.data?.chats);
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
  }, []);

  useEffect(() => {
    getExpandedChat();
  }, []);

  // const getPlans = async () => {
  //   await DataService.getPackages().then((data) => {
  //     setPackages(data?.data?.data);

  //   });
  // };
  // console.log(packages)
  // useEffect(() => {
  //   getPlans()
  // }, [])


  return (
    <>
      <LoadingBar color="#C952A0" ref={ref} height={5} shadow={true} />
      {payments && (
        <div className="payments_popup">
          <div className="payments_inner">
            <div className="container">
              <div className="payments_flexOne">
                <div className="payment_bg">
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
                  expandedChatMessages ?.slice().reverse().map((item, i) => {
                      return (
                        <>
                          {item.sent_by === user_id ? (
                            <>
                              <div className="chat_right">
                                <p className="text_message">
                                  {item.message_text}
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
                                <p className="text_message">{item.message_text}</p>
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
                  {/* <EmojiPicker /> */}
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
