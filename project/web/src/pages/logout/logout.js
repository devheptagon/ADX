import { adminUrl } from "config";
import styles from "styles/home.module.scss";

export default function AdminFrame() {
  return (
    <iframe
      frameBorder="0"
      scrolling="yes"
      marginHeight="0"
      marginWidth="0"
      height="1000"
      width="100%"
      src={adminUrl + "logout"}
      title="panel"
    ></iframe>
  );
}
