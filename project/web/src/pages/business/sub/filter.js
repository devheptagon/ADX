import React from "react";
import { useSelector, useDispatch } from "react-redux";
import MultiSelect from "react-multi-select-component";
import { getSectors, getAreas, getKeywords } from "api/api";
import styles from "styles/home.module.scss";
import {
  setAreaFilterAction,
  setKeywordFilterAction,
  setMaxPriceFilterAction,
  setMinPriceFilterAction,
  setSectorFilterAction,
  setTenureFilterAction,
} from "redux/app/appActions";

export default function Business() {
  const dispatch = useDispatch();
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

  const selectSector = (selection) => {
    dispatch(setSectorFilterAction(selection));
    //search with value
  };

  const selectArea = (selection) => {
    dispatch(setAreaFilterAction(selection));
    //search with value
  };

  const selectKeyword = (selection) => {
    dispatch(setKeywordFilterAction(selection));
    //search with value
  };

  const selectTenure = (selection) => {
    dispatch(setTenureFilterAction(selection));
    //search with value
  };

  const selectMinPrice = (e) => {
    const min = e.target.value;
    dispatch(setMinPriceFilterAction(min));
    //debounce search
  };

  const selectMaxPrice = (e) => {
    const max = e.target.value;
    dispatch(setMaxPriceFilterAction(max));
    //debounce search
  };

  return (
    <details open>
      <summary>Amend your search</summary>
      <div className={styles.filters}>
        <div className={styles.item}>
          <label>Sector</label>
          <MultiSelect
            options={sectorOptions}
            value={selectedSectors}
            onChange={selectSector}
            labelledBy="Select"
          />
        </div>
        <div className={styles.item}>
          <label>Area</label>
          <MultiSelect
            options={areaOptions}
            value={selectedAreas}
            onChange={selectArea}
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
            onChange={selectTenure}
            labelledBy="Select"
          />
        </div>
        <div className={styles.item}>
          <label>Keywords</label>
          <MultiSelect
            options={keywordOptions}
            value={selectedKeywords}
            onChange={selectKeyword}
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
            <input
              type="range"
              min={0}
              max={10000000}
              step={5000}
              onChange={selectMinPrice}
            />
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
            <input
              type="range"
              min={0}
              max={10000000}
              step={5000}
              onChange={selectMaxPrice}
            />
          </div>
        </div>
      </div>
    </details>
  );
}
