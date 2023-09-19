import React, {useEffect} from 'react'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'
import Thumb from '../images/profile_banner.jpg'
import '../customCss/Blogs.css'
import { Link } from 'react-router-dom'

const Blogs = () => {
    useEffect(() => {
        document.title = "Blogs";
        window.scrollTo(0,0)
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
                <div className='blogInner'>
                    <div className='blogThumb'>
                       <img src={Thumb} alt=''/>
                    </div>
                    <div className='blogBody'>
                     <span><i class="far fa-calendar-alt"></i> 19 Sep 2023 / <i class="fas fa-user"></i> Admin</span>
                     <h3>Lorem ipsum dolor sit amet consectetur</h3>
                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra metus ut arcu posuere, sed posuere libero vulputate. Morbi dapibus accumsan rhoncus. </p>
                     <Link to="/single-blog"><button className='main_button'>Read More</button></Link>
                    </div>
                </div>
                <div className='blogInner'>
                    <div className='blogThumb'>
                       <img src={Thumb} alt=''/>
                    </div>
                    <div className='blogBody'>
                     <span><i class="far fa-calendar-alt"></i> 19 Sep 2023 / <i class="fas fa-user"></i> Admin</span>
                     <h3>Lorem ipsum dolor sit amet consectetur</h3>
                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra metus ut arcu posuere, sed posuere libero vulputate. Morbi dapibus accumsan rhoncus. </p>
                     <Link to="/single-blog"><button className='main_button'>Read More</button></Link>
                    </div>
                </div>
                <div className='blogInner'>
                    <div className='blogThumb'>
                       <img src={Thumb} alt=''/>
                    </div>
                    <div className='blogBody'>
                     <span><i class="far fa-calendar-alt"></i> 19 Sep 2023 / <i class="fas fa-user"></i> Admin</span>
                     <h3>Lorem ipsum dolor sit amet consectetur</h3>
                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra metus ut arcu posuere, sed posuere libero vulputate. Morbi dapibus accumsan rhoncus. </p>
                     <Link to="/single-blog"><button className='main_button'>Read More</button></Link>
                    </div>
                </div>
                <div className='blogInner'>
                    <div className='blogThumb'>
                       <img src={Thumb} alt=''/>
                    </div>
                    <div className='blogBody'>
                     <span><i class="far fa-calendar-alt"></i> 19 Sep 2023 / <i class="fas fa-user"></i> Admin</span>
                     <h3>Lorem ipsum dolor sit amet consectetur</h3>
                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra metus ut arcu posuere, sed posuere libero vulputate. Morbi dapibus accumsan rhoncus. </p>
                     <Link to="/single-blog"><button className='main_button'>Read More</button></Link>
                    </div>
                </div>
                <div className='blogInner'>
                    <div className='blogThumb'>
                       <img src={Thumb} alt=''/>
                    </div>
                    <div className='blogBody'>
                     <span><i class="far fa-calendar-alt"></i> 19 Sep 2023 / <i class="fas fa-user"></i> Admin</span>
                     <h3>Lorem ipsum dolor sit amet consectetur</h3>
                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra metus ut arcu posuere, sed posuere libero vulputate. Morbi dapibus accumsan rhoncus. </p>
                     <Link to="/single-blog"><button className='main_button'>Read More</button></Link>
                    </div>
                </div>
                <div className='blogInner'>
                    <div className='blogThumb'>
                       <img src={Thumb} alt=''/>
                    </div>
                    <div className='blogBody'>
                     <span><i class="far fa-calendar-alt"></i> 19 Sep 2023 / <i class="fas fa-user"></i> Admin</span>
                     <h3>Lorem ipsum dolor sit amet consectetur</h3>
                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra metus ut arcu posuere, sed posuere libero vulputate. Morbi dapibus accumsan rhoncus. </p>
                     <Link to="/single-blog"><button className='main_button'>Read More</button></Link>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <Footer/>
   </>
  )
}

export default Blogs