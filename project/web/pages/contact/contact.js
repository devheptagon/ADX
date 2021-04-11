import styles from "styles/home.module.scss";

export default function Contact() {
  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <br />
        <br />
        <iframe
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          height="400"
          width="100%"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2478.930146426462!2d-3.000726684072756!3d51.587843612639055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4871e6ceb7dfbe4f%3A0x79d123e8735144de!2s68%20Bridge%20St%2C%20Baneswell%2C%20Newport%20NP20%204AQ!5e0!3m2!1sen!2suk!4v1618170009588!5m2!1sen!2suk"
          title="68 Bridge Street, Newport, NP20 4AQ"
          aria-label="68 Bridge Street, Newport, NP20 4AQ"
        ></iframe>
        <br />
        <br />
      </div>
    </div>
  );
}
