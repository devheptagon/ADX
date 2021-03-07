import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import Head from 'next/head'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const Header = ({seo}) => {
  const {currentUser, token} = useSelector(state => state.users);
  useEffect(() => {
  }, [token]);
  return (
    <>
      <Head>
        <title>Advertisement</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar expand="lg" bg="transparent">
        <Navbar.Brand href="/">Advertisement .</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/product">Product</Nav.Link>
            <Nav.Link href="/company">Company</Nav.Link>
            <Nav.Link href="/account">Account</Nav.Link>
            {Boolean(token) &&
              <Nav.Link href="/account/myaccount">
                {currentUser?.firstName + ' ' + currentUser?.lastName}
              </Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Header;