import React from "react";
import { getAdverts } from "api/api";
import styles from "styles/home.module.scss";

export default function Business() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    getAdverts().then((res) => {
      console.log(res);
      setData(res);
    });
  }, []);

  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <h1>BUSINESS</h1>
        {data.map((d) => (
          <div key={d._id}>{d.title}</div>
        ))}
      </div>
    </div>
  );
}
