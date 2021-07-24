import Layout from "Layout";
import ContentList from "./contents-list";
import styles from "styles/app.module.scss";

export default function ContentPage() {
  return (
    <Layout>
      <div className={styles.content}>
        <ContentList />
      </div>
    </Layout>
  );
}
