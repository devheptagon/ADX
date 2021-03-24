import styles from "styles/home.module.scss";
import SocialMediaIcons from "./socialmedialist";

export default function Contact() {
  return (
    <footer className={styles.footer}>
      <div className={styles.firstrow}>
        <div className={styles.outer}>
          <div className={styles.inner}>
            <div className={styles.discover}>
              <div>
                <h2>Discover</h2>
              </div>
              <div>&gt; Home</div>
              <div>&gt; Terms & Privacy</div>
              <div>&gt; About</div>
            </div>
            <div />
            <div className={styles.contactus}>
              <div>
                <h2>Contact Us</h2>
              </div>
              <div>
                <span>
                  <i className="fa fa-map-marker" aria-hidden="true"></i>68
                  Bridge Street, Newport, NP20 4AQ
                </span>
              </div>
              <div>
                <span>
                  <i className="fa fa-phone" aria-hidden="true"></i>01633-216899
                </span>
              </div>
              <div>
                <span>
                  <i className="fa fa-envelope-o" aria-hidden="true"></i>
                  info@linxbiz.com
                </span>
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
              <img src="./logo.png" alt="logo" />
              <ul>
                <SocialMediaIcons />
              </ul>
              <div>
                © Linxbiz - All rights reserved - Created by Colourful Planets
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
