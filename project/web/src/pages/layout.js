import styles from "styles/home.module.scss";
import Header from "pages/shared/header";
import Footer from "pages/shared/footer";
import React from "react";
import { getAreas, getKeywords, getSectors, getTopAdverts } from "api/api";
import { useDispatch } from "react-redux";
import {
  setAdvertsAction,
  setAreasAction,
  setKeywordsAction,
  setSectorsAction,
} from "redux/app/appActions";

export default function Layout(props) {
  const dispatch = useDispatch();
  React.useEffect(() => {
    getTopAdverts().then((d) => dispatch(setAdvertsAction(d)));
    getKeywords().then((d) => dispatch(setKeywordsAction(d)));
    getSectors().then((d) => dispatch(setSectorsAction(d)));
    getAreas().then((d) => dispatch(setAreasAction(d)));
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.layout}>{props.children}</div>
      <Footer />
    </div>
  );
}
