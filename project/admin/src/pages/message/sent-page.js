import Layout from "Layout";
import MessageList from "./message-list";
import styles from "styles/app.module.scss";

export default function SentPage() {
  return (
    <Layout>
      <div className={styles.message}>
        <MessageList />
      </div>
    </Layout>
  );
}
