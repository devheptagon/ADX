import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import {
  setTokenAction,
  setSectorsAction,
  setFirstLoadAction,
  setTagsAction,
} from "redux/app/appActions";
import {
  checkLocalToken,
  validateToken,
  clearLocalToken,
} from "utils/appHelper";
import styles from "styles/app.module.scss";
import { getSectorsEP } from "integration/endpoints/sector";
import { getTagsEP } from "integration/endpoints/tag";

function Layout(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const reduxToken = useSelector((state) => state.appReducer.token);
  const firstLoad = useSelector((state) => state.appReducer.firstLoad);
  const messages = useSelector((state) => state.appReducer.messages);
  const id = useSelector((state) => state.appReducer.id);
  const role = useSelector((state) => state.appReducer.role);
  const admin = role === "admin";
  const unread = messages.filter(
    (m) => m.receiver?.toLowerCase() == id?.toLowerCase() && !m.seen
  );

  useEffect(() => {
    if (firstLoad) {
      dispatch(setFirstLoadAction(false));
      getSectorsEP().then((d) => dispatch(setSectorsAction(d)));
      getTagsEP().then((d) => dispatch(setTagsAction(d)));
    }
  }, [dispatch, firstLoad]);

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
        <Col xs={12} md={3}>
          <ul className={styles.left_menu}>
            {admin ? (
              <>
                <li>
                  <Link to="/logout">LOG OUT</Link>
                </li>
                <li>
                  <Link to="/profile">My Profile</Link>
                </li>
                <li>
                  <Link to="/adverts">Adverts</Link>
                </li>
                <li>
                  <Link to="/sectors">Sectors</Link>
                </li>
                <li>
                  <Link to="/tags">Keywords</Link>
                </li>
                <li>
                  <Link to="/sellers">Sellers</Link>
                </li>
                <li>
                  <Link to="/enquiries">Eval Requests</Link>
                </li>
                <li>
                  <Link to="/contents">Parameters</Link>
                </li>
                <li id="parent">Messages</li>
                <li id="child">
                  <Link to="/inbox">✉ Inbox ({unread.length})</Link>
                </li>
                <li id="child">
                  <Link to="/sent">↗ Sent</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/logout">LOG OUT</Link>
                </li>
                <li>
                  <Link to="/profile">My Profile</Link>
                </li>
                <li>
                  <Link to="/adverts">Adverts</Link>
                </li>
                <li id="parent">Messages</li>
                <li id="child">
                  <Link to="/inbox">✉ Inbox ({unread.length})</Link>
                </li>
                <li id="child">
                  <Link to="/sent">↗ Sent</Link>
                </li>
              </>
            )}
          </ul>
        </Col>
        <Col xs={12} md={9}>
          <br />
          {props.children}
          <br />
          <br />
        </Col>
      </Row>
    </Container>
  );
}

export default Layout;
