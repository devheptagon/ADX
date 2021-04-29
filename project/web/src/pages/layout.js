import styles from "styles/home.module.scss";
import Header from "pages/shared/header";
import Footer from "pages/shared/footer";
import React from "react";
import { getAreas, getKeywords, getSectors, getTopAdverts } from "api/api";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFiltersAction,
  setAdvertsAction,
  setAreasAction,
  setKeywordsAction,
  setSectorsAction,
} from "redux/app/appActions";

export default function Layout(props) {
  const dispatch = useDispatch();
  const firstLoad = useSelector((state) => state.appReducer.firstLoad);

  React.useEffect(() => {
    if (firstLoad) {
      getTopAdverts().then((d) => dispatch(setAdvertsAction(d)));
      getKeywords().then((d) => dispatch(setKeywordsAction(d)));
      getSectors().then((d) => dispatch(setSectorsAction(d)));
      getAreas().then((d) => dispatch(setAreasAction(d)));
    }
    if (window.location.href.toLowerCase().indexOf("/business") === -1) {
      dispatch(resetFiltersAction());
    }
  }, [dispatch, firstLoad]);

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.layout}>{props.children}</div>
      <Footer />
    </div>
  );
}
