import {useState} from 'react'
import {Container, SearchAds} from 'components'
import {useDispatch, useSelector} from 'react-redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import {searchBySectorLocation} from 'redux/actions/advert'
import styles from 'styles/Search.module.css'

const Search = () => {
  const dispatch = useDispatch();
  const {data, sector, location} = useSelector(state => state.adverts);

  const [newsector, setNewSector] = useState(sector);
  const [newlocation, setNewLocation] = useState(location);
  const [period, setPeriod] = useState();
  const [tenure, setTenure] = useState();
  // const [price, setPrice] = useState([]);
  const handleSubmit = event => {
    event.preventDefault();
    if(newsector){
      let params = {sector: newsector};
      if (newlocation) {params['location'] = newlocation;}
      dispatch(searchBySectorLocation(params));
    }
  };
  const handleFilter = event => {
    event.preventDefault();
    if(sector){
      let params = {sector: sector};
      if (newlocation) { params['location'] = newlocation; }
      else if (location) { params['location'] = location; }
      if (period) { params['date'] = period; }
      if (tenure) { params['tenure'] = tenure; }
      dispatch(searchBySectorLocation(params));
    }
  };

  return (
    <Container>
      <main className={styles.main}>
        <Row>
          <Col lg={3}>
            <Row>
              <Col>
                <Card className={styles.card}>
                  <Card.Header variant="top">
                    <h5>Amend your search:</h5>
                  </Card.Header>
                  <Card.Body>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="formSector">
                        <Form.Label>Sector</Form.Label>
                        <Form.Control type="text" placeholder="New businesses for Sale" defaultValue={newsector} onChange={e => setNewSector(e.target.value.trim())}  />
                      </Form.Group>
                      <Form.Group controlId="formLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" placeholder="Nationwide, UK" defaultValue={newlocation} onChange={e => setNewLocation(e.target.value.trim())}  />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        Search Now
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card className={styles.card}>
                  <Card.Header variant="top">
                    <h5>Filter by:</h5>
                  </Card.Header>
                  <Card.Body>
                    <Form onSubmit={handleFilter}>
                      <Form.Group>
                        <Form.Label>Added</Form.Label>
                        <Form.Check type="radio" id="all" label="Any time" checked={period === null} onChange={() => setPeriod(null)} />
                        <Form.Check type="radio" id="14days" label="Last 14-days" checked={period === 14} onChange={() => setPeriod(14)} />
                        <Form.Check type="radio" id="month" label="Last month" checked={period === 30} onChange={() => setPeriod(30)} />
                        <Form.Check type="radio" id="3month" label="Last 3 months" checked={period === 90} onChange={() => setPeriod(90)} />
                        <Form.Check type="radio" id="6month" label="Last 6 months" checked={period === 180} onChange={() => setPeriod(180)} />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Tenure</Form.Label>
                        <Form.Check type="radio" id="Freehold" label="Freehold" checked={tenure === 'Freehold'} onChange={() => setTenure('Freehold')} />
                        <Form.Check type="radio" id="Leasehold" label="Leasehold" checked={tenure === 'Leasehold'} onChange={() => setTenure('Leasehold')} />
                        <Form.Check type="radio" id="All" label="All" checked={tenure === null} onChange={() => setTenure(null)} />
                      </Form.Group>
                      {/* Not used yet */}
                      {/* <Form.Group controlId="formPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Check type="checkbox" label="Freehold" />
                        <Form.Check type="checkbox" label="Leasehold" />
                        <Form.Check type="checkbox" label="Other" />
                      </Form.Group> */}
                      {/* Not used yet */}
                      {/* <Form.Group>
                        <Form.Label>Additional Filters</Form.Label>
                        <Form.Check type="checkbox" id="invited" label="Offers Invited" />
                        <Form.Check type="checkbox" id="price-on-application" label="Price on Application" />
                        <Form.Check type="checkbox" id="reduced-price" label="Reduced Price" />
                        <Form.Check type="checkbox" id="featured" label="Featured" />
                        <Form.Check type="checkbox" id="relocatable" label="Relocatable" />
                        <Form.Check type="checkbox" id="with-document" label="With Documents" />
                        <Form.Check type="checkbox" id="has-pictures" label="Has Pictures" />
                        <Form.Check type="checkbox" id="under-offer" label="Under Offer" />
                        <Form.Check type="checkbox" id="sold-withdrawn" label="Sold / Withdrawn" />
                      </Form.Group> */}
                      <Button variant="primary" type="submit">
                        Search Now
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col lg={9} className={styles.colSearchResults}>
            {/* search title */}
            <h1 className={styles.h1}>{sector}s for sale in {location ? location : 'UK'}</h1>
            <p className={styles.p}>{data?.count} {sector + data?.count > 1 && 's'} Available. Exact Matches Found.</p>
            
            <Breadcrumb className={styles.breadcrumb}>
              <Breadcrumb.Item href="#">All Businesses</Breadcrumb.Item>
              <Breadcrumb.Item href="#">{location ? location : 'UK'}</Breadcrumb.Item>
              <Breadcrumb.Item href="#">Food & Catering Businesses</Breadcrumb.Item>
              <Breadcrumb.Item active>{sector}</Breadcrumb.Item>
            </Breadcrumb>

            {data?.data?.map(props => 
              <SearchAds key={props._id} {...props} />
            )}
          </Col>
        </Row>
      </main>
    </Container>
  )
}

export default Search;
