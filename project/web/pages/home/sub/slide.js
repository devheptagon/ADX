import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styles from "styles/home.module.scss";

export default function Home() {
  return (
    <div className={styles.outer} id="slide-bg">
      <div className={styles.inner}>
        <div className={styles.slide}>
          <h1>Discover Our Featured Listings </h1>
          <h2>Our featured suggestions can save you time</h2>
          <Carousel className={styles.carousel} showArrows={true} swipeable>
            <div>
              <img src="./1.jpg" />
              <p className="legend">
                Pizza Restaurant
                <br />
                £180.000
              </p>
            </div>
            <div>
              <img src="./2.jpg" />
              <p className="legend">
                Fast food Restaurant
                <br />
                £120.000
              </p>
            </div>
            <div>
              <img src="./3.jpg" />
              <p className="legend">
                Pizza Restaurant
                <br />
                £390.000
              </p>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
