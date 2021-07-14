import React from "react";
import { getPrivacy } from "api/api2";
import styles from "styles/home.module.scss";
import BlockContent from "@sanity/block-content-to-react";

export default function About() {
  const [data, setData] = React.useState({});
  React.useEffect(() => {
    getPrivacy().then((res) => {
      setData(res);
    });
  }, []);

  const serializers = {
    types: {
      undefined: (props) => null,
    },
  };

  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div className={styles.about}>
          <BlockContent blocks={data} serializers={serializers} />
        </div>
      </div>
    </div>
  );
}
