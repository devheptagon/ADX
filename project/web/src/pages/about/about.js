import React from "react";
import { useSelector } from "react-redux";
import styles from "styles/home.module.scss";
import Testimonials from "../home/sub/testimonials";

export default function About() {
  const contents = useSelector((state) => state.appReducer.contents);

  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div className={styles.about}>
          <div
            className={styles.abouttext}
            dangerouslySetInnerHTML={{ __html: contents.about }}
          />
          <Testimonials />
        </div>
      </div>
    </div>
  );
}
