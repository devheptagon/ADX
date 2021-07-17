import React from "react";
import { Link } from "react-router-dom";
import styles from "styles/home.module.scss";
import { slugify } from "helpers/genericHelper";
import { apiUrl } from "../../../config";

const AdvertList = React.memo((props) => {
  const { data } = props;
  return (
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
                <h5>Sectors: {d.sectors}</h5>
                <h5>Keywords: {d.tags}</h5>
                <h5>Area: {d.area}</h5>
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
