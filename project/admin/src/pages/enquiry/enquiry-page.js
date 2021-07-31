import Layout from "Layout";
import EnquiryList from "./enquiry-list";
import styles from "styles/app.module.scss";

export default function EnquiryPage() {
  return (
    <Layout>
      <div className={styles.enquiry}>
        <EnquiryList />
      </div>
    </Layout>
  );
}
