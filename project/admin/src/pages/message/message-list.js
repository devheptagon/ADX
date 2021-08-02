import styles from "styles/app.module.scss";

export default function MessageList(props) {
  const { inbox } = props;
  return (
    <table>
      <tbody>
        {props.data.map((m) => {
          const { advert_title, text, create_date, seen } = m;
          const classname = inbox && !seen ? "unseen" : "seen";
          return (
            <>
              <tr className={styles[classname]}>
                <td>
                  <b>Date:</b>
                </td>
                <td>{create_date}</td>
              </tr>
              <tr className={styles[classname]}>
                <td>
                  <b>{inbox ? "From:" : "To:"}</b>
                </td>
                <td>{advert_title}</td>
              </tr>
              <tr className={styles[classname]}>
                <td>
                  <b>Advert:</b>
                </td>
                <td>{advert_title}</td>
              </tr>
              <tr className={styles[classname]}>
                <td colSpan={2}>{text}</td>
              </tr>
              <tr className={styles.seperator}>
                <td colSpan={2}></td>
              </tr>
            </>
          );
        })}
      </tbody>
    </table>
  );
}
