import React, { useEffect, useState, useRef } from "react";
import DataService from "../services/data.service";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from 'react-router-dom';
import NavbarProfile from "../common/NavbarProfile";
import Footer from "../common/Footer";

const MAX_COUNT = 5;

const UploadGallery = () => {
  const ref = useRef(null);
  // const params = useParams();

  // search filters 
  const navigate = useNavigate()
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const imgRef = useRef();



  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("male");
  const [birthdate, setBirthdate] = useState("");
  const [age, setAge] = useState("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [eye_color, setEyeColor] = useState("");
  const [hair_color, setHairColor] = useState("");
  const [hair_length, setHairLength] = useState("");
  const [is_fake, setIsfake] = useState("");
  const [isflagged, setIsflagged] = useState("");
  const [isverified, setIsverified] = useState("");
  const [free_message, setFree_message] = useState("");


  const [marital_status, setMaritalStatus] = useState("");
  const [interests, setInterests] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [profile, getProfile] = useState([]);
  const [cities, setCities] = useState([]);
  const [credits, setCredits] = useState("");
  const [searchKeyword, setSearchKeyword] = useState('');
  const [profileImage, setProfileImage] = useState('');


  const [showEditProfile, setShowEditProfile] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [recentPayments, setRecentPayments] = useState('');

  const [fileLimit, setFileLimit] = useState(false);

  const userId = JSON.parse(localStorage.getItem("d_user"));

  const getUserProfile = async () => {
    await DataService.getSingleProfile(userId).then((data) => {
      getProfile(data?.data?.data?.user);
      setGender(data?.data?.data?.user?.gender)
      setSearchKeyword(data?.data?.data?.user?.country)
      setCredits(data?.data?.data?.user?.credits)
      setUsername(data?.data?.data?.user?.username)
      setDescription(data?.data?.data?.user?.description)
      let sDate = data?.data?.data?.user?.birthdate.split("T");
      setBirthdate(sDate[0])
      setName(data?.data?.data?.user?.name)
      setHeight(data?.data?.data?.user?.height)
      setWeight(data?.data?.data?.user?.weight)
      setEyeColor(data?.data?.data?.user?.eye_color)
      setHairColor(data?.data?.data?.user?.hair_color)
      setHairLength(data?.data?.data?.user?.hair_length)
      setMaritalStatus(data?.data?.data?.user?.marital_status)
      setHobbies(data?.data?.data?.user?.interests || []);
      setIsfake(data?.data?.data?.user?.is_fake)
      setIsflagged(data?.data?.data?.user?.is_flagged)
      setIsverified(data?.data?.data?.user?.is_verified)
      setAge(data?.data?.data?.user?.age)
      setFree_message(data?.data?.data?.user?.free_message)
      setStatus(data?.data?.data?.user?.status)
      setEmail(data?.data?.data?.user?.email)
      setProfileImage(data?.data?.data?.user?.profile_path)
      setAllImages(data?.data?.data?.user?.images.filter((item) => item.is_verified === 1));
      if (ref.current) {
        ref.current.complete();
      }
    });
  };

  useEffect(() => {
    getUserProfile();
  }, []);


  const onFileChangeCaptureMultiple = (e) => {
    const choosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadedFiles(choosenFiles)
  }

  const handleUploadedFiles = async (files) => {
    const uploaded = uploadedFiles ? [...uploadedFiles] : [];
    let limitExceeded = false;
    let imageSrc = [...images];

    await Promise.all(
      files.map(async (file) => {
        if (uploaded.findIndex((f) => f.name === file.name) === -1) {
          uploaded.push(file);

          const reader = new FileReader();
          reader.readAsDataURL(file);

          await new Promise((resolve) => {
            reader.onloadend = function (theFile) {
              var image = new Image();
              image.src = theFile.target.result;
              image.onload = () => {
                imageSrc.push(image.src);
                resolve();
              };
            };
          });

          if (uploaded.length === MAX_COUNT) setFileLimit(true);
          if (uploaded.length > MAX_COUNT) {
            toast.error(`You can only upload a maximum of ${MAX_COUNT} files`, {
              position: toast.POSITION.TOP_RIGHT,
            });
            setFileLimit(true);
            limitExceeded = true;
          }
        }
      })
    );

    if (!limitExceeded) {
      setUploadedFiles(uploaded);
      setImages(imageSrc);
    }
  };


  const deleteImage = (e, index, api = true) => {
    if (uploadedFiles && uploadedFiles.length > 0) {
      const updatedUploadedFiles = uploadedFiles.filter((file, i) => i !== index);
      const updatedImageSrc = [];
      updatedUploadedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = function (theFile) {
          var image = new Image();
          image.src = theFile.target.result;
          updatedImageSrc.push(image.src);
        };
      });
      setUploadedFiles(updatedUploadedFiles);
      setImages(updatedImageSrc);
    }
  };



  const UploadProfile = (e) => {
    e.preventDefault();
    setMessage("");
    const data = new FormData();
    uploadedFiles.some((file) => {
      data.append('image[]', file)
    })
    // data.append("images", file[0]);
    DataService.UploadProfileImage(data).then(
      (response) => {
        if (response.data.is_verified == "true") {
          toast.success("Upload Successfully!")
        } else {
          toast("Status pending")
        }
        setStatus(response.data.is_verified)
        // setTimeout(() => {
        //   window.location.reload();
        // },2000)
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        toast.error(resMessage, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    );
  };



  const handleAvatar = (image) => {
    setLoading(true);
    const data = {};
    data.photo = image.url;
    DataService.setProfile(image.id, data).then(
      () => {
        toast.success('Profile updated successfully!', {
          position: toast.POSITION.TOP_RIGHT
        });
        setLoading(false);
        setTimeout(function () {
          window.location.reload();
        }, 1500)
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        toast.error(resMessage, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    );

  };

  return (
    <>
      {/* <NavbarProfile /> */}
      <div className="container">
        <div className="upload_gallery">
          <div className="card mt-4 mb-4">
            <div className="upload_areabg">
              <div className="card-body mt-2 p-4">
                <label className="form-label"><h4 className="f-700">Media</h4></label>
                <div className="new_mainupload">
                  <div className="upload-box">
                    <i><svg width="47" height="39" viewBox="0 0 47 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M32 27.5L24 19.5L16 27.5" stroke="#F209E1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M24 19.5V37.5" stroke="#F209E1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M40.7799 32.28C42.7306 31.2165 44.2716 29.5337 45.1597 27.4972C46.0477 25.4607 46.2323 23.1864 45.6843 21.0334C45.1363 18.8803 43.8869 16.971 42.1333 15.6069C40.3796 14.2427 38.2216 13.5014 35.9999 13.5H33.4799C32.8745 11.1585 31.7462 8.98464 30.1798 7.14195C28.6134 5.29927 26.6496 3.83567 24.4361 2.86118C22.2226 1.8867 19.817 1.42669 17.4002 1.51573C14.9833 1.60478 12.6181 2.24057 10.4823 3.3753C8.34649 4.51003 6.49574 6.11417 5.06916 8.06713C3.64259 10.0201 2.6773 12.271 2.24588 14.6508C1.81446 17.0305 1.92813 19.477 2.57835 21.8065C3.22856 24.136 4.3984 26.2877 5.99992 28.1" stroke="#F209E1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M32 27.5L24 19.5L16 27.5" stroke="#F209E1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    </i>
                    <div class="upload-btn-wrapper ms-3">
                      <button class="btn-file">Select a file or drag and drop here</button>
                      <input
                        type="file"
                        accept="image/*"
                        name="myfile"
                        style={{ width: "100%" }}
                        multiple
                        onChangeCapture={onFileChangeCaptureMultiple} />
                    </div>
                  </div>
                </div>
                <ul className="thumbs-img mt-3 mb-2">
                  {images && images.length > 0
                    ? images.map((item, i) => (
                      <li id={`local-image-${i}`} style={{ position: 'relative' }}>
                        <i><img width="27" src={item} alt='product' /></i>
                        <div class="Delete-image" onClick={(e) => { if (window.confirm('Are you sure you want to delete this image?')) deleteImage(e, i, false) }}><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.410582 0.410749C0.736019 0.0853125 1.26366 0.0853125 1.58909 0.410749L5.99984 4.82149L10.4106 0.410749C10.736 0.0853125 11.2637 0.0853125 11.5891 0.410749C11.9145 0.736186 11.9145 1.26382 11.5891 1.58926L7.17835 6.00001L11.5891 10.4108C11.9145 10.7362 11.9145 11.2638 11.5891 11.5893C11.2637 11.9147 10.736 11.9147 10.4106 11.5893L5.99984 7.17852L1.58909 11.5893C1.26366 11.9147 0.736019 11.9147 0.410582 11.5893C0.0851447 11.2638 0.0851447 10.7362 0.410582 10.4108L4.82133 6.00001L0.410582 1.58926C0.0851447 1.26382 0.0851447 0.736186 0.410582 0.410749Z" fill="black"></path></svg></div>
                      </li>
                    )) : <><li><i><svg width="27" viewBox="0 0 23 22" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.4759 4.75448C4.98561 4.75448 3.65994 5.72109 3.17856 7.16013L3.14604 7.26855C3.03249 7.64961 2.98492 7.97009 2.98492 8.29075V14.7203L0.72654 7.08378C0.436099 5.96056 1.098 4.79606 2.20852 4.48577L16.6034 0.580665C16.7831 0.533541 16.9628 0.510909 17.1397 0.510909C18.0668 0.510909 18.914 1.13423 19.1514 2.05284L19.9901 4.75448H6.4759Z" fill="#ef48b5" />
                      <path d="M9.03623 14.6561C10.0631 14.6561 10.898 15.5019 10.898 16.5421C10.898 17.5823 10.0631 18.4282 9.03623 18.4282C8.00939 18.4282 7.17432 17.5823 7.17432 16.5421C7.17432 15.5019 8.00939 14.6561 9.03623 14.6561Z" fill="#ef48b5" />
                      <path d="M20.6725 21.2572H6.70859C5.42589 21.2572 4.38135 20.1991 4.38135 18.8996V8.52655C4.38135 7.22701 5.42589 6.1689 6.70859 6.1689H20.6725C21.9553 6.1689 22.9999 7.22701 22.9999 8.52655V18.8996C22.9999 20.1991 21.9553 21.2572 20.6725 21.2572ZM6.70859 19.3711H20.6725C20.9295 19.3711 21.138 19.16 21.138 18.8996V12.2051L18.1973 15.6812C17.8853 16.0517 17.4337 16.2498 16.9488 16.261C16.4666 16.2582 16.0142 16.0414 15.7051 15.666L12.2476 11.4621L11.1212 12.6004C10.4845 13.2453 9.44835 13.2453 8.81255 12.6004L6.24322 9.99854V18.8996C6.24322 19.16 6.45173 19.3711 6.70859 19.3711Z" fill="#ef48b5" />
                    </svg>
                    </i></li><li><i><svg width="27" viewBox="0 0 23 22" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.4759 4.75448C4.98561 4.75448 3.65994 5.72109 3.17856 7.16013L3.14604 7.26855C3.03249 7.64961 2.98492 7.97009 2.98492 8.29075V14.7203L0.72654 7.08378C0.436099 5.96056 1.098 4.79606 2.20852 4.48577L16.6034 0.580665C16.7831 0.533541 16.9628 0.510909 17.1397 0.510909C18.0668 0.510909 18.914 1.13423 19.1514 2.05284L19.9901 4.75448H6.4759Z" fill="#ef48b5" />
                      <path d="M9.03623 14.6561C10.0631 14.6561 10.898 15.5019 10.898 16.5421C10.898 17.5823 10.0631 18.4282 9.03623 18.4282C8.00939 18.4282 7.17432 17.5823 7.17432 16.5421C7.17432 15.5019 8.00939 14.6561 9.03623 14.6561Z" fill="#ef48b5" />
                      <path d="M20.6725 21.2572H6.70859C5.42589 21.2572 4.38135 20.1991 4.38135 18.8996V8.52655C4.38135 7.22701 5.42589 6.1689 6.70859 6.1689H20.6725C21.9553 6.1689 22.9999 7.22701 22.9999 8.52655V18.8996C22.9999 20.1991 21.9553 21.2572 20.6725 21.2572ZM6.70859 19.3711H20.6725C20.9295 19.3711 21.138 19.16 21.138 18.8996V12.2051L18.1973 15.6812C17.8853 16.0517 17.4337 16.2498 16.9488 16.261C16.4666 16.2582 16.0142 16.0414 15.7051 15.666L12.2476 11.4621L11.1212 12.6004C10.4845 13.2453 9.44835 13.2453 8.81255 12.6004L6.24322 9.99854V18.8996C6.24322 19.16 6.45173 19.3711 6.70859 19.3711Z" fill="#ef48b5" />
                    </svg>
                    </i></li><li><i><svg width="27" viewBox="0 0 23 22" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.4759 4.75448C4.98561 4.75448 3.65994 5.72109 3.17856 7.16013L3.14604 7.26855C3.03249 7.64961 2.98492 7.97009 2.98492 8.29075V14.7203L0.72654 7.08378C0.436099 5.96056 1.098 4.79606 2.20852 4.48577L16.6034 0.580665C16.7831 0.533541 16.9628 0.510909 17.1397 0.510909C18.0668 0.510909 18.914 1.13423 19.1514 2.05284L19.9901 4.75448H6.4759Z" fill="#ef48b5" />
                      <path d="M9.03623 14.6561C10.0631 14.6561 10.898 15.5019 10.898 16.5421C10.898 17.5823 10.0631 18.4282 9.03623 18.4282C8.00939 18.4282 7.17432 17.5823 7.17432 16.5421C7.17432 15.5019 8.00939 14.6561 9.03623 14.6561Z" fill="#ef48b5" />
                      <path d="M20.6725 21.2572H6.70859C5.42589 21.2572 4.38135 20.1991 4.38135 18.8996V8.52655C4.38135 7.22701 5.42589 6.1689 6.70859 6.1689H20.6725C21.9553 6.1689 22.9999 7.22701 22.9999 8.52655V18.8996C22.9999 20.1991 21.9553 21.2572 20.6725 21.2572ZM6.70859 19.3711H20.6725C20.9295 19.3711 21.138 19.16 21.138 18.8996V12.2051L18.1973 15.6812C17.8853 16.0517 17.4337 16.2498 16.9488 16.261C16.4666 16.2582 16.0142 16.0414 15.7051 15.666L12.2476 11.4621L11.1212 12.6004C10.4845 13.2453 9.44835 13.2453 8.81255 12.6004L6.24322 9.99854V18.8996C6.24322 19.16 6.45173 19.3711 6.70859 19.3711Z" fill="#ef48b5" />
                    </svg>
                    </i></li></>
                  }
                </ul>

              </div>
              <div className="upload_images">
                <button className="main_button" onClick={UploadProfile}>Upload images</button>
              </div>
            </div>

            <div className="recent_uploads">
              <h1 style={{ fontSize: "16px", margin: "20px 10px" }}>Recent Uploads</h1>
              <div className="image_uploaded">
                {
                  allImages && allImages?.length > 0 ? allImages?.map((image) => {
                    return (
                      <>
                        <div className="inner_images">
                          <img src={`https://api.milfhub.co.uk/${image.path}`} alt="Image" />
                          <div className="edit_image">
                            <button onClick={() => handleAvatar(image)}><i class="fas fa-pencil-alt"></i> </button>
                          </div>
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
      {/* <Footer /> */}
    </>
  )
}

export default UploadGallery