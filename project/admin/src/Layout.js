import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styles from "styles/app.module.scss";

function Layout(props) {
  const history = useHistory();
  const authed = useSelector((state) => state.appReducer.authed);
  const messages = useSelector((state) => state.appReducer.messages);
  const id = useSelector((state) => state.appReducer.id);
  const role = useSelector((state) => state.appReducer.role);
  const admin = role === "admin";
  const seller = role === "seller";
  const guest = role === "guest";
  const unread = messages?.filter(
    (m) => m.receiver?.toLowerCase() == id?.toLowerCase() && !m.seen
  );

  if (!authed) {
    history.push("home" + history.location.search); //home not login, home checks for local token and redirects to login if necessary
    return null;
  }

  const createLink = (path, title) => {
    if (path !== "messages") {
      return (
        <li>
          <Link to={`/${path}`}>{title}</Link>
        </li>
      );
    }
    return (
      <>
        <li id="parent">Messages</li>
        <li id="child">
          <Link to="/inbox">
            ✉ Inbox {unread?.length ? `(${unread.length} new)` : ""}
          </Link>
        </li>
        <li id="child">
          <Link to="/sent">↗ Sent</Link>
        </li>
      </>
    );
  };

  return (
    <Container>
      <Row>
        <Col xs={12} md={4}>
          <ul className={styles.left_menu}>
            {admin && (
              <>
                {createLink("profile", "My Profile")}
                {createLink("adverts", "Adverts")}
                {createLink("sectors", "Sectors")}
                {createLink("tags", "Keywords")}
                {createLink("sellers", "Sellers")}
                {createLink("enquiries", "Eval Requests")}
                {createLink("contents", "Parameters")}
                {createLink("messages")}
                {createLink("logout", "Log Out")}
              </>
            )}
            {seller && (
              <>
                {createLink("profile", "My Profile")}
                {createLink("adverts", "Adverts")}
                {createLink("messages")}
                {createLink("logout", "Log Out")}
              </>
            )}
            {guest && (
              <>
                {createLink("profile", "My Profile")}
                {createLink("messages")}
                {createLink("logout", "Log Out")}
              </>
            )}
          </ul>
        </Col>
        <Col xs={12} md={8}>
          {guest && history.location.pathname !== "/upgrade" && (
            <Link to="/upgrade">
              <img
                src="seller.png"
                alt="banner"
                className={styles.seller_banner}
              />
            </Link>
          )}
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
