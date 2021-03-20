import Head from "next/head";
import styles from "../styles/home.module.scss";

export default function Home() {
  return (
    <div className={styles.app}>
      <nav className="navbar navbar-light" aria-label="social media">
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
      <div className="main">
        <div className={styles.mainbg}>
          <div className={styles.slogan}>
            <h1>
              Your New Business For Sale <br />
              Marketplace!
            </h1>
            <h2>Find the right commercial place with Linxbiz</h2>
          </div>
          <div className={styles.searchbox}>
            <div>
              <label>LOOKING FOR</label>
              <br />
              <input type="text" />
            </div>
            <div>
              <label>LOCATION</label>
              <br />
              <input type="text" />
            </div>
            <div>
              <input type="button" title="search" value="search" />
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "red" }}>
          asdf
          <br />
          asdf
        </div>
      </div>
      <footer className="container-fluid">
        <div className="container">footer here</div>
      </footer>
    </div>
  );
}
