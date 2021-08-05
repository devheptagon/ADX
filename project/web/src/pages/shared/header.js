import { useSelector } from "react-redux";
import styles from "styles/home.module.scss";
import { Link } from "react-router-dom";
import SocialMediaIcons from "./socialmedialist";
import logo from "assets/logo.png";

export default function Header() {
  const contents = useSelector((state) => state.appReducer.contents);
  /*   const isAdminFrame =
    window.location.href.toLowerCase().indexOf("/manage") > -1; */

  return (
    <>
      <nav className={styles.outer}>
        <div className={styles.inner}>
          <ul>
            <li>
              <Link to="/manage" as={"/manage"}>
                Become a seller
              </Link>
            </li>
            <li>
              <Link to="/manage" as={"/manage"}>
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <nav className={styles.outer}>
        <div className={styles.inner}>
          <div className={styles.brand}>
            <Link to="/" as={"/"}>
              <img src={logo} alt="logo" />
            </Link>
            <div className={styles.contact}>
              <ul>
                <li>
                  <i className="fa fa-phone" aria-hidden="true"></i>
                </li>
                <li>
                  <div>01633-216899</div>
                  <div>
                    <a href={`mailto:${contents.email}`}>{contents.email}</a>
                  </div>
                </li>
                <SocialMediaIcons />
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <nav className={styles.outer}>
        <div className={styles.inner}>
          <ul>
            <li>
              <Link to="/" as={"/"}>
                HOME
              </Link>
            </li>
            <li>
              <Link to="/business" as={"/business"}>
                BUSINESS
              </Link>
            </li>
            <li>
              <Link to="/about" as={"/about"}>
                ABOUT
              </Link>
            </li>
            <li>
              <Link to="/contact" as={"/contact"}>
                CONTACT
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
