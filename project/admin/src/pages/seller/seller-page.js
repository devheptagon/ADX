import Layout from "Layout";
import SellerList from "./seller-list";
import styles from "styles/app.module.scss";

export default function SellerPage() {
  return (
    <Layout>
      <div className={styles.seller}>
        <SellerList />
      </div>
    </Layout>
  );
}
