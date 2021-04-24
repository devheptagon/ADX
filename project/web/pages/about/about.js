import React from "react";
import { getAbout } from "api/api";
import styles from "styles/home.module.scss";
import Testimonials from "../home/sub/testimonials";

export default function About() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    getAbout().then((res) => {
      setData(res);
    });
  }, []);
  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div className={styles.about}>
          <div
            className={styles.abouttext}
            dangerouslySetInnerHTML={{ __html: data }}
          />
          <Testimonials />
        </div>
      </div>
    </div>
  );
}
