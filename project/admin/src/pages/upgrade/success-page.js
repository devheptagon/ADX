import Layout from "Layout";
import styles from "styles/app.module.scss";

export default function SuccessPage() {
  return (
    <div className={styles.upgrade}>
      <h3>Congratulations!</h3>
      Your membership has started, please logout and relogin to refresh your
      settings!
    </div>
  );
}
