import React, { useEffect } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import "../customCss/PrivacyPolicy.css";

const TermsConditions = () => {
  useEffect(() => {
    document.title = "Terms & Conditions";
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Navbar />
      <section className="profile_bannerSec">
        <div className="container">
          <h1>Terms & Conditions</h1>
          <span>Home / Terms & Conditions</span>
        </div>
      </section>
      <div className="privay_mainSec">
        <div className="container">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            pharetra metus ut arcu posuere, sed posuere libero vulputate. Morbi
            dapibus accumsan rhoncus. Aliquam sit amet posuere ligula. Phasellus
            dapibus dolor tellus, sit amet volutpat odio varius eu. Sed ac arcu
            pharetra, malesuada purus vitae, posuere augue. Integer sem elit,
            ultricies ac venenatis imperdiet, blandit ac eros. Nulla eleifend
            justo vitae placerat commodo. Aenean sit amet fringilla est, ut
            fringilla orci. Praesent viverra lacus ac nibh rutrum aliquet.
            Pellentesque bibendum neque ac eros laoreet gravida. Donec tincidunt
            odio ac mauris molestie, vitae viverra purus mollis. Aenean lobortis
            nulla non luctus feugiat. Aliquam purus odio, bibendum a faucibus
            sed, bibendum id est. Morbi ullamcorper ante quis mauris tincidunt,
            at dapibus mi convallis. Proin vehicula bibendum dolor at vulputate.
            Integer molestie nisi ex, aliquam molestie metus vulputate eget.
          </p>

          <p>
            Suspendisse efficitur erat ut maximus congue. Praesent non erat
            ultricies, tempus libero at, lacinia tellus. Mauris sit amet finibus
            diam. Suspendisse eros nisl, ultricies non arcu eget, blandit tempor
            nibh. Vivamus malesuada aliquet dui in pulvinar. Donec non libero ac
            risus venenatis blandit nec ac leo. Nunc ut eleifend eros.
            Vestibulum dignissim dolor vitae libero semper molestie. Suspendisse
            potenti. Mauris rhoncus justo non volutpat pulvinar. Donec ligula
            metus, lobortis et molestie sit amet, dignissim ut massa. Nam eu ex
            sit amet libero finibus finibus. Morbi laoreet bibendum nisi, a
            porttitor leo finibus sed. Quisque varius felis vel condimentum
            congue. Aliquam et pulvinar tortor.
          </p>
          <h4>Suspendisse non mollis metus</h4>

          <p>
            Sed id aliquet nunc, at pulvinar metus. Ut et tortor elementum leo
            ullamcorper rhoncus. Suspendisse semper ultricies magna id sagittis.
            Nulla nec suscipit elit, non maximus justo. Vivamus maximus lectus
            porttitor magna mollis, sed cursus sapien bibendum. Praesent
            fermentum, elit tempus tristique semper, eros turpis fringilla
            sapien, consequat accumsan mi metus tincidunt diam. Pellentesque et
            fringilla velit. Phasellus ut lobortis magna, et vehicula lacus.
            Morbi sed tortor nec elit scelerisque molestie. Phasellus efficitur
            tortor quis lorem mattis porttitor. Nullam aliquet posuere suscipit.
            Aliquam gravida vehicula massa, quis sodales risus aliquam a. In
            lorem mauris, facilisis mattis dolor vel, malesuada hendrerit velit.
            Etiam eros ligula, consectetur a diam aliquam, venenatis ultricies
            odio. Aenean accumsan at purus quis viverra. Nunc vel consequat
            risus.
          </p>

          <p>
            Vivamus eros metus, pulvinar in libero quis, convallis placerat
            odio. Donec nec sem ut enim dictum cursus. Integer ut interdum
            massa. Nulla lacinia sed purus at rhoncus. Phasellus consectetur
            nisi vitae pharetra condimentum. Nam semper nunc tellus, sed viverra
            justo posuere eget. Mauris eget orci molestie, fermentum dui a,
            rutrum est. Nunc ultrices massa nec urna tempus rutrum. Morbi et
            pretium magna, at varius tellus. Aenean vestibulum nunc sed odio
            iaculis eleifend. Praesent id viverra magna. Aliquam ut est et dolor
            mollis tempus. Vestibulum at eros eu erat hendrerit pulvinar.
            Vestibulum pulvinar facilisis turpis, eu scelerisque velit.
          </p>

          <p>
            Suspendisse non mollis metus. Nullam convallis accumsan lacus, eu
            sagittis orci ullamcorper at. Donec lacinia mi sit amet ipsum
            hendrerit fringilla. Nam sed diam a arcu pulvinar finibus id quis
            nibh. Sed rhoncus urna id turpis ornare, eget egestas elit volutpat.
            Aliquam varius orci at sagittis aliquam. Suspendisse lacinia est id
            enim dignissim cursus. Praesent efficitur, ex vel placerat lacinia,
            nibh risus pharetra est, a aliquam lacus ex nec nisi. Vivamus
            elementum nisi ac sapien ullamcorper scelerisque. Maecenas lobortis
            tellus massa, ut congue dui consectetur vitae. Vivamus venenatis
            condimentum erat, sed viverra nisi egestas nec. Fusce suscipit
            pretium enim viverra placerat. Donec laoreet, mauris vitae mollis
            egestas, risus elit condimentum ex, vel gravida magna arcu ut ante.
            Maecenas vestibulum dolor mauris, quis faucibus nibh consectetur ac.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsConditions;
