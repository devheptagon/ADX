import styles from "styles/home.module.scss";
import moment from "moment";
/* import ReactTooltip from "react-tooltip"; */
import Slide from "./sub/slide";
import Loading from "pages/shared/loading";
import { formatter } from "helpers/genericHelper";

/* 
annualProfit: ""
annualTurnover: ""
monthlyProfit: ""
monthlyTurnover: ""
weeklyProfit: ""
weeklyTurnover: "" 

areas: "Aberdare"
city: ""
county: ""
create_date: "13/07/2021 18:48:01"
description: ""
freeHoldPrice: "50"
id: "f90023fa-8410-424b-8cc4-e35c9380e03f"
images: "20210714154426.jpg"
leaseHoldPrice: ""
line1: ""
line2: ""

postcode: ""
region: ""
sectors: "sector1,sector2"
seller: {id: null, fullname: "top seller2", email: "", phone: "", avatar: "", …}
seller_id: "89c47282-8432-46aa-a2e0-cee5029c7f0f"
status: ""
tags: "tag3"
tenures: "Freehold"
title: "test1"

*/

export default function Detail(props) {
  const { data } = props;
  const seller = data?.seller || {};
  return data ? (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div className={styles.detail}>
          <h1>{data.title}</h1>
          <Slide data={data.images ? data.images.split(",") : []} />
          <table>
            <tbody>
              <tr>
                <td>
                  <b>Added:</b> {moment(data._createdAt).format("DD/MM/yyyy")}
                </td>
                <td>
                  <b>Status:</b> {data.advertStatus || "N/A"}
                </td>
                <td>
                  <b>Tenures:</b> {data.tenures || "N/A"}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Sectors:</b> {data.sectors || "N/A"}
                </td>
                <td>
                  <b>Area:</b> {data.areas || "N/A"}
                </td>
                <td>
                  <b>Keywords:</b> {data.tags || "N/A"}
                </td>
              </tr>

              <tr>
                <td colSpan={3}>
                  <b>Address:</b>{" "}
                  {(data.location?.line1 || "") +
                    " " +
                    (data.location?.line2 || "") +
                    " " +
                    (data.location?.city || "") +
                    " " +
                    (data.location?.county || "") +
                    " " +
                    (data.location?.postcode || "")}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Freehold price: </b>
                  {data.freeHoldPrice
                    ? formatter.format(data.freeHoldPrice || 0)
                    : "N/A"}
                </td>
                <td>
                  <b>Leashold price: </b>
                  {data.leaseHoldPrice
                    ? formatter.format(data.leaseHoldPrice || 0)
                    : "N/A"}
                </td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <b>Weekly Profit: </b>
                  {data.weeklyProfit
                    ? formatter.format(data.weeklyProfit || 0)
                    : "N/A"}
                </td>
                <td>
                  <b>Monthly Profit: </b>
                  {data.monthlyProfit
                    ? formatter.format(data.monthlyProfit || 0)
                    : "N/A"}
                </td>
                <td>
                  <b>Annual Profit: </b>
                  {data.annualProfit
                    ? formatter.format(data.annualProfit || 0)
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Weekly Turnover: </b>
                  {data.weeklyTurnover
                    ? formatter.format(data.weeklyTurnover || 0)
                    : "N/A"}
                </td>
                <td>
                  <b>Monthly Turnover: </b>
                  {data.monthlyTurnover
                    ? formatter.format(data.monthlyTurnover || 0)
                    : "N/A"}
                </td>
                <td>
                  <b>Annual Turnover: </b>
                  {data.annualTurnover
                    ? formatter.format(data.annualTurnover || 0)
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td colSpan={3}>
                  <b>Seller:</b> {seller.fullname} (
                  {`${seller.email} / ${seller.phone}`})
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <div dangerouslySetInnerHTML={{ __html: data.description }} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
