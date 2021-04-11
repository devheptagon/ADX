import styles from "styles/home.module.scss";
import Link from "next/link";
import SocialMediaIcons from "./socialmedialist";

export default function Header() {
  return (
    <>
      <nav className={styles.outer}>
        <div className={styles.inner}>
          <div className={styles.brand}>
            <Link href="/" as={"/"}>
              <img src="./logo.png" alt="logo" />
            </Link>
            <div className={styles.contact}>
              <ul>
                <li>
                  <i className="fa fa-phone" aria-hidden="true"></i>
                </li>
                <li>
                  <div>01633-216899</div>
                  <div>
                    <a href="mailto:info@linxbiz.com">info@linxbiz.com</a>
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
              <Link href="/" as={"/"}>
                HOME
              </Link>
            </li>
            <li>
              <Link href="/business" as={"/business"}>
                BUSINESS
              </Link>
            </li>
            <li>
              <Link href="/about" as={"/about"}>
                ABOUT
              </Link>
            </li>
            <li>
              <Link href="/contact" as={"/contact"}>
                CONTACT
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
