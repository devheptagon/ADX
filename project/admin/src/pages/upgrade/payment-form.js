import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/app.module.scss";
import { Formik } from "formik";
import * as yup from "yup";

export default function PaymentForm(props) {
  const { amount, duration, submit } = props;
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <br />
          <h4>Payment Details</h4>
          <Formik
            initialValues={{
              fullname: "",
              cardno: "",
              exp_month: "",
              exp_year: "",
              cvv: "",
              confirmed: false,
            }}
            validationSchema={yup.object().shape({
              fullname: yup.string().required(),
              cardno: yup.number().required(),
              exp_month: yup.number().required().min(1).max(12),
              exp_year: yup.number().required().min(21).max(30),
              cvv: yup.number().required().min(0).max(9999),
              confirmed: yup.bool().oneOf([true], "Field must be checked"),
            })}
            onSubmit={submit}
          >
            {(props) => {
              const {
                values,
                //touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleSubmit,
              } = props;
              return (
                <form onSubmit={handleSubmit}>
                  <div className={styles.payment}>
                    <table id="paymentform">
                      <tbody>
                        <tr>
                          <td>
                            <label>Amount:</label> {amount}
                          </td>
                          <td>
                            <label>Duration:</label> {duration} month(s)
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={2}>
                            <label>Full name:</label>
                            <br />
                            <input
                              type="text"
                              onChange={handleChange}
                              name="fullname"
                              id="fullname"
                              placeholder="Full name"
                              title="* Fullname"
                              value={values.fullname}
                            />
                            <span data-id="error">{errors.fullname}</span>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={2}>
                            <label>Card number:</label>
                            <br />
                            <input
                              type="number"
                              onChange={handleChange}
                              name="cardno"
                              id="cardno"
                              placeholder="Card number"
                              title="* cardno"
                              value={values.cardno}
                            />
                            <span data-id="error">{errors.cardno}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label>Expiration date:</label>
                            <br />
                            <input
                              type="number"
                              onChange={handleChange}
                              name="exp_month"
                              id="exp_month"
                              placeholder="MM"
                              title="* Month"
                              value={values.exp_month}
                              min={1}
                              max={12}
                            />
                            &nbsp;
                            <input
                              type="number"
                              onChange={handleChange}
                              name="exp_year"
                              id="exp_year"
                              placeholder="YY"
                              title="* Year"
                              value={values.exp_year}
                              min={21}
                              max={29}
                            />
                          </td>
                          <td>
                            <label>CVV:</label>
                            <br />
                            <input
                              type="number"
                              onChange={handleChange}
                              name="cvv"
                              id="cvv"
                              placeholder="CVV"
                              title="* Cvv"
                              value={values.cvv}
                              min={0}
                              max={9999}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={2}>
                            <input
                              type="checkbox"
                              onChange={handleChange}
                              name="confirmed"
                              id="confirmed"
                              title="* confirmed"
                              value={values.confirmed}
                            />{" "}
                            I confirm to pay XXX for YYY month(s)
                            subscriptionship.
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={2}>
                            <button
                              data-id="save"
                              type="submit"
                              disabled={
                                isSubmitting ||
                                !dirty ||
                                Object.keys(errors).length
                              }
                            >
                              Save
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </form>
              );
            }}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}
