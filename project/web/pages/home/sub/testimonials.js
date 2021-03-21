import styles from "styles/home.module.scss";

export default function Testimonials() {
  return (
    <div className={`${styles.outer} ${styles["testimonials-bg"]}`}>
      <div className={styles.inner}>
        <div className={styles.testimonials}>
          <div className={styles.title}>
            <h1>Testimonials</h1>
          </div>
          <div className={styles.people}>
            <div>
              <span>
                <i className="fa fa fa-quote-left"></i>
                <i className="fa fa fa-quote-right"></i>
              </span>
              <span>
                Linxbiz offers the best options at the most reasonable prices. I
                can say that it is a full price/performance agency. Click now
                without thinking more.
              </span>
              <div className={styles.row}>
                <img src="testimonial1.jpg" alt="testimonial1" />
                <span>
                  by Roy Bennett
                  <br />
                  Manager, Company Inc.
                </span>
              </div>
            </div>
            <div>
              <span>
                <i className="fa fa fa-quote-left"></i>
                <i className="fa fa fa-quote-right"></i>
              </span>
              <span>
                I have tried various manual methods to manage my real estate
                investments. However, it was very tiring and took a lot of time.
                Therefore my main responsibilities were disrupted. Linxbiz
                offered me a service that benefited both me, as the real estate
                owner and the buyer. So I was self-assured entrusting my
                property to them. Thank you, Linxbiz team!
              </span>
              <div className={styles.row}>
                <img src="testimonial2.jpg" alt="testimonial2" />
                <span>
                  by Kenya Soval
                  <br />
                  Realtor, Company Inc.
                </span>
              </div>
            </div>
            <div>
              <span>
                <i className="fa fa fa-quote-left"></i>
                <i className="fa fa fa-quote-right"></i>
              </span>
              <span>
                Everyone knows the problems in the real estate sector. The
                biggest problem is "mutual trust"; especially when it is online.
                My favourite feature on this website is transparency. Also, the
                prices are reasonable. I want to say good luck to Linxbiz and
                "always stay like this.
              </span>
              <div className={styles.row}>
                <img src="testimonial3.jpg" alt="testimonial3" />
                <span>
                  by Kathleen Peterson
                  <br />
                  Manager, Company Inc.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
