import styles from "styles/home.module.scss";
import moment from "moment";
import ReactTooltip from "react-tooltip";
import Slide from "./sub/slide";
import Loading from "pages/shared/loading";
import { formatter } from "helpers/genericHelper";

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
                  <b>Status:</b> {data.advertStatus}
                </td>
                <td>
                  <div
                    tooltip={seller.fullname}
                    data-tip={`${seller.email} / ${seller.phone}`}
                  >
                    <b>Seller:</b> {seller.fullname}
                  </div>
                  <ReactTooltip />
                </td>
              </tr>
              <tr>
                <td>
                  <b>Sectors:</b> {data.sectors}
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
                  <b>Tags:</b> {data.tags}
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
