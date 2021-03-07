import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useRouter} from  'next/router'
import {editUser, logout} from 'redux/actions/user'
import {AccountLeftPanel, Container} from 'components'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


const Myaccount = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {currentUser} = useSelector(state => state.users);
  const [firstName, setFirstName] = useState(currentUser?.firstName || '');
  const [surname, setSurname] = useState(currentUser?.lastName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [isEditable, setEditable] = useState(false);

  const editHandler = event => {
    event.preventDefault();
    setEditable(true)
  };
  const saveHandler = event => {
    event.preventDefault();
    dispatch(editUser(currentUser?.userID, {
      ...currentUser,
      firstName: firstName,
      lastName: surname,
      email: email,
      phone: phone,
    }));
    setEditable(false);
    dispatch(logout())
    router.reload('/account/login');
  };
  const cancelHandler = event => {
    event.preventDefault();
    setFirstName(currentUser?.firstName);
    setSurname(currentUser?.lastName);
    setEmail(currentUser?.email);
    setPhone(currentUser?.phone);
    setEditable(false);
  }
  return (
    <Container>
      <main>
        <Row>
          <Col lg={3}>
            <AccountLeftPanel />
          </Col>
          <Col lg={9}>
            <Form className="my-3 mr-3 ml-0">
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
                  style={{minWidth: 420}}
                  type="text"
                  placeholder="First Name *"
                  defaultValue={firstName}
                  disabled={!isEditable}
                  onChange={e => setFirstName(e.target.value.trim())} />
              </Form.Group>
              <Form.Group controlId="formSurname">
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  required
                  style={{minWidth: 420}}
                  type="text"
                  placeholder="Surname *"
                  defaultValue={surname}
                  disabled={!isEditable}
                  onChange={e => setSurname(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  required
                  style={{minWidth: 420}}
                  type="email"
                  placeholder="Email Address *"
                  defaultValue={email}
                  disabled={!isEditable}
                  onChange={e => setEmail(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  style={{minWidth: 420}}
                  type="number"
                  placeholder="Phone Number *"
                  defaultValue={phone}
                  disabled={!isEditable}
                  onChange={e => setPhone(e.target.value)} />
              </Form.Group>
              <Row>
                {
                  isEditable ?
                  <>
                    <Col>
                      <Button variant="Light" type="submit" onClick={cancelHandler}>
                        Cancel
                      </Button>
                    </Col>
                    <Col>
                      <Button variant="primary" type="submit" onClick={saveHandler}>
                        Save
                      </Button>
                    </Col>
                  </>
                  :
                  <Col>
                    <Button variant="secondary" type="submit" onClick={editHandler}>
                      Edit
                    </Button>
                  </Col>
                }
              </Row>
            </Form>
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

export default Myaccount;