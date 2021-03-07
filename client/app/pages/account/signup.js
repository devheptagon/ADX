import {useEffect, useState} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useDispatch, useSelector} from 'react-redux'
import {signup, setUserError} from 'redux/actions/user'
import {Container} from 'components'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

const Signup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {error, isLoading} = useSelector(state => state.users);
  const [firstName, setFirstName] = useState();
  const [surname, setSurname] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [repassword, setRePassword] = useState();
  const [_error, setError] = useState('');

  console.log('error, ', error);
  useEffect(() => {
    return () => {
      setFirstName('');
      setSurname('');
      setEmail('');
      setPassword('');
      setRePassword('');
      setPhone('');
      setError('');
      dispatch(setUserError(null));
    };
  }, []);

  const signupHandler = event => {
    event.preventDefault();
    if (firstName && surname && phone && email && password && repassword) {
      if(password === repassword){
        dispatch(signup({
            firstName: firstName,
            lastName: surname,
            password: password,
            email: email,
            phone: phone,
            role: "Editor"
        }));
        if (!error && !isLoading) {
          router.push('/account/login');
        }
      } else if (password !== repassword) {
        setError('Your passwords does not match!');
      }
    } else {
      setError('Your information is missing. Please fill all information correctly!');
    }
  }
  return (
    <Container>
      <main>
        {_error &&
          <div className="position-absolute mt-2">
            <Alert variant="danger">{_error}</Alert>
          </div>
        }
        <div className="align-self-center">
          <Form>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                style={{minWidth: 420}}
                type="text" defaultValue={firstName}
                placeholder="First name *"
                onChange={e => {_error && setError(''); setFirstName(e.target.value.trim());}} />
            </Form.Group>
            <Form.Group controlId="surname">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                required
                style={{minWidth: 420}}
                type="text"
                defaultValue={surname}
                placeholder="Surname *"
                onChange={e => {_error && setError(''); setSurname(e.target.value.trim());}} />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                required
                style={{minWidth: 420}}
                type="email"
                defaultValue={email}
                placeholder="Email Address *"
                onChange={e => {_error && setError(''); setEmail(e.target.value.trim());}} />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                required
                style={{minWidth: 420}}
                type="phone"
                defaultValue={phone}
                placeholder="Phone Number *"
                onChange={e => {_error && setError(''); setPhone(e.target.value.trim());}} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                style={{minWidth: 420}} 
                type="password" 
                defaultValue={password}
                placeholder="Password *" 
                onChange={e => {_error && setError(''); setPassword(e.target.value);}} />
            </Form.Group>
            <Form.Group controlId="repassword">
              <Form.Label>Re Enter Password</Form.Label>
              <Form.Control
                required
                style={{minWidth: 420}} 
                type="password" 
                defaultValue={repassword} 
                placeholder="Re Enter Password *" 
                onChange={e => {_error && setError(''); setRePassword(e.target.value);}} />
            </Form.Group>
            <Row>
              <Col>
                <Button variant="primary" type="submit" onClick={signupHandler}>
                  Signup
                </Button>
              </Col>
              <Col className="d-flex align-items-center">
                <Link href="/account/login">
                  Login
                </Link>
              </Col>
            </Row>
          </Form>
        </div>
      </main>
      <style jsx>{`
        main {
          position: relative;
          padding: 0;
          display: flex;
          flex: 1;
          justify-content: center;
        }
      `}</style>
    </Container>
  )
}

export default Signup;