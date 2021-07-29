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
  setSellersAction,
} from "redux/app/appActions";
import {
  checkLocalToken,
  validateToken,
  clearLocalToken,
} from "utils/appHelper";
import styles from "styles/app.module.scss";
import { getSectorsEP } from "integration/endpoints/sector";
import { getTagsEP } from "integration/endpoints/tag";
import { getSellersEP } from "integration/endpoints/seller";

function Layout(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const reduxToken = useSelector((state) => state.appReducer.token);
  const firstLoad = useSelector((state) => state.appReducer.firstLoad);

  useEffect(() => {
    if (firstLoad) {
      dispatch(setFirstLoadAction(false));
      getSectorsEP().then((d) => dispatch(setSectorsAction(d)));
      getTagsEP().then((d) => dispatch(setTagsAction(d)));
      getSellersEP().then((d) => dispatch(setSellersAction(d)));
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
        <Col xs={12} md={2}>
          <ul className={styles.left_menu}>
            <li>
              <Link to="/logout">LOG OUT</Link>
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
              <Link to="/contents">Contents</Link>
            </li>
            <li>
              <Link to="/sellers">Sellers</Link>
            </li>
          </ul>
        </Col>
        <Col xs={12} md={10}>
          {props.children}
        </Col>
      </Row>
    </Container>
  );
}

export default Layout;
