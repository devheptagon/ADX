import Layout from "Layout";
import UpgradeForm from "./upgrade-form";
import styles from "styles/app.module.scss";

export default function ContentPage() {
  return (
    <Layout>
      <div className={styles.upgrade}>
        <UpgradeForm />
      </div>
    </Layout>
  );
}
