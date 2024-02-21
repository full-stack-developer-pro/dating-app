import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import "../customCss/Blogs.css";
import DataService from "../services/data.service";
import { useParams } from "react-router-dom";
import moment from "moment";

const SingleBlog = () => {
  const params = useParams();
  const [blog, setBlog] = useState([]);
  const [html, setHTML] = useState({ __html: "" });

  const getOneBlog = async () => {
    await DataService.getOneBlog(params.id).then((data) => {
      setBlog(data?.data?.data);
      setHTML({ __html: data?.data?.data?.description });
    });
  };
  useEffect(() => {
    document.title = "Single Blog";
    window.scrollTo(0, 0);
    getOneBlog();
  }, []);
  return (
    <>
      <Navbar />
      <section className="profile_bannerSec">
        <div className="container">
          <h2>{blog?.heading}</h2>
        </div>
      </section>
      <div className="single_blogSec">
        <div className="container">
        {blog?.images ? <img src={"https://api.milfhub.co.uk/"+blog?.images[0].path} style={{width: '100%',height:'300px',objectFit: 'cover',margin: '20px auto'}} alt="blog_image"/> : ""}
          <div className="single_blogInner">
            <div className="single_blogMeta">
              <span>
                <i class="far fa-calendar-alt"></i> {moment(blog?.created_at).format('LL')} /{" "}
                <i class="fas fa-user"></i> Admin
              </span>
            </div>
            <p dangerouslySetInnerHTML={html}></p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleBlog;
