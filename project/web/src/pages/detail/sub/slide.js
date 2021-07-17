import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styles from "styles/home.module.scss";
import { apiUrl } from "../../../config";

export default function Slide(props) {
  const { data } = props;
  return (
    <div className={`${styles.outer} ${styles["slide-bg"]}`}>
      <div className={styles.inner}>
        <div className={styles.slide}>
          <Carousel className={styles.carousel} showArrows={true} swipeable>
            {data.map((d, i) => (
              <img key={i} alt="slide" src={apiUrl + "images/" + d} />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
