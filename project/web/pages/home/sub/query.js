import styles from "styles/home.module.scss";

export default function Query() {
  return (
    <div className={`${styles.outer} ${styles.querybg}`}>
      <div className={`${styles.inner} ${styles.query}`}>
        <div className={styles.queryinfo}>
          <div>
            <span>
              Why Linxbiz Is The Right Place For You To Find A Commercial
              Property
            </span>
            <hr />
            <span>
              <span>01.</span>
              <br />
              Honest
              <br />
              <span>Honest agency in businesses for sale marketplace</span>
            </span>
            <hr />
            <span>
              <span>02.</span>
              <br />
              Professional
              <br />
              <span>Professional team members in the field</span>
            </span>
          </div>
          <div>
            <span>
              <span>03.</span>
              <br />
              Wide Network
              <br />
              <span>We offer you our wide network</span>
            </span>
            <hr />
            <span>
              <span>04.</span>
              <br />
              Hassle-Free Platform
              <br />
              <span>
                Fast, easy, and online support whenever you want while using our
                seamless platform
              </span>
            </span>
            <hr />
          </div>
        </div>
        <div className={styles.queryform}>
          <h1>queryform</h1>
        </div>
      </div>
    </div>
  );
}
