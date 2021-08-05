import { useSelector } from "react-redux";
import styles from "styles/home.module.scss";
import { Link } from "react-router-dom";
import SocialMediaIcons from "./socialmedialist";
import logo from "assets/logo.png";
import { useEffect, useState } from "react";

export default function Header() {
  const contents = useSelector((state) => state.appReducer.contents);
  const [userData, setUserData] = useState({ name: "", role: "anonym" });

  useEffect(() => {
    var eventMethod = window.addEventListener
      ? "addEventListener"
      : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";

    // Listen to message from child window
    eventer(
      messageEvent,
      function (e) {
        if (e.data.payload || e.data.hello) return; //react-tools sends message, discard
        const { action } = e.data;
        const name = action === "login" ? e.data.name : "";
        const role = action === "login" ? e.data.role : "anonym";
        setUserData({ name, role });
        console.log({ name, role });
      },
      false
    );
  }, []);

  return (
    <>
      <nav className={styles.outer}>
        <div className={styles.inner}>
          <ul>
            {(userData.role === "anonym" || userData.role === "guest") && (
              <li>
                <Link to="/manage" as={"/manage"}>
                  Become a seller
                </Link>
              </li>
            )}
            {userData.role === "anonym" && (
              <li>
                <Link to="/login" as={"/login"}>
                  Login
                </Link>
              </li>
            )}
            {userData.role !== "anonym" && (
              <>
                <li>Signed in as {userData.name}</li>
                <li>
                  <Link to="/logout" as={"/logout"}>
                    Logout
                  </Link>
                </li>
              </>
            )}
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
