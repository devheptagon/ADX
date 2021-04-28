import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAdverts } from "api/api";
import styles from "styles/home.module.scss";
import { slugify } from "../../helpers/genericHelper";

export default function Business() {
  const selectedSectors = useSelector((state) => state.appReducer.sectorFilter);
  const selectedAreas = useSelector((state) => state.appReducer.areaFilter);

  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    getAdverts(selectedSectors, selectedAreas).then((res) => {
      setData(res);
    });
  }, [selectedSectors, selectedAreas]);

  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div className={styles.business}>
          <h1>BUSINESS</h1>
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
                    <h5>Sectors: {d.sectors.map((s) => s.title).join(",")}</h5>
                    <h5>Keywords: {d.tags.map((t) => t.title).join(", ")}</h5>
                    <h5>Area: {d.area}</h5>
                    <img alt="list" src={d.cover} style={{ maxWidth: "90%" }} />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
