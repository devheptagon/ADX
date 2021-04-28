import styles from "styles/home.module.scss";
import spinner from "assets/loading.gif";

const Loading = () => {
  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div className={styles.loading}>
          <img src={spinner} alt="loading" width="200" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
