import React, {useEffect,useState} from 'react'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'
import Thumb from '../images/profile_banner.jpg'
import '../customCss/Blogs.css'
import { Link } from 'react-router-dom'
import DataService from '../services/data.service'
import moment from 'moment'

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    const getAllBlogs = async () => {
      await DataService.getAllBlogs().then((data) => {
        setBlogs(data?.data?.data);
      });
    };
    useEffect(() => {
        document.title = "Blogs";
        window.scrollTo(0,0)
        getAllBlogs();
      }, []);
  return (
   <>
   <Navbar/>
     <section className="profile_bannerSec">
        <div className="container">
          <h1>Blogs</h1>
          <span>Home / Blogs</span>
        </div>
      </section>
      <div className='main_blogSec'>
        <div className='container'>
            <div className='main_blogFlex'>
            {blogs && blogs.length > 0 ? (
                  blogs.map((item, index) => {
                    return (
                      <>
                        <div className="blogInner">
                          <div className="blogThumb">
                            {item?.images.length>0 ? (
                              <img
                                src={
                                  "http://51.20.124.172:3000/" +
                                  item?.images[0]?.path
                                }
                                alt=""
                              />
                            ) : (
                              <img src={Thumb} alt="" />
                            )}
                          </div>
                          <div className="blogBody">
                            <span>
                              <i class="far fa-calendar-alt"></i> {moment(item?.created_at).format('LL')} /{" "}
                              <i class="fas fa-user"></i> Admin
                            </span>
                            <h3>{item?.heading}</h3>
                            <p dangerouslySetInnerHTML={{__html: item?.description}}></p>
                            <Link to={"/single-blog/"+item?._id}><button className='main_button'>Read More</button></Link>
                          </div>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <p>No Blogs Found</p>
                )}
            

            </div>
        </div>
      </div>
      <Footer/>
   </>
  )
}

export default Blogs