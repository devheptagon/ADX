import { useHistory } from "react-router-dom";
import { registerEP } from "integration/endpoints/auth";
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
              password: "",
              fullname: "",
            }}
            validationSchema={yup.object().shape({
              email: yup.string().required().email(),
              password: yup.string().required().min(4).max(20),
              fullname: yup.string(),
            })}
            onSubmit={async (
              values,
              { setSubmitting, setStatus, resetForm }
            ) => {
              setSubmitting(true);
              await registerEP(values.email, values.password, values.fullname);
              setSubmitting(false);
              alert("Registration successful!");
              history.replace("/login");
              setStatus({ success: true });
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
                            Password:
                            <br />
                            <input
                              type="password"
                              onChange={handleChange}
                              name="password"
                              id="password"
                              placeholder="Password"
                              title="* password"
                              value={values.password}
                            />
                            <span data-id="error">{errors.password}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Full name:
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
                              Save
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="/login">Login</a>
                            <br />
                            <a href="/forgot">Forgot password</a>
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
