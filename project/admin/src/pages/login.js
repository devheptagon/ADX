/* eslint-disable no-restricted-globals */
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setUserAction,
  setSellersAction,
  setMessagesAction,
} from "redux/app/appActions";
import { loginEP } from "integration/endpoints/auth";
import { getSellersEP } from "integration/endpoints/user";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/app.module.scss";
import { Formik } from "formik";
import * as yup from "yup";
import { getMessagesEP } from "integration/endpoints/message";
import { postParentMessage, setLocalToken } from "utils/appHelper";

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const loginUser = async (email, password) => {
    const user = await loginEP(email, password);
    if (!user || !user.token) return false;
    postParentMessage(user);

    setLocalToken(user.token);
    dispatch(setUserAction(user));

    const sellers = await getSellersEP();
    dispatch(setSellersAction(sellers));
    const messages = await getMessagesEP();
    dispatch(setMessagesAction(messages));
    return true;
  };

  return (
    <Container>
      <Row className={styles.loginWrapper}>
        <Col xs={12} md={3}>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={yup.object().shape({
              email: yup.string().required().email(),
              password: yup.string().required().min(4).max(20),
            })}
            onSubmit={async (
              values,
              { setSubmitting, setStatus, resetForm }
            ) => {
              setSubmitting(true);
              var isLoggedIn = await loginUser(values.email, values.password);
              setSubmitting(false);
              if (isLoggedIn) history.push("home" + history.location.search);
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
                            <a href="/forgot">Forgot password</a>
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
