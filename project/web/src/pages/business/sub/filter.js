import React from "react";
import { useSelector, useDispatch } from "react-redux";
import MultiSelect from "react-multi-select-component";
import lodash from "lodash";
import { fillAdverts } from "api/api";
import styles from "styles/home.module.scss";
import {
  setAreaFilterAction,
  setKeywordFilterAction,
  setMaxPriceFilterAction,
  setMinPriceFilterAction,
  setSectorFilterAction,
  setTenureFilterAction,
} from "redux/app/appActions";
import { formatter } from "helpers/genericHelper";

const Filter = React.memo(() => {
  const debouncer = React.useRef();
  const dispatch = useDispatch();

  const selectedSectors = useSelector((state) => state.appReducer.sectorFilter);
  const selectedAreas = useSelector((state) => state.appReducer.areaFilter);
  const selectedTenures = useSelector((state) => state.appReducer.tenureFilter);
  const selectedKeywords = useSelector(
    (state) => state.appReducer.keywordFilter
  );
  const selectedMinPrice = useSelector(
    (state) => state.appReducer.minPriceFilter
  );
  const selectedMaxPrice = useSelector(
    (state) => state.appReducer.maxPriceFilter
  );
  const sectors = useSelector((state) => state.appReducer.sectors);
  const areas = useSelector((state) => state.appReducer.areas);
  const keywords = useSelector((state) => state.appReducer.keywords);
  const tenures = useSelector((state) => state.appReducer.tenures);

  const sectorOptions = sectors.map((s) => ({
    label: s.title,
    value: s.title,
  }));
  const areaOptions = areas.map((a) => ({ label: a.title, value: a.title }));
  const keywordOptions = keywords.map((a) => ({
    label: a.title,
    value: a.title,
  }));
  const tenureOptions = tenures.map((a) => ({
    label: a,
    value: a,
  }));

  const selectSector = (selection) => {
    dispatch(setSectorFilterAction(selection));
    search({ selectedSectors: selection });
  };

  const selectArea = (selection) => {
    dispatch(setAreaFilterAction(selection));
    search({ selectedAreas: selection });
  };

  const selectKeyword = (selection) => {
    dispatch(setKeywordFilterAction(selection));
    search({ selectedKeywords: selection });
  };

  const selectTenure = (selection) => {
    dispatch(setTenureFilterAction(selection));
    search({ selectedTenures: selection });
  };

  const selectMinPrice = (e) => {
    const min = e.target.value;
    dispatch(setMinPriceFilterAction(min));
    debouncer.current?.cancel();
    debouncer.current = lodash.debounce(
      () => search({ selectedMinPrice: min }),
      750
    );
    debouncer.current();
  };

  const selectMaxPrice = (e) => {
    const max = e.target.value;
    dispatch(setMaxPriceFilterAction(max));
    debouncer.current?.cancel();
    debouncer.current = lodash.debounce(
      () => search({ selectedMaxPrice: max }),
      750
    );
    debouncer.current();
  };

  const search = (lastValue) => {
    fillAdverts(
      {
        selectedSectors,
        selectedAreas,
        selectedTenures,
        selectedKeywords,
        selectedMinPrice,
        selectedMaxPrice,
        ...lastValue,
      },
      dispatch
    );
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
            options={tenureOptions}
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
              {selectedMinPrice == 0
                ? "(No-min)"
                : formatter.format(selectedMinPrice)}
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
              {selectedMaxPrice == 0
                ? "(No-max)"
                : formatter.format(selectedMaxPrice)}
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
});

export default Filter;
