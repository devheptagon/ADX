import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useRouter} from 'next/router'
import {Container} from 'components'
import Spinner from 'react-bootstrap/Spinner'

const Index = () => {
  const router = useRouter();
  const {token} = useSelector(state => state.users);
  console.log('token', token);
  useEffect(() => {
    if (token){
      router.push('account/myaccount');
    } else {
      router.push('account/login');
    }
  }, [token]);
  return (
    <Container>
      <main>
        <Spinner animation="border" role="status" className="d-flex center">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </main>
      <style jsx>{`
        main {
          padding: 0;
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </Container>
  )
}

export default Index;
