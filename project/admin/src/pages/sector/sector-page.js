import Layout from "Layout";
import SectorList from "./sector-list";
import styles from "styles/app.module.scss";

export default function SectorPage() {
  return (
    <Layout>
      <div className={styles.sector}>
        <SectorList />
      </div>
    </Layout>
  );
}
