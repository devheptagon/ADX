import { useRouter } from "next/router";
import Layout from "./layout";

export default function Index() {
  const { query } = useRouter();

  return <Layout>here is the details {query.detail}</Layout>;
}
