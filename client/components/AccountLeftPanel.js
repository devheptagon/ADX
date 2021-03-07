import {useRouter} from 'next/router'
import Nav from 'react-bootstrap/Nav'
import ListGroup from 'react-bootstrap/ListGroup'

const AccountLeftPanel = () => {
  const {pathname} = useRouter()
  const navList = [
    {title: 'My Account', link: 'myaccount'},
    {title: 'Messages', link: 'messages'}, 
    {title: 'Adverts', link: 'myadverts'},
    {title: 'Users', link: 'users'},
    {title: 'Reports', link: 'reports'},
    {title: 'Logout', link: 'logout'}
  ];
  return (
    <div>
      <Nav defaultActiveKey="/account/myaccount" className="flex-grow-1 flex-column">
        <ListGroup>
          {navList.map(item => 
            <ListGroup.Item key={item.link} active={pathname === '/account/'+item.link}>
              <Nav.Link href={'/account/'+item.link}>{item.title}</Nav.Link>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Nav>
      <style jsx>{`
        div {
          margin: 1rem;
          display: flex;
          flex: 1;
        }
      `}</style>
    </div>
  )
}

export default AccountLeftPanel;