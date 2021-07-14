import React from "react";
import { useSelector } from "react-redux";
import styles from "styles/home.module.scss";

export default function About() {
  const contents = useSelector((state) => state.appReducer.contents);

  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div
          className={styles.about}
          dangerouslySetInnerHTML={{ __html: contents.terms }}
        />
      </div>
    </div>
  );
}
