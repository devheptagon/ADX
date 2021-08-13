import styles from "styles/app.module.scss";
import { Link } from "react-router-dom";

export default function SuccessPage() {
  return (
    <div className={styles.upgrade_result}>
      <div>
        <h3>Congratulations!</h3>
        Your membership has started, please click here to&nbsp;
        <Link to={`/logout`}>Login</Link> and refresh your settings!
      </div>
    </div>
  );
}
