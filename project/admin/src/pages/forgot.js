import { useHistory } from "react-router-dom";
import { forgotEP } from "integration/endpoints/auth";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/app.module.scss";
import { Formik } from "formik";
import * as yup from "yup";

export default function Login() {
  const history = useHistory();
  return (
    <Container>
      <Row className={styles.loginWrapper}>
        <Col xs={12} md={3}>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={yup.object().shape({
              email: yup.string().required().email(),
            })}
            onSubmit={async (
              values,
              { setSubmitting, setStatus, resetForm }
            ) => {
              setSubmitting(true);
              await forgotEP(values.email);
              setSubmitting(false);
              setStatus({ success: true });
              alert("Your temporary password is sent to your email!");
              history.push("/login");
            }}
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
                  <div className={styles.login}>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            Email:
                            <br />
                            <input
                              type="text"
                              onChange={handleChange}
                              name="email"
                              id="email"
                              placeholder="Email"
                              title="* email"
                              value={values.email}
                            />
                            <span data-id="error">{errors.email}</span>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <button
                              data-id="save"
                              type="submit"
                              disabled={
                                isSubmitting ||
                                !dirty ||
                                Object.keys(errors).length
                              }
                            >
                              Submit
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="/login">Login</a>
                            <br />
                            <a href="/register">Register</a>
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
