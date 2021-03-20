import Head from "next/head";
import styles from "../styles/home.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

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
        <div className="container-fluid">
          <div className={styles.slide}>
            <h1>Discover Our Featured Listings </h1>
            <h2>Our featured suggestions can save you time</h2>
            <Carousel className={styles.carousel} showArrows={true} swipeable>
              <div>
                <img src="./1.jpg" />
                <p className="legend">
                  Pizza Restaurant
                  <br />
                  £180.000
                </p>
              </div>
              <div>
                <img src="./2.jpg" />
                <p className="legend">
                  Fast food Restaurant
                  <br />
                  £120.000
                </p>
              </div>
              <div>
                <img src="./3.jpg" />
                <p className="legend">
                  Pizza Restaurant
                  <br />
                  £390.000
                </p>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
      <footer className="container-fluid">
        <div className="container">footer here</div>
      </footer>
    </div>
  );
}
