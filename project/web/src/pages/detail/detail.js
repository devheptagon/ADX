import styles from "styles/home.module.scss";
import moment from "moment";
import ReactTooltip from "react-tooltip";
import Slide from "./sub/slide";
import Loading from "pages/shared/loading";

export default function Detail(props) {
  const { data } = props;
  console.log(data);
  const sellerInfo = data?.seller?.split("|") || ["", "", ""];
  return data ? (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div className={styles.detail}>
          <h1>{data.title}</h1>
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
                  <b>Sectors:</b> {data.sectors.map((s) => s.title).join(",")}
                </td>
                <td>
                  <b>Area:</b> {data.area}
                </td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <b>Freehold price </b>£{data.freeHoldPrice}
                </td>
                <td>
                  <b>Leashold price </b>£{data.leaseHoldPrice}
                </td>
                <td>
                  <b>Annual rent </b>£{data.annualRent}
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
                  <b>Tags:</b> {data.tags.map((s) => s.title).join(",")}
                </td>
              </tr>
            </tbody>
          </table>
          <Slide data={data.images} />
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
