import React from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styles from "styles/home.module.scss";
import { useSelector } from "react-redux";
import { formatter, slugify } from "helpers/genericHelper";
import { apiUrl } from "../../../api/api";

export default function Slide() {
  const topAdverts = useSelector((state) => state.appReducer.topAdverts);

  return (
    <div className={`${styles.outer} ${styles["slide-bg"]}`}>
      <div className={styles.inner}>
        <div className={styles.slide}>
          <h1>Discover Our Featured Listings </h1>
          <h2>Our featured suggestions can save you time</h2>
          <Carousel className={styles.carousel} showArrows={true} swipeable>
            {topAdverts?.map((d) => {
              const cover = d.images ? d.images.split(",")[0] : "na.jpg";
              const coverUrl = apiUrl + "images/" + cover;

              return (
                <Link
                  key={d.id}
                  to={`/detail?id=${d.id}&title=${slugify(d.title)}`}
                  as={`/${d.id}?t=${slugify(d.title)}`}
                >
                  <div>
                    <img src={coverUrl} alt="cover" />
                    <p className="legend">
                      {d.title}
                      <br />
                      {d.location?.postcode &&
                        d.location?.postcode.toUpperCase()}
                      <br />
                      {d.freeHoldPrice ? formatter.format(d.freeHoldPrice) : ""}
                    </p>
                  </div>
                </Link>
              );
            })}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
