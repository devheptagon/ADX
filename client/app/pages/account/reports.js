import {AccountLeftPanel, Container} from 'components'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Reports = () => {
  return (
    <Container>
      <main>
        <Row>
          <Col lg={3}>
            <AccountLeftPanel />
          </Col>
          <Col lg={9}>
          
          </Col>
        </Row>
      </main>
      <style jsx>{`
        main {
          padding: 0;
          display: flex;
          flex: 1;
          flex-direction: column;
        }
      `}</style>
    </Container>
  )
}

export default Reports;
