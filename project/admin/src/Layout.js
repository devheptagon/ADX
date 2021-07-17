import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  return (
    <Container
      fluid
      style={{
        backgroundColor: "red",
        minHeight: 1000,
      }}
    >
      <Row>
        <Col>LINXBIZ Admin Panel</Col>
      </Row>
    </Container>
  );
}

export default App;
