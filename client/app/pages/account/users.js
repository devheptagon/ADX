import {AccountLeftPanel, UserList, Container} from 'components'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Users = () => {
  const editHandler = () => {}
  return (
    <Container>
      <main>
        <Row>
          <Col lg={3}>
            <AccountLeftPanel />
          </Col>
          <Col lg={9}>
            <UserList className="my-3 mr-3 ml-0" onEdit={editHandler} />
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

export default Users;