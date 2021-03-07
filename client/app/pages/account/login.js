import {useState, useEffect} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useDispatch, useSelector} from 'react-redux'
import {login} from 'redux/actions/user'
import {Container} from 'components'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {token, currentUser} = useSelector(state => state.users);
  const [email, setEmail] = useState(currentUser?.email || '');
  const [password, setPassword] = useState('');

  const loginHandler = event => {
    event.preventDefault();
    if(email && password){
      dispatch(login({
        'email': email,
        'password': password
      }));
    }
  }

  useEffect(() => {
    if (token) {
      router.push('/');
    }
    return () => {
      setEmail('');
      setPassword('');
    };
  }, [token]);

  return (
    <Container>
      <main>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              style={{minWidth: 420}}
              type="email"
              placeholder="Email *"
              defaultValue={email}
              onChange={e => setEmail(e.target.value.trim())} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              style={{minWidth: 420}}
              type="password"
              placeholder="Password *"
              defaultValue={password}
              onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Row>
            <Col>
              <Button variant="primary" type="submit" onClick={loginHandler}>
                Login
              </Button>
            </Col>
            <Col className="d-flex align-items-center">
              <Link href="/account/signup">
                Sign Up
              </Link>
            </Col>
          </Row>
        </Form>
      </main>
      <style jsx>{`
        main {
          padding: 0;
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: center
        }
      `}</style>
    </Container>
  )
}

export default Login;