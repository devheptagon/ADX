import { adminUrl } from "config";
import styles from "styles/home.module.scss";

export default function AdminFrame() {
  return (
    <iframe
      frameBorder="0"
      scrolling="no"
      marginHeight="0"
      marginWidth="0"
      height="500"
      width="100%"
      src={adminUrl + "login"}
      title="panel"
    ></iframe>
  );
}
