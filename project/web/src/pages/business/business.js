import React from "react";
import styles from "styles/home.module.scss";
import FilteredAdverts from "./sub/filteredAdverts";

const Business = () => {
  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div className={styles.business}>
          <h1>BUSINESS LIST</h1>
          <FilteredAdverts />
        </div>
      </div>
    </div>
  );
};

export default Business;
