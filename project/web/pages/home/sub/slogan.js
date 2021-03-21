import styles from "styles/home.module.scss";

export default function Slogan() {
  return (
    <div className={styles.mainbg}>
      <div className={styles.slogan}>
        <h1>
          Your New Business For Sale <br />
          Marketplace!
        </h1>
        <h2>Find the right commercial place with Linxbiz</h2>
      </div>
      <div className={styles.searchbox}>
        <div>
          <label>LOOKING FOR</label>
          <br />
          <input type="text" />
        </div>
        <div>
          <label>LOCATION</label>
          <br />
          <input type="text" />
        </div>
        <div>
          <input type="button" title="SEARCH" value="SEARCH" />
        </div>
      </div>
    </div>
  );
}
