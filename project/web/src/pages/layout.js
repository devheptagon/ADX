import styles from "styles/home.module.scss";
import Header from "pages/shared/header";
import Footer from "pages/shared/footer";

export default function Layout(props) {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.layout}>{props.children}</div>
      <Footer />
    </div>
  );
}
