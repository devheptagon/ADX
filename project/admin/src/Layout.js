import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import styles from "styles/app.module.scss";

function Layout(props) {
  const history = useHistory();
  const authed = useSelector((state) => state.appReducer.authed);
  const messages = useSelector((state) => state.appReducer.messages);
  const id = useSelector((state) => state.appReducer.id);
  const role = useSelector((state) => state.appReducer.role);
  const admin = role === "admin";
  const unread = messages?.filter(
    (m) => m.receiver?.toLowerCase() == id?.toLowerCase() && !m.seen
  );

  if (!authed) {
    history.push("/home"); //home not login, home checks for local token and redirects to login if necessary
    return null;
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
                  <Link to="/inbox">✉ Inbox ({unread?.length})</Link>
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
                  <Link to="/inbox">✉ Inbox ({unread?.length})</Link>
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
