import styles from "styles/home.module.scss";
import Search from "./search";

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
      <Search />
    </div>
  );
}
