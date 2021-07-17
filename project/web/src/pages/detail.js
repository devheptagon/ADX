import { getAdvert } from "api/api";
import { useQuery } from "helpers/genericHelper";
import React from "react";
import { useLocation } from "react-router-dom";
import Detail from "./detail/detail";
import Layout from "./layout";

export default function Index() {
  const query = useQuery(useLocation());
  const id = query.get("id");
  const [data, setData] = React.useState();

  React.useEffect(() => {
    getAdvert(id).then((res) => setData(res));
  }, [id]);
  return (
    <Layout>
      <Detail data={data && data.length ? data[0] : null} />
    </Layout>
  );
}
