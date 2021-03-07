import Container from 'react-bootstrap/Container'
import Header from './Header'
import Footer from './Footer'
import styles from 'styles/Container.module.css'

const Layout = ({children, className, seo}) => {
  return (
    <Container fluid className={[styles.container, className]}>
      <Header seo={seo} />
      {children}      
      <Footer />
    </Container>
  )
}

export default Layout;