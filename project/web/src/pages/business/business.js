import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "styles/home.module.scss";
import Loading from "pages/shared/loading";
import Filter from "./sub/filter";
import { fillAdverts } from "api/api2";
import AdvertList from "./sub/advertList";

const Business = () => {
  const loading = useSelector((state) => state.appReducer.loading);
  const sf = useSelector((state) => state.appReducer.sectorFilter);
  const af = useSelector((state) => state.appReducer.areaFilter);
  const dispatch = useDispatch();
  React.useEffect(() => {
    //coming from home with sector and/or area filter
    if (af.length || sf.length) {
      setTimeout(() => {
        fillAdverts({ selectedSectors: sf, selectedAreas: af }, dispatch);
      }, 1000);
    }
  }, [dispatch, af, sf]);

  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div className={styles.business}>
          <h1>BUSINESS LIST</h1>
          <Filter />
          {loading ? <Loading /> : <AdvertList />}
        </div>
      </div>
    </div>
  );
};

export default Business;
