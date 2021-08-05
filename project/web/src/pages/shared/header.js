import { useDispatch, useSelector } from "react-redux";
import styles from "styles/home.module.scss";
import { Link } from "react-router-dom";
import SocialMediaIcons from "./socialmedialist";
import logo from "assets/logo.png";
import { useEffect } from "react";
import { setUserInfoAction } from "redux/app/appActions";

export default function Header() {
  const contents = useSelector((state) => state.appReducer.contents);
  const name = useSelector((state) => state.appReducer.user_name);
  const role = useSelector((state) => state.appReducer.user_role);
  const dispatch = useDispatch();

  useEffect(() => {
    // Listen to message from child window
    const callback = (e) => {
      if (e.data.payload || e.data.hello) return; //react-tools sends message, discard
      const { action } = e.data;
      const new_name = action === "login" ? e.data.name : "";
      const new_role = action === "login" ? e.data.role : "anonym";
      dispatch(setUserInfoAction(new_name, new_role));
      console.log({ new_name, new_role });
    };

    if (window.addEventListener) {
      window.addEventListener("message", callback);
    } else {
      window.attachEvent("onmessage", callback);
    }
    return () => {
      if (window.addEventListener) {
        window.removeEventListener("message", callback);
      } else {
        window.detachEvent("onmessage", callback);
      }
    };
  }, [dispatch]);

  return (
    <>
      <nav className={styles.outer}>
        <div className={styles.inner}>
          <ul>
            {role === "anonym" && (
              <li>
                <Link to="/login" as={"/login"}>
                  <i className="fa fa-user-circle" aria-hidden="true"></i>&nbsp;
                  Login / Register
                </Link>
              </li>
            )}
            {role !== "anonym" && (
              <>
                <li>
                  <Link to="/manage" as={"/manage"}>
                    <span className={styles.userlink}>
                      <i className="fa fa-user-circle" aria-hidden="true"></i>{" "}
                      {name}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/logout" as={"/logout"}>
                    <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
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
