import Layout from "Layout";
import MessageList from "./message-list";
import styles from "styles/app.module.scss";
import React, { useEffect, useState } from "react";
import { getMessagesEP } from "integration/endpoints/message";
import { useSelector } from "react-redux";

export default function SentPage() {
  const [data, setData] = useState([]);
  const userId = useSelector((state) => state.appReducer.id);

  useEffect(() => {
    getMessagesEP().then((res) => {
      setData(res?.filter((m) => m.sender == userId));
    });
  }, [userId]);

  return (
    <Layout>
      <div className={styles.message}>
        <h2>Sent</h2>
        <MessageList data={data || []} inbox={false} />
      </div>
    </Layout>
  );
}
