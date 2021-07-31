import Layout from "Layout";
import ProfileForm from "./profile-form";
import styles from "styles/app.module.scss";

export default function ContentPage() {
  return (
    <Layout>
      <div className={styles.profile}>
        <ProfileForm />
      </div>
    </Layout>
  );
}
