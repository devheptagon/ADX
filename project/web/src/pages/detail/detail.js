import styles from "styles/home.module.scss";
import moment from "moment";
import ReactTooltip from "react-tooltip";
import BlockContent from "@sanity/block-content-to-react";
import Slide from "./sub/slide";
import Loading from "pages/shared/loading";
import { formatter } from "helpers/genericHelper";

const serializers = {
  types: {
    undefined: (props) => null,
  },
};

export default function Detail(props) {
  const { data } = props;
  const sellerInfo = data?.seller?.split("|") || ["", "", ""];
  return data ? (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div className={styles.detail}>
          <h1>{data.title}</h1>
          <Slide data={data.images} />
          <table>
            <tbody>
              <tr>
                <td>
                  <b>Added:</b> {moment(data._createdAt).format("DD/MM/yyyy")}
                </td>
                <td>
                  <b>Status:</b> {data.advertStatus}
                </td>
                <td>
                  <div
                    tooltip={sellerInfo[1]}
                    data-tip={`${sellerInfo[1]} / ${sellerInfo[2]}`}
                  >
                    <b>Seller:</b> {sellerInfo[0]}
                  </div>
                  <ReactTooltip />
                </td>
              </tr>
              <tr>
                <td>
                  <b>Sectors:</b> {data.sectors?.map((s) => s.title).join(",")}
                </td>
                <td>
                  <b>Area:</b> {data.area}
                </td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <b>Freehold price </b>
                  {data.freeHoldPrice &&
                    formatter.format(data.freeHoldPrice || 0)}
                </td>
                <td>
                  <b>Leashold price </b>
                  {data.leaseHoldPrice &&
                    formatter.format(data.leaseHoldPrice || 0)}
                </td>
                <td>
                  <b>Annual rent </b>
                  {data.annualRent && formatter.format(data.annualRent || 0)}
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
                <td colSpan="3">
                  <b>Tags:</b> {data.tags?.map((s) => s.title).join(",")}
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  {" "}
                  <BlockContent
                    blocks={data.description}
                    serializers={serializers}
                  />
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
