import React, {useEffect} from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import "../customCss/Blogs.css";

const SingleBlog = () => {
    useEffect(() => {
        document.title = "Single Blog";
        window.scrollTo(0,0)
      }, []);
  return (
    <>
      <Navbar />
      <section className="profile_bannerSec">
        <div className="container">
          <h2>Lorem ipsum dolor sit amet consectetur adipiscing elit</h2>
        </div>
      </section>
      <div className="single_blogSec">
        <div className="container">
          <div className="single_blogInner">
            <div className="single_blogMeta">
              <span>
                <i class="far fa-calendar-alt"></i> 19 Sep 2023 /{" "}
                <i class="fas fa-user"></i> Admin
              </span>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              pharetra metus ut arcu posuere, sed posuere libero vulputate.
              Morbi dapibus accumsan rhoncus. Aliquam sit amet posuere ligula.
              Phasellus dapibus dolor tellus, sit amet volutpat odio varius eu.
              Sed ac arcu pharetra, malesuada purus vitae, posuere augue.
              Integer sem elit, ultricies ac venenatis imperdiet, blandit ac
              eros. Nulla eleifend justo vitae placerat commodo. Aenean sit amet
              fringilla est, ut fringilla orci. Praesent viverra lacus ac nibh
              rutrum aliquet. Pellentesque bibendum neque ac eros laoreet
              gravida. Donec tincidunt odio ac mauris molestie, vitae viverra
              purus mollis. Aenean lobortis nulla non luctus feugiat. Aliquam
              purus odio, bibendum a faucibus sed, bibendum id est. Morbi
              ullamcorper ante quis mauris tincidunt, at dapibus mi convallis.
              Proin vehicula bibendum dolor at vulputate. Integer molestie nisi
              ex, aliquam molestie metus vulputate eget.
            </p>

            <p>
              Suspendisse efficitur erat ut maximus congue. Praesent non erat
              ultricies, tempus libero at, lacinia tellus. Mauris sit amet
              finibus diam. Suspendisse eros nisl, ultricies non arcu eget,
              blandit tempor nibh. Vivamus malesuada aliquet dui in pulvinar.
              Donec non libero ac risus venenatis blandit nec ac leo. Nunc ut
              eleifend eros. Vestibulum dignissim dolor vitae libero semper
              molestie. Suspendisse potenti. Mauris rhoncus justo non volutpat
              pulvinar. Donec ligula metus, lobortis et molestie sit amet,
              dignissim ut massa. Nam eu ex sit amet libero finibus finibus.
              Morbi laoreet bibendum nisi, a porttitor leo finibus sed. Quisque
              varius felis vel condimentum congue. Aliquam et pulvinar tortor.
            </p>
            <h4>Suspendisse efficitur erat ut</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              pharetra metus ut arcu posuere, sed posuere libero vulputate.
              Morbi dapibus accumsan rhoncus. Aliquam sit amet posuere ligula.
              Phasellus dapibus dolor tellus, sit amet volutpat odio varius eu.
              Sed ac arcu pharetra, malesuada purus vitae, posuere augue.
              Integer sem elit, ultricies ac venenatis imperdiet, blandit ac
              eros. Nulla eleifend justo vitae placerat commodo. Aenean sit amet
              fringilla est, ut fringilla orci. Praesent viverra lacus ac nibh
              rutrum aliquet. Pellentesque bibendum neque ac eros laoreet
              gravida. Donec tincidunt odio ac mauris molestie, vitae viverra
              purus mollis. Aenean lobortis nulla non luctus feugiat. Aliquam
              purus odio, bibendum a faucibus sed, bibendum id est. Morbi
              ullamcorper ante quis mauris tincidunt, at dapibus mi convallis.
              Proin vehicula bibendum dolor at vulputate. Integer molestie nisi
              ex, aliquam molestie metus vulputate eget.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleBlog;
