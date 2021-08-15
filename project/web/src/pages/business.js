import React from "react";
import Layout from "./layout";
import Business from "pages/business/business";
import { useLocation, useHistory } from "react-router-dom";
import { useQuery } from "helpers/genericHelper";
import { useDispatch } from "react-redux";
import {
  setAreaFilterAction,
  setSectorFilterAction,
} from "redux/app/appActions";

export default function Index() {
  const history = useHistory();
  const query = useQuery(useLocation());
  const hasParams = query.get("p") === "true";
  const dispatch = useDispatch();

  if (hasParams) {
    const sectors = query.get("s");
    if (sectors) {
      const sectorFilter = decodeURIComponent(sectors)
        .split(",")
        .map((s) => ({ label: s.split("|")[0], value: s.split("|")[1] }));
      dispatch(setSectorFilterAction(sectorFilter));
    }
    const areas = query.get("a");
    if (areas) {
      const areaFilter = decodeURIComponent(areas)
        .split(",")
        .map((a) => ({ label: a, value: a }));
      dispatch(setAreaFilterAction(areaFilter));
    }

    history.replace("/business");
  }

  return (
    <Layout>
      <Business />
    </Layout>
  );
}
