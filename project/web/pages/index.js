import Head from "next/head";
import styles from "../styles/home.module.scss";

export default function Home() {
  return (
    <div className={styles.app}>
      <nav className="navbar navbar-light bg-light" aria-label="social media">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="./logo.png" alt="logo" />
          </a>
          <div className={styles.contact}>
            <ul>
              <li>
                <i className="fa fa-phone" aria-hidden="true"></i>
              </li>
              <li>
                <div>01633-216899</div>
                <div>info@linxbiz.com</div>
              </li>
              <li>
                <i className="fa fa-facebook" aria-hidden="true"></i>
              </li>
              <li>
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </li>
              <li>
                <i className="fa fa-linkedin" aria-hidden="true"></i>
              </li>
              <li>
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </li>
              <li>
                <i className="fa fa-youtube-play" aria-hidden="true"></i>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <nav className="container-fluid">
        <div className="container">
          <ul>
            <li>HOME</li>
            <li>BUSINESS</li>
            <li>ABOUT</li>
            <li>CONTACT</li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
