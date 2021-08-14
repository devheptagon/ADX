import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MultiSelect from "react-multi-select-component";
import { getAdverts } from "api/api";
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
import AdvertList from "./advertList";

const Filter = React.memo(() => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
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
    value: s.id,
  }));
  const areaOptions = areas.map((a) => ({ label: a, value: a }));
  const keywordOptions = keywords.map((a) => ({
    label: a.title,
    value: a.id,
  }));
  const tenureOptions = tenures.map((a) => ({
    label: a,
    value: a,
  }));

  const selectSector = (selection) => {
    dispatch(setSectorFilterAction(selection));
  };

  const selectArea = (selection) => {
    dispatch(setAreaFilterAction(selection));
  };

  const selectKeyword = (selection) => {
    dispatch(setKeywordFilterAction(selection));
  };

  const selectTenure = (selection) => {
    dispatch(setTenureFilterAction(selection));
  };

  const selectMinPrice = (e) => {
    const min = e.target.value;
    dispatch(setMinPriceFilterAction(min));
  };

  const selectMaxPrice = (e) => {
    const max = e.target.value;
    dispatch(setMaxPriceFilterAction(max));
  };

  const [data, setData] = React.useState([]);

  const getCorrectedFilters = React.useCallback(() => {
    let correctedSectorsFilter =
      selectedSectors.length === sectorOptions.length ? null : selectedSectors;
    let correctedTagsFilter =
      selectedKeywords.length === keywordOptions.length
        ? null
        : selectedKeywords;
    let correctedTenuresFilter =
      selectedTenures.length === tenureOptions.length ? null : selectedTenures;
    let correctedAreasFilter =
      selectedAreas.length === areaOptions.length ? null : selectedAreas;

    return {
      correctedSectorsFilter,
      correctedAreasFilter,
      correctedTagsFilter,
      correctedTenuresFilter,
    };
  }, [
    selectedTenures,
    selectedSectors,
    selectedAreas,
    selectedKeywords,
    areaOptions.length,
    tenureOptions.length,
    keywordOptions,
    sectorOptions,
  ]);

  const search = React.useCallback(async () => {
    const {
      correctedSectorsFilter,
      correctedAreasFilter,
      correctedTagsFilter,
      correctedTenuresFilter,
    } = getCorrectedFilters();
    const results = await getAdverts({
      page,
      selectedSectors: correctedSectorsFilter,
      selectedAreas: correctedAreasFilter,
      selectedTenures: correctedTenuresFilter,
      selectedKeywords: correctedTagsFilter,
      selectedMinPrice,
      selectedMaxPrice,
    });
    setPage(1);
    setData(results.data);
    setShowLoadMore(true);
  }, [page, selectedMinPrice, selectedMaxPrice, getCorrectedFilters]);

  const [showLoadMore, setShowLoadMore] = useState(true);

  const loadMore = async (e) => {
    const {
      correctedSectorsFilter,
      correctedAreasFilter,
      correctedTagsFilter,
      correctedTenuresFilter,
    } = getCorrectedFilters();
    e.preventDefault();
    const newPage = page + 1;
    setPage(newPage);
    const results = await getAdverts({
      page: newPage,
      selectedSectors: correctedSectorsFilter,
      selectedAreas: correctedAreasFilter,
      selectedTenures: correctedTenuresFilter,
      selectedKeywords: correctedTagsFilter,
      selectedMinPrice,
      selectedMaxPrice,
    });
    const newList = [...data, ...results.data];
    setData(newList);
    setShowLoadMore(+results.count > newList.length);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      search();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
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
        <div className={styles.searchbutton_wrapper}>
          <button onClick={search} className={styles.searchbutton}>
            SEARCH
          </button>
        </div>
      </details>
      <AdvertList data={data} />
      <br />
      <br />
      {showLoadMore && data.length ? (
        <div className={styles.loadmore}>
          <a href="#" onClick={loadMore}>
            Load more
          </a>
        </div>
      ) : null}
    </>
  );
});

export default Filter;
