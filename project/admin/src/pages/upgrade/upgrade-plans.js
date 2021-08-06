import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/app.module.scss";

export default function UpgradePlans(props) {
  const { index, onSelect } = props;

  return (
    <Container>
      <Row>
        <Col xs={12} lg={4}>
          <div
            className={`${styles.plan} ${
              index == 0 ? styles.selectedplan : ""
            }`}
          >
            <h1>
              1 <h6>month</h6>
            </h1>
            <br />
            for <h3>£6.99</h3>
            <br />
            <br />
            <button onClick={onSelect} data-id="0">
              Select
            </button>
          </div>
        </Col>
        <Col xs={12} lg={4}>
          <div
            className={`${styles.plan} ${
              index == 1 ? styles.selectedplan : ""
            }`}
          >
            <h1>
              6 <h6>months</h6>
            </h1>
            <br />
            for <h3>£34.99</h3>
            <br />
            <br />
            <button onClick={onSelect} data-id="1">
              Select
            </button>
          </div>
        </Col>
        <Col xs={12} lg={4}>
          <div
            className={`${styles.plan} ${
              index == 2 ? styles.selectedplan : ""
            }`}
          >
            <h1>
              12 <h6>months</h6>
            </h1>
            <br />
            for <h3>£69.99</h3>
            <br />
            <br />
            <button onClick={onSelect} data-id="2">
              Select
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
