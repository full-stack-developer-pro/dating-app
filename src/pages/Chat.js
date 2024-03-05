import React, { useState, useEffect, useRef } from "react";
import "../customCss/Chat.css";
import DataService from "../services/data.service";
import moment from "moment";
import { toast } from "react-toastify";
import { Link, useParams, useNavigate } from "react-router-dom";
import Footer from "../common/Footer";
import LoadingBar from "react-top-loading-bar";
import NavbarProfile from "../common/NavbarProfile";
import ProfileAvatar from "../images/profile-avatar.png";

let user_id = JSON.parse(localStorage.getItem("d_user"));
let connectionEstablished = false;
let socket;

const Chats = () => {
  const params = useParams();
  const ref = useRef(null);
  const chatBoxRef = useRef(null);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const [allChat, setAllChat] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  const [expandedChat, setExpandedChat] = useState();
  const [mobileAdjust, setMobileAdjust] = useState(true);
  const [expandedChatMessages, setExpandedChatMessages] = useState([]);
  const [showExpandedChat, setShowExpandedChat] = useState(true);
  const [fDisabled, setFDisabled] = useState(false);
  const [noticeCount, setNoticeCount] = useState("");
  const [message, setMessage] = useState();
  const [profile, setProfile] = useState([]);
  const [personalProfile, setPersonalProfile] = useState([]);
  const [payments, setPayments] = useState(false);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFooter, setShowFooter] = useState(false);


  let user_id = JSON.parse(localStorage.getItem("d_user"));


  const handleInputFocus = () => {
    if (window.innerWidth <= 767) {
      setShowFooter(false);
    }
  };

  const handleInputBlur = () => {
    if (window.innerWidth <= 767) {
      setShowFooter(true);
    }
  };

  useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [expandedChatMessages]);
  useEffect(() => {
    // chatBoxRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [expandedChatMessages]);

  useEffect(() => {
    if (!connectionEstablished) {
      socket = new WebSocket(
        `wss://api.milfhub.co.uk/wss2/?user_id=${user_id}`
      );

      socket.addEventListener("open", (event) => {
        connectionEstablished = true;
      });

      socket.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);
        console.log("Received message:", data);
        getExpandedChat();
        if (data.success === false) {
          navigate("/packages");
          socket.close();
        } else if (data.type === "new_message") {
          getExpandedChat();
          console.log(data);
        }
      });

      socket.addEventListener("close", (event) => {
        console.log("WebSocket connection closed:", event);
      });
    }
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!connectionEstablished || socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not open. Message not sent.");
      return;
    }
    let msdg = document.getElementById("main_input").value;
    const data = {
      user_id: user_id,
      to_user_id: params.id,
      msg: msdg,
    };
    socket.send(JSON.stringify(data));
    await getExpandedChat();
    document.getElementById("main_input").value = "";
  };

  const UserProfile = async () => {
    await DataService.getSingleProfile(user_id).then((data) => {
      setPersonalProfile(data?.data?.data?.user);
    });
  };

  let credits = personalProfile?.credits;

  useEffect(() => {
    UserProfile();
  }, []);

  const getUserProfile = async () => {
    await DataService.getSingleProfile(params.id).then((data) => {
      setProfile(data?.data?.data?.user);
    });
  };

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

  const getExpandedChat = async () => {
    try {
      const response = await DataService.getChatBox(user_id, params.id);
      const chatData = response?.data?.data?.chat;
      const messages = chatData?.messages || [];
      setExpandedChatMessages(messages);

      if (ref.current) {
        ref.current.complete();
      } else {
        console.warn("Ref is null or undefined");
      }
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  };
  // payment

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

  useEffect(() => {
    getUserProfile();
    getChatList();
  }, []);







  const getChatList = async () => {
    await DataService.getAllChats(user_id)
      .then(async (data) => {
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

  const getPlans = async () => {
    await DataService.getPackages().then((data) => {
      setPackages(data?.data?.data);
    });
  };
  useEffect(() => {
    getPlans();
  }, []);





  return (
    <>
      <NavbarProfile />
      <LoadingBar color="#C952A0" ref={ref} height={5} shadow={true} />
      <div className="container">
        <div className="show_edit_bgarea_message-new">
          <div className="chat_sec">
            <div className="chat_flex">
              <div className="chat_flexL  hide_meY">
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
                            <img
                              onError={(e) => (e.target.src = ProfileAvatar)}
                              src={item?.image ? item?.image : ProfileAvatar}
                              alt=""
                            />
                          </div>
                          <div className="chat_outerName">
                            <h5>
                              {item?.name ? item?.name : "Random Company"}
                            </h5>
                          </div>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <p className="text-center my-4">No Messages Found !!!</p>
                )}
              </div>

              <div className="chat_flexR">
                {showExpandedChat ? (
                  <>
                    <div className="chat_expHead">
                      <div className="back_buttonT">
                        <button className="back" onClick={goBack}>
                          <i class="fas fa-long-arrow-alt-left"></i>
                        </button>
                      </div>
                      <div className="chat_expHeadL">
                        <img
                          onError={(e) => (e.target.src = ProfileAvatar)}
                          src={
                            profile?.profile_path
                              ? profile?.profile_path
                              : ProfileAvatar
                          }
                          alt=""
                        />
                        {/* <img src="https://i.pravatar.cc/300" alt="" /> */}
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
                <div className="chat_expBody" style={{ position: "relative" }} ref={chatBoxRef}>
                  {showExpandedChat ? (
                    expandedChatMessages?.map((item, i) => {
                      return (
                        <>
                          {item.sent_by === user_id ? (
                            <>
                              <div className="chat_right">
                                <p className="text_message">
                                  {item.type === "wink"
                                    ? "😉"
                                    : item.message_text}
                                  {/* {item.message_text} */}
                                  <i className="fas fa-check"></i>
                                </p>
                                <span>
                                  <i className="far fa-clock"></i>
                                  {moment(item?.created_at).format("lll")}
                                </span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="chat_left">
                                <p className="text_message">
                                  {item.type === "wink"
                                    ? "😉"
                                    : item.message_text}
                                </p>
                                <span>
                                  <i className="far fa-clock"></i>
                                  {moment(item?.created_at).format("lll")}
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

                </div>
                <div className="chat_footer">
                  <form onSubmit={sendMessage}>
                    <div className="chat_footer_flex">
                      {/* <EmojiPicker /> */}
                      <input
                        type="text"
                        placeholder="Type Your Message ..."
                        className="form-control"
                        autoFocus={true}
                        ref={inputRef}
                        // disabled={fDisabled}
                        // value={message}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        id="main_input"
                      // onChange={(e) => setMessage(e.target.value)}
                      />
                      <div>
                        {/* <Picker onEmojiClick={onEmojiClick} />
                        {chosenEmoji && (
                          <div>
                            <h2>You selected: {chosenEmoji.emoji}</h2>
                          </div>
                        )} */}
                      </div>
                      <button
                        className="main_button"
                        // disabled={fDisabled}
                        onClick={sendMessage}
                      >
                        <i class="fas fa-paper-plane"></i>
                      </button>
                    </div>
                  </form>
                  {/* <div ref={chatBoxRef} style={{height: '3px',width: '50%',backgroundColor:'red'}}></div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        showFooter && (
          <Footer />

        )
      }
    </>
  );
};
export default Chats;
