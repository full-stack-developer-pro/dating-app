import React, { useEffect, useState, useRef } from "react";
import ProfileOne from "../images/profile1.jpg";
import DataService from "../services/data.service";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import NavbarProfile from '../common/NavbarProfile';
import Footer from '../common/Footer';
import AuthService from "../services/auth.service";
import ProfileAvatar from "../images/profile-avatar.png"

const MyFriends = () => {
  const navigate = useNavigate()
  const [addFriend, setAddFriend] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState([]);
  const auth = AuthService.getCurrentUser();

  const userId = JSON.parse(localStorage.getItem("d_user"));


  const getUserProfile = async () => {
    await DataService.getSingleProfile(userId).then((data) => {
      setProfile(data?.data?.data?.user);
    });
  };

  const getAllFriend = async () => {
    await DataService.getAllFriend(userId).then((data) => {
      setAddFriend(data?.data?.data);
    });
  };

  useEffect(() => {
    getAllFriend()
  }, [])


  const addNewFriend = async (id) => {
    const data = {};
    data.friendId = id;
    setLoading(true);
    await DataService.addMyFriend(userId, data).then(
      () => {
        setLoading(false);
        toast.success("Friend Added Successfully!!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        getUserProfile();
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        setLoading(false);
        toast.error(resMessage, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    );
  };
  const removeFriend = async (id) => {
    const data = {};
    data.friendId = id;
    setLoading(true);
    await DataService.removeMyFriend(userId, data).then(
      () => {
        setLoading(false);
        toast.success("Friend Removed Successfully!!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        window.location.reload()
        getUserProfile();
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        setLoading(false);
        toast.error(resMessage, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    );
  };

  const handleNotificationTwo = (id) => {
    DataService.TrackProfile(id).then(
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
      }
    );
  };
  const goBack = () => {
    navigate(-1);
  };
  // search area 

  const logout = (e) => {
    localStorage.removeItem("d_user");
    localStorage.removeItem("d_userToken");
    localStorage.removeItem("city_id");

    navigate("/");
    window.location.reload();
  }
  const handleImagenew = (e) => {
    e.target.src = ProfileAvatar
  }
  return (
    <>
      <NavbarProfile />
      <div className="container">
        <div className="show_edit_bgareatwo">
          {addFriend?.friends?.length > 0 ? <h2 className="text-center mt-5 mb-4">My Friends</h2> : ""}
          <div className="allFriend-column">
            {addFriend && addFriend?.friends?.length > 0 ? (
              addFriend?.friends?.map((item, i) => {
                return (
                  <>
                    <div className="active_mainProfile">
                      <div className="active_mainFlex">
                        <div className="active_mainL">
                          <Link to={"/single-profile/" + item.id}>
                            <img src={item?.avatar ? item?.avatar : ProfileOne} alt="" onError={handleImagenew} />
                          </Link>
                        </div>
                        <div className="active_mainR">
                          <h4>{item?.name}</h4>
                          <span className="active_age">
                            {item?.age}~
                            {item?.gender === "male"
                              ? "M"
                              : item?.gender === "female"
                                ? "F"
                                : "Other"}
                          </span>
                          <span>
                            <i class="fas fa-map-marker-alt"></i>
                            {item?.country}
                          </span>
                          {auth && (
                            <button
                              className="add_friend already_friend"
                              onClick={() => removeFriend(item?.id)}
                            >
                              Remove Friend
                              <i className="fas fa-user-minus"></i>
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="active_actionSec">
                        <button className="allFriend-btn1">
                          <Link to={"/single-profile/" + item.id}>
                            View<i class="fas fa-eye"></i>
                          </Link>
                        </button>

                        <button className="allFriend-btn4">
                          <Link to={"/chats/" + item.id}>
                            Send Message<i class="fas fa-comment-alt"></i>
                          </Link>
                        </button>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <div className="not_friends">
                <h2>Add some friends</h2>
                <Link to="/profile"><button className="main_button">Click to add friends</button></Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default MyFriends