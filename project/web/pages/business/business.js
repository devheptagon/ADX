import React from "react";
import { getAdverts } from "api/api";
import styles from "styles/home.module.scss";

export default function Business() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    getAdverts().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <h1>BUSINESS</h1>
        {data.map((d) => (
          <div key={d._id}>
            <h3>{d.title}</h3>
            <h5>Sectors: {d.sectors.map((s) => s.title).join(",")}</h5>
            <h5>Keywords: {d.tags.map((t) => t.title).join(", ")}</h5>
            <img src={d.cover} style={{ maxWidth: "100%" }} />
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
