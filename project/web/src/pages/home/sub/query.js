import styles from "styles/home.module.scss";
import QueryInfo from "./queryinfo";
import QueryForm from "./queryform";

export default function Query() {
  return (
    <div className={`${styles.outer} ${styles.querybg}`}>
      <div className={`${styles.inner} ${styles.query}`}>
        <QueryInfo />
        <QueryForm />
      </div>
    </div>
  );
}
