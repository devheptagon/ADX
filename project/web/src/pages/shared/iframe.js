import Layout from "../layout";
import { adminUrl } from "config";

export default function Iframe(props) {
  return (
    <Layout>
      <iframe
        frameBorder="0"
        scrolling="yes"
        marginHeight="0"
        marginWidth="0"
        height="1000"
        width="100%"
        src={adminUrl + props.target}
        title="panel"
      ></iframe>
    </Layout>
  );
}
