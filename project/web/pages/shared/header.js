import styles from "styles/home.module.scss";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <nav className={styles.outer}>
        <div className={styles.inner}>
          <div className={styles.brand}>
            <img src="./logo.png" alt="logo" />
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
        </div>
      </nav>
      <nav className={styles.outer}>
        <div className={styles.inner}>
          <ul>
            <li>
              <Link href=".">HOME</Link>
            </li>
            <li>BUSINESS</li>
            <li>ABOUT</li>
            <li>
              <Link href="contact">CONTACT</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
