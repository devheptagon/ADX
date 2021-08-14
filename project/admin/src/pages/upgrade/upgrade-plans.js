import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/app.module.scss";

export default function UpgradePlans(props) {
  const { options, index, onSelect } = props;

  return (
    <Container>
      <Row>
        {options.map((op, opIndex) => (
          <Col xs={12} lg={4} key={opIndex}>
            <div
              className={`${styles.plan} ${
                index === opIndex ? styles.selectedplan : ""
              }`}
            >
              <h1>
                {op.duration} <span>month(s)</span>
              </h1>
              <br />

              <h3>{op.amount}</h3>
              <br />
              <br />
              <button onClick={onSelect} data-index={opIndex}>
                Select
              </button>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
