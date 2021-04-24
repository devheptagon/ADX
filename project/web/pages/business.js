import React from "react";
import Layout from "./layout";
import Business from "pages/business/business";
import AppContext from "store/context";

export default function Index() {
  const context = React.useContext(AppContext);
  return (
    <Layout>
      <Business />
    </Layout>
  );
}
