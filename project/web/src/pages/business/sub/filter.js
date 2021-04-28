import React from "react";
import { useSelector } from "react-redux";
import MultiSelect from "react-multi-select-component";
import { getSectors, getAreas, getKeywords } from "api/api";
import styles from "styles/home.module.scss";

export default function Business() {
  const {
    sectorFilter: selectedSectors,
    areaFilter: selectedAreas,
    tenureFilter: selectedTenures,
    keywordFilter: selectedKeywords,
    minPriceFilter: selectedMinPrice,
    maxPriceFilter: selectedMaxPrice,
  } = useSelector((state) => state.appReducer);

  const [sectors, setSectors] = React.useState([]);
  const [areas, setAreas] = React.useState([]);
  const [keywords, setKeywords] = React.useState([]);

  React.useEffect(() => {
    getSectors().then((res) => {
      setSectors(res);
    });
    getAreas().then((res) => setAreas(res));
    getKeywords().then((res) => setKeywords(res));
  }, []);

  const sectorOptions = sectors.map((s) => ({
    label: s.title,
    value: s.title,
  }));
  const areaOptions = areas.map((a) => ({ label: a.title, value: a.title }));
  const keywordOptions = keywords.map((a) => ({
    label: a.title,
    value: a.title,
  }));

  return (
    <details>
      <summary>Amend your search</summary>
      <div className={styles.filters}>
        <div className={styles.item}>
          <label>Sector</label>
          <MultiSelect
            options={sectorOptions}
            value={selectedSectors}
            onChange={null}
            labelledBy="Select"
          />
        </div>
        <div className={styles.item}>
          <label>Area</label>
          <MultiSelect
            options={areaOptions}
            value={selectedAreas}
            onChange={null}
            labelledBy="Select"
          />
        </div>
        <div className={styles.item}>
          <label>Tenure</label>
          <MultiSelect
            options={[
              { label: "Leasehold", value: "Leasehold" },
              { label: "Freehold", value: "Freehold" },
            ]}
            value={selectedTenures}
            onChange={null}
            labelledBy="Select"
          />
        </div>
        <div className={styles.item}>
          <label>Keywords</label>
          <MultiSelect
            options={keywordOptions}
            value={selectedKeywords}
            onChange={null}
            labelledBy="Select"
          />
        </div>
        <div className={styles.item}>
          <label>
            Min. Price:{" "}
            <b>
              {selectedMinPrice === 0 ? "(No-min)" : `£${selectedMinPrice}`}
            </b>
          </label>
          <div>
            <input type="range" min={0} max={100000000} step={5000} />
          </div>
        </div>
        <div className={styles.item}>
          <label>
            Max. Price:{" "}
            <b>
              {selectedMaxPrice === 0 ? "(No-max)" : `£${selectedMaxPrice}`}
            </b>
          </label>
          <div>
            <input type="range" min={0} max={100000000} step={5000} />
          </div>
        </div>
      </div>
    </details>
  );
}
