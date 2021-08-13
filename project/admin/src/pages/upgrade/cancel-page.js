import styles from "styles/app.module.scss";

export default function CancelPage() {
  return (
    <div className={styles.upgrade_result}>
      <div>
        <h3>You cancelled upgrade!</h3>
        You can try again any time you want!
      </div>
    </div>
  );
}
