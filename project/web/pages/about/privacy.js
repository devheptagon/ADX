import React from "react";
import { getAbout } from "api/api";
import styles from "styles/home.module.scss";

export default function About() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    /* getAbout().then((res) => {
      console.log({ res });
      setData(res);
    }); */
  }, []);
  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div className={styles.about}>
          <div
            className={styles.abouttext}
            dangerouslySetInnerHTML={{ __html: data }}
          />
          privacy
        </div>
      </div>
    </div>
  );
}
