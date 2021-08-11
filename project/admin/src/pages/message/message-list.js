import React from "react";
import styles from "styles/app.module.scss";
import { Link } from "react-router-dom";

export default function MessageList(props) {
  const { inbox } = props;
  if (!props.data?.length)
    return (
      <div>
        <h6>no messages</h6>
      </div>
    );

  return (
    <table>
      <tbody>
        {props.data.map((m) => {
          const {
            id,
            advert_title,
            text,
            create_date,
            seen,
            receiver_name,
            sender,
            advert_id,
            sender_name,
          } = m;
          const classname = inbox && !seen ? "unseen" : "seen";
          return (
            <React.Fragment key={id}>
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
                <td>{inbox ? sender_name : receiver_name}</td>
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
              {inbox && (
                <tr className={styles[classname]}>
                  <td colSpan={2}>
                    <Link to={`/newmessage?sid=${sender}&aid=${advert_id}`}>
                      Reply
                    </Link>
                  </td>
                </tr>
              )}
              <tr className={styles.seperator}>
                <td colSpan={2}></td>
              </tr>
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
