import Layout from "Layout";
import TagList from "./tag-list";
import styles from "styles/app.module.scss";

export default function TagPage() {
  return (
    <Layout>
      <div className={styles.tag}>
        <TagList />
      </div>
    </Layout>
  );
}
