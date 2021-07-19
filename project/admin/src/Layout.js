import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { setTokenAction } from "redux/app/appActions";
import {
  checkLocalToken,
  validateToken,
  clearLocalToken,
} from "utils/appHelper";

function Layout(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const reduxToken = useSelector((state) => state.appReducer.token);

  if (!reduxToken) {
    const localToken = checkLocalToken();
    if (localToken) {
      const isLocalTokenValid = validateToken(localToken);
      if (isLocalTokenValid) {
        dispatch(setTokenAction(localToken));
      } else {
        clearLocalToken();
        history.push("/login");
        return null;
      }
    } else {
      history.push("/login");
      return null;
    }
  } else {
    validateToken(reduxToken).then((isTokenValid) => {
      if (!isTokenValid) {
        dispatch(setTokenAction(null));
        clearLocalToken();
        history.push("/login");
        return null;
      }
    });
  }

  return (
    <Container>
      <Row>
        <Col xs={12} md={2}>
          <Link to="/logout">logout</Link>
          <br />
          MESSAGES
          <br />
          ADVERTS
          <br />
        </Col>
        <Col xs={12} md={10}>
          {props.children}
        </Col>
      </Row>
    </Container>
  );
}

export default Layout;
