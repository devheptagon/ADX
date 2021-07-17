import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  const authed = false;
  return (
    <Container
      style={{
        backgroundColor: "red",
        minHeight: 1000,
      }}
    >
      {authed ? (
        <Row>
          <Col xs={12} md={2}>
            MESSAGES
            <br />
            ADVERTS
            <br />
          </Col>
          <Col xs={12} md={10}>
            LINXBIZ Admin Panel
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>Login here</Col>
        </Row>
      )}
    </Container>
  );
}

export default App;
