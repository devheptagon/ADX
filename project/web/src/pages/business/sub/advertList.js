import React from "react";
import { Link } from "react-router-dom";
import styles from "styles/home.module.scss";
import { slugify } from "helpers/genericHelper";
import { apiUrl } from "../../../config";
import Loading from "pages/shared/loading";

const AdvertList = React.memo((props) => {
  const { data, loading } = props;
  return loading ? (
    <Loading />
  ) : (
    <div className={styles.list}>
      {data?.map((d) => {
        const cover = d.images ? d.images.split(",")[0] : "na.jpg";
        const coverUrl = apiUrl + "images/" + cover;
        return (
          <div key={d.id} className={styles.item}>
            <Link
              key={d.id}
              to={`/detail?id=${d.id}&title=${slugify(d.title)}`}
              as={`/${d.id}?t=${slugify(d.title)}`}
            >
              <div>
                <h3
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {d.title}
                </h3>
                <div className={styles.property}>
                  <b>Sectors</b>: {d.sectors}
                </div>
                <div className={styles.property}>
                  <b>Tags</b>: {d.tags}
                </div>
                <div className={styles.property}>
                  <b>Area</b>: {d.area}
                </div>
                <br />
                <img alt="list" src={coverUrl} style={{ maxWidth: "90%" }} />
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
});

export default AdvertList;
