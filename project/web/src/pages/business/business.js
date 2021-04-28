import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "styles/home.module.scss";
import { slugify } from "../../helpers/genericHelper";
import Loading from "pages/shared/loading";
import Filter from "./sub/filter";

export default function Business() {
  const { loading, adverts: data } = useSelector((state) => state.appReducer);

  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div className={styles.business}>
          <h1>BUSINESS</h1>
          <Filter />
          {loading ? (
            <Loading />
          ) : (
            <div className={styles.list}>
              {data.map((d) => (
                <div key={d._id} className={styles.item}>
                  <Link
                    key={d._id}
                    to={`/detail?id=${d._id}&title=${slugify(d.title)}`}
                    as={`/${d._id}?t=${slugify(d.title)}`}
                  >
                    <div>
                      <h3>{d.title}</h3>
                      <h5>
                        Sectors: {d.sectors.map((s) => s.title).join(",")}
                      </h5>
                      <h5>Keywords: {d.tags.map((t) => t.title).join(", ")}</h5>
                      <h5>Area: {d.area}</h5>
                      <img
                        alt="list"
                        src={d.cover}
                        style={{ maxWidth: "90%" }}
                      />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
