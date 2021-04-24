import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styles from "styles/home.module.scss";
import { getAdverts } from "api/api";

export default function Home() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    getAdverts().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <div className={`${styles.outer} ${styles["slide-bg"]}`}>
      <div className={styles.inner}>
        <div className={styles.slide}>
          <h1>Discover Our Featured Listings </h1>
          <h2>Our featured suggestions can save you time</h2>
          <Carousel className={styles.carousel} showArrows={true} swipeable>
            {data.map((d) => (
              <div key={d.title}>
                <img src={d.cover} />
                <p className="legend">
                  {d.title}
                  <br />£{d.freeHoldPrice}
                </p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
