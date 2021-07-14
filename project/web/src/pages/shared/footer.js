import { useSelector } from "react-redux";
import styles from "styles/home.module.scss";
import { Link } from "react-router-dom";
import SocialMediaIcons from "./socialmedialist";
import logo from "assets/logo.png";

export default function Contact() {
  const contents = useSelector((state) => state.appReducer.contents);
  return (
    <footer className={styles.footer}>
      <div className={styles.firstrow}>
        <div className={styles.outer}>
          <div className={styles.inner}>
            <div className={styles.discover}>
              <div>
                <h2>Discover</h2>
              </div>
              <div>
                &gt;{" "}
                <Link to="/" as={"/"}>
                  Home
                </Link>
              </div>
              <div>
                &gt;{" "}
                <Link to="/privacy" as={"/privacy"}>
                  Terms & Privacy
                </Link>
              </div>
              <div>
                &gt;{" "}
                <Link to="/about" as={"/about"}>
                  About
                </Link>
              </div>
            </div>
            <div className={styles.seperator} />
            <div className={styles.contactus}>
              <div>
                <h2>Contact Us</h2>
              </div>
              <div>
                <span>
                  <i className="fa fa-map-marker" aria-hidden="true"></i>68
                  {contents.address}
                </span>
              </div>
              <div>
                <span>
                  <i className="fa fa-phone" aria-hidden="true"></i>
                  {contents.phone}
                </span>
              </div>
              <div>
                <a href={`mailto:${contents.email}`}>
                  <span>
                    <i className="fa fa-envelope-o" aria-hidden="true"></i>
                    {contents.email}
                  </span>
                </a>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.secondrow}>
        <div className={styles.outer}>
          <div className={styles.inner}>
            <div>
              <img src={logo} alt="logo" />
              <ul>
                <SocialMediaIcons />
              </ul>
              <div>© Linxbiz - All rights reserved</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
