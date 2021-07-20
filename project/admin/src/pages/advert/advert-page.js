import Layout from "Layout";
import AdvertList from "./advert-list";
import styles from "styles/app.module.scss";

export default function AdvertPage() {
  return (
    <Layout>
      <div className={styles.advert}>
        <AdvertList />
      </div>
    </Layout>
  );
}
