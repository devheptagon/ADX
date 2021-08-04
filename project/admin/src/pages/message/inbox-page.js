import Layout from "Layout";
import MessageList from "./message-list";
import styles from "styles/app.module.scss";
import React, { useEffect, useState } from "react";
import {
  getMessagesEP,
  updateMessageSeenEP,
} from "integration/endpoints/message";
import { useDispatch, useSelector } from "react-redux";
import { setMessagesAction } from "redux/app/appActions";

export default function InboxPage() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const userId = useSelector((state) => state.appReducer.id);

  useEffect(() => {
    getMessagesEP().then((res) => {
      setData(res?.filter((m) => m.receiver == userId));
      dispatch(setMessagesAction(res));
      updateMessageSeenEP();
    });
  }, [userId, dispatch]);

  return (
    <Layout>
      <div className={styles.message}>
        <h2>Inbox</h2>
        <MessageList data={data || []} inbox={true} />
      </div>
    </Layout>
  );
}
