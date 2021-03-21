import Head from "next/head";
import styles from "styles/home.module.scss";
import Header from "pages/shared/header";

export default function Layout(props) {
  return (
    <div className={styles.app}>
      <Head />
      <Header />
      {props.children}
      <footer className={styles.outer}>
        <div className={styles.inner}>footer here</div>
      </footer>
    </div>
  );
}
