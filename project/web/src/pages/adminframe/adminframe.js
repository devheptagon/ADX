import styles from "styles/home.module.scss";

export default function AdminFrame() {
  return (
    <div style={{ backgroundColor: "pink" }}>
      this is admin
      <iframe
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        minHeight="100%"
        width="100%"
        src="http://localhost:3000"
        title="panel"
      ></iframe>
    </div>
  );
}
