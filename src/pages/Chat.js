import React, { useState, useEffect, useRef } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import "../customCss/Chat.css";
import moment from "moment";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Chats = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  const bottomRef = useRef(null);
  const [mobileAdjust, setMobileAdjust] = useState(true);
  const [showExpandedChat, setShowExpandedChat] = useState(true);
  return (
    <>
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
                  />
                  <i class="fas fa-search"></i>
                </div>
              </div>
            </div>

            <div className="chat_outer">
              <div className="chat_outerImg">
                <img src="https://i.pravatar.cc/300" alt="" />
              </div>
              <div className="chat_outerName">
                <h5>Random Person</h5>
                <p>
                  <strong>i am last message</strong>
                </p>
                <span>
                  <i class="far fa-clock"></i>9 min ago
                </span>
              </div>
            </div>
            <div className="chat_outer">
              <div className="chat_outerImg">
                <img src="https://i.pravatar.cc/300" alt="" />
              </div>
              <div className="chat_outerName">
                <h5>Random Person</h5>
                <p>
                  <strong>i am last message</strong>
                </p>
                <span>
                  <i class="far fa-clock"></i>9 min ago
                </span>
              </div>
            </div>
            <div className="chat_outer">
              <div className="chat_outerImg">
                <img src="https://i.pravatar.cc/300" alt="" />
              </div>
              <div className="chat_outerName">
                <h5>Random Person</h5>
                <p>
                  <strong>i am last message</strong>
                </p>
                <span>
                  <i class="far fa-clock"></i>9 min ago
                </span>
              </div>
            </div>

            {/* <p className="text-center my-4">No Messages Found !!!</p> */}
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
                        Dev Tester
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
                        Dev Tester <i class="fas fa-circle"></i>
                      </h5>
                    </div>
                  </div>
                </>
              )}

              <div className="chat_expBody">
                {showExpandedChat ? (
                  <>
                    <div className="chat_right">
                      <p className="text_message">
                        Test Message
                        <i class="fas fa-check"></i>
                      </p>
                      <span>
                        <i class="far fa-clock"></i>9 min ago
                      </span>
                    </div>

                    <div className="chat_left">
                      <p className="text_message">Test Message</p>
                      <span>
                        <i class="far fa-clock"></i>9 min ago
                      </span>
                    </div>
                    <div className="chat_right">
                      <p className="text_message">
                        Test Message
                        <i class="fas fa-check"></i>
                      </p>
                      <span>
                        <i class="far fa-clock"></i>9 min ago
                      </span>
                    </div>

                    <div className="chat_left">
                      <p className="text_message">Test Message</p>
                      <span>
                        <i class="far fa-clock"></i>9 min ago
                      </span>
                    </div>
                    <div className="chat_right">
                      <p className="text_message">
                        Test Message
                        <i class="fas fa-check"></i>
                      </p>
                      <span>
                        <i class="far fa-clock"></i>9 min ago
                      </span>
                    </div>

                    <div className="chat_left">
                      <p className="text_message">Test Message</p>
                      <span>
                        <i class="far fa-clock"></i>9 min ago
                      </span>
                    </div>
                    <div className="chat_right">
                      <p className="text_message">
                        Test Message
                        <i class="fas fa-check"></i>
                      </p>
                      <span>
                        <i class="far fa-clock"></i>9 min ago
                      </span>
                    </div>

                    <div className="chat_left">
                      <p className="text_message">Test Message</p>
                      <span>
                        <i class="far fa-clock"></i>9 min ago
                      </span>
                    </div>
                    <div className="chat_right">
                      <p className="text_message">
                        Test Message
                        <i class="fas fa-check"></i>
                      </p>
                      <span>
                        <i class="far fa-clock"></i>9 min ago
                      </span>
                    </div>

                    <div className="chat_left">
                      <p className="text_message">Test Message</p>
                      <span>
                        <i class="far fa-clock"></i>9 min ago
                      </span>
                    </div>
                    <div className="chat_right">
                      <p className="text_message">
                        Test Message
                        <i class="fas fa-check"></i>
                      </p>
                      <span>
                        <i class="far fa-clock"></i>9 min ago
                      </span>
                    </div>

                    <div className="chat_left">
                      <p className="text_message">Test Message</p>
                      <span>
                        <i class="far fa-clock"></i>9 min ago
                      </span>
                    </div>
                    <div className="chat_right">
                      <p className="text_message">
                        Test Message
                        <i class="fas fa-check"></i>
                      </p>
                      <span>
                        <i class="far fa-clock"></i>9 min ago
                      </span>
                    </div>

                    <div className="chat_left">
                      <p className="text_message">Test Message</p>
                      <span>
                        <i class="far fa-clock"></i>9 min ago
                      </span>
                    </div>
                    <div className="chat_right">
                      <p className="text_message">
                        Test Message
                        <i class="fas fa-check"></i>
                      </p>
                      <span>
                        <i class="far fa-clock"></i>9 min ago
                      </span>
                    </div>

                    <div className="chat_left">
                      <p className="text_message">Test Message</p>
                      <span>
                        <i class="far fa-clock"></i>9 min ago
                      </span>
                    </div>
                    <div className="chat_right">
                      <p className="text_message">
                        Test Message
                        <i class="fas fa-check"></i>
                      </p>
                      <span>
                        <i class="far fa-clock"></i>9 min ago
                      </span>
                    </div>

                    <div className="chat_left">
                      <p className="text_message">Test Message</p>
                      <span>
                        <i class="far fa-clock"></i>9 min ago
                      </span>
                    </div>
                    <div className="chat_right">
                      <p className="text_message">
                        Test Message
                        <i class="fas fa-check"></i>
                      </p>
                      <span>
                        <i class="far fa-clock"></i>9 min ago
                      </span>
                    </div>

                    <div className="chat_left">
                      <p className="text_message">Test Message</p>
                      <span>
                        <i class="far fa-clock"></i>9 min ago
                      </span>
                    </div>
                    <div className="chat_right">
                      <p className="text_message">
                        Test Message
                        <i class="fas fa-check"></i>
                      </p>
                      <span>
                        <i class="far fa-clock"></i>9 min ago
                      </span>
                    </div>

                    <div className="chat_left">
                      <p className="text_message">Test Message</p>
                      <span>
                        <i class="far fa-clock"></i>9 min ago
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <p>Select a Chat to proceed</p>
                  </>
                )}
                <div ref={bottomRef} />
              </div>
              <div className="chat_footer">
                <form>
                  <div className="chat_footer_flex">
                    <input
                      type="text"
                      placeholder="Type Your Message ..."
                      className="form-control"
                    />
                    <button className="main_button">
                      <i class="fas fa-paper-plane"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};
export default Chats;
