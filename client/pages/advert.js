import {useSelector} from 'react-redux'
import {AdvertDetails, AdvertImageSlider, AdvertDescription, AdvertPrice, AdvertStatusInfo, Container} from 'components'
import Link from 'next/link'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import styles from 'styles/Advert.module.css'


const Advert = () => {
  const {selectedAdvert} = useSelector(state => state.adverts);
  return (
    <Container>
      <main className={styles.main}>
        <Row>
          <Col lg={9}>
            <Card className={styles.cardAdvert}>
              <Card.Header className={styles.cardHeader}  variant="top">
                <h1>{selectedAdvert?.title}</h1>
                <h5>{selectedAdvert?.location?.county}, {selectedAdvert?.location?.city}, {selectedAdvert?.location?.region}</h5>
              </Card.Header>
              <Card.Body>
                <AdvertImageSlider media={selectedAdvert?.media} />
                <AdvertStatusInfo status={selectedAdvert?.status} advertID={selectedAdvert?.advertID} />
                <AdvertPrice freeHoldPrice={selectedAdvert?.freeHoldPrice} leaseHoldPrice={selectedAdvert?.leaseHoldPrice} />
                <AdvertDescription description={selectedAdvert?.description} />
                <AdvertDetails location={selectedAdvert?.location} sectors={selectedAdvert?.sectors} />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3}>
            <Card className={styles.card}>
              <Card.Header className={styles.cardHeader}  variant="top">
                <h5>Contact the seller for more details, or book a viewing</h5>
                <Button variant="primary" type="submit">
                  Contact Seller
                </Button>
              </Card.Header>
              <Card.Body>
                <Link href="/advert" passHref><a className={styles.cardLink}>Share</a></Link>
                <Link href="/advert" passHref><a className={styles.cardLink}>Download PDF</a></Link>
                <Link href="/advert" passHref><a className={styles.cardLink}>Save this advert</a></Link>
                <Link href="/advert" passHref><a className={styles.cardLink}>Print this advert</a></Link>
                <Link href="/advert" passHref><a className={styles.cardLink}>Report this listing</a></Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </main>
    </Container>
  )
}

export default Advert;