import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useRouter} from 'next/router'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import {newAdvert, createAdvert, updateAdvert} from 'redux/actions/advert'
import {formatMoney, decodeMoney} from 'helpers'

import styles from 'styles/NewAdverts.module.css'

const BASE_IMG_URL = 'http://127.0.0.1:5000/media';
const BASE_UPLOADED_IMG_URL = "http://127.0.0.1:5000/uploads/";
const sectors = ['Hotel', 'Restaurant', 'Bar', 'Cafe', 'Barber', 'Hair Dresser'];

const NewAdvert = ({className, advertID, isEdit}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {newAdvertID, selectedAdvert} = useSelector(state => state.adverts);

  console.log('selectedAdvert: ', selectedAdvert);
  const temptitle = isEdit ? selectedAdvert?.title : '';
  const temppricetype = (isEdit && selectedAdvert?.leaseHoldPrice) ? 'leaseHoldPrice' : 'freeHoldPrice';
  const tempprice = isEdit ? selectedAdvert?.freeHoldPrice ? selectedAdvert?.freeHoldPrice : selectedAdvert?.leaseHoldPrice : '';
  const tempannualturnover = isEdit ? selectedAdvert?.annualTurnover : '';
  const temppostcode = isEdit ? selectedAdvert?.location?.postcode : '';
  const tempcity = isEdit ? selectedAdvert?.location?.city : '';
  const tempcounty = isEdit ? selectedAdvert?.location?.county : '';
  const tempregion = isEdit ? selectedAdvert?.location?.region : '';
  const tempstatus = isEdit ? selectedAdvert?.status : 'Pending';
  const tempmedia = isEdit ? selectedAdvert?.media : [];  
  const tempsector = isEdit ? selectedAdvert?.sectors : '';
  const tempdescription = isEdit ? selectedAdvert?.description : '';

  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState(temptitle);
  const [files, setFiles] = useState();
  const [priceType, setPriceType] = useState(temppricetype);
  const [price, setPrice] = useState(tempprice);
  const [annualTurnover, setAnnualTurnover] = useState(tempannualturnover);
  const [postcode, setPostcode] = useState(temppostcode);
  const [city, setCity] = useState(tempcity);
  const [county, setCounty] = useState(tempcounty);
  const [region, setRegion] = useState(tempregion);
  const [status, setStatus] = useState(tempstatus); //TODO: will be used for admin
  const [media, setMedia] = useState(tempmedia);
  const [sector, setSector] = useState(tempsector);
  const [description, setDescription] = useState(tempdescription);
  useEffect(() => {
    if(typeof newAdvertID === 'undefined'){
      dispatch(newAdvert());
    }
  }, [newAdvertID]);

  const handleUploadImage = async event => {
    event.preventDefault();
    if(files && newAdvertID){
      setLoading(true);
      let formdata = new FormData();
      const _files = [...files];
      let fileNames = [];
      _files.map(file => fileNames.push(file.name));
      fileNames.forEach((fileName, index) => {
        formdata.append("mediaFiles", files[index], fileName);
      });
      formdata.append("title", newAdvertID);
      const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };
      await fetch(BASE_IMG_URL, requestOptions)
        .then(response => response.json())
        .then(result => setMedia(result?.data?.map(item => item.images)))
        .catch(error => console.log('error', error));
      setLoading(false);
    }
  }
  const handleNewAdvert = event => {
    event.preventDefault();
    const otherPriceType = priceType === 'freeHoldPrice' ? 'leaseHoldPrice' : 'freeHoldPrice';
    const prices = {
      [priceType]: decodeMoney(price),
      [otherPriceType]: null,
    }
    const advert = {
      'advertID': newAdvertID, 
      'title': title,
      ...prices,
      'annualTurnover': decodeMoney(annualTurnover),
      'priceGuide': 'Price is Negotiable',
      'annualNetProfit': 17000,
      'location': {
        'postcode': postcode,
        'city': city,
        'county': county,
        'region': region,
      },
      'advertStatus': status,
      'sectors': sector,
      'description': description,
      'media': media,
      'website': null,
      'socialMedia': null,
      'reviews': null,
      'comRegNo': null,
      'agentID': '236552',
      'agentUser': 'Mr. Arel',
      'moreTags': [
        'Unique Business',
        'Established Business',
        'Accounts Available',
        'Fully Fitted',
        'Prime Location',
        'Attractive Business',
        'Retirement Sale'
      ],
    };
    if(isEdit){
      dispatch(updateAdvert(advertID, advert));
    } else {
      dispatch(createAdvert(advert));
    }
    router.push('/account/myadverts');
    const message = 'Advert has been ' + isEdit ? 'edited' : 'saved'
    alert(message);
  };

  // const handleSectors = e => {
  //   const value = e.target.value.trim();
  //   if (value) {
  //     return value.split(',').map(item => item.trim());
  //   }
  // };

  const onChangeNumberHandler = e => {
    const moneyonly = decodeMoney(e.target.value.trim());
    const value = Number.parseInt(moneyonly, 10);
    if(Number.isInteger(value)){
      return formatMoney(value);
    }
  };

  return(
    <div className={className}>
      <div className={styles.advertForm}>
        <Form onSubmit={handleUploadImage}>
          <Form.Group>
            <Form.Label>Advert Images</Form.Label>
            <Row className={styles.row}>
              <Col lg={9} className="mb-lg-0 mb-md-3">
                <Form.File id="fileInput" onChange={e => setFiles(e.target.files)} multiple />
                {/* <Form.File id="fileInput" onChange={e => setFileName(e.target?.files[0]?.name)} multiple /> */}
              </Col>
              <Col lg={3} className="d-flex align-items-end">
                <Button type="submit" variant="primary" className="w-100">Upload Image{files?.length > 1 && 's'}</Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
        <Row className={styles.row}>
          <Col className={styles.imageContainer}>
            {!isLoading && media?.map(image => 
              <Image key={image.small} src={BASE_UPLOADED_IMG_URL + image.small} thumbnail />
            )}
          </Col>
        </Row>
      </div>
      <Form className={styles.advertForm} onSubmit={handleNewAdvert}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Row className={styles.row}>
            <Col>
              <Form.Control required type="text" placeholder="Title *" defaultValue={title} onChange={e => setTitle(e.target.value.trim())} />
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col lg={4}>
              <Form.Label>Tenure</Form.Label>
              <Form.Control  as="select" defaultValue={priceType} onChange={e => setPriceType(e.target.value)}>
                <option value="freeHoldPrice">Freehold Price</option>
                <option value="leaseHoldPrice">Leasehold Price</option>
              </Form.Control>
            </Col>
            <Col lg={4}>
              <Form.Label>Price</Form.Label>
              <Form.Control required type="text" placeholder={priceType === 'freeHoldPrice' ? 'Freehold Price *' : 'Leasehold Price *'} value={price} onChange={e => setPrice(onChangeNumberHandler(e))} />
            </Col>
            <Col lg={4}>
              <Form.Label>Annual Turnover</Form.Label>
              <Form.Control required type="text" placeholder="Annual Turnover *" value={annualTurnover} onChange={e => setAnnualTurnover(onChangeNumberHandler(e))} />
            </Col>
          </Row>
          <Form.Label>Location</Form.Label>
          <Row className={styles.row}>
            <Col lg={6}>
              <Form.Control required type="text" placeholder="Postcode *" defaultValue={postcode} onChange={e => setPostcode(e.target.value.trim())} maxLength={6} />
            </Col>
            <Col lg={6}>
              <Form.Control type="text" placeholder="City" defaultValue={city} onChange={e => setCity(e.target.value.trim())} />
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col lg={6}>
              <Form.Control type="text" placeholder="County" defaultValue={county} onChange={e => setCounty(e.target.value.trim())} />
            </Col>
            <Col lg={6}>
              <Form.Control type="text" placeholder="Region" defaultValue={region} onChange={e => setRegion(e.target.value.trim())} />
            </Col>
          </Row>
          <Form.Label>Sector</Form.Label>
          <Row className={styles.row}>
            <Col>
              <Form.Control required as="select" placeholder="Sectors *" defaultValue={sector} onChange={e => setSector(e.target.value)}>
                {sectors.map(_sector => <option value={_sector} key={_sector}>{_sector}</option>)}
              </Form.Control>
            </Col>
          </Row>
          {/* <Row className={styles.row}>
            <Col>
              <Form.Control required type="text" placeholder="Status *" defaultValue={status} onChange={e => setStatus(e.target.value.trim())} />
            </Col>
          </Row> */}
          <Form.Label>Description</Form.Label>
          <Row className={styles.row}>
            <Col>
              <Form.Control required as="textarea" rows={4} type="text" placeholder="Description *"  defaultValue={description} onChange={e => setDescription(e.target.value.trim())} />
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col>
              <Button variant="primary" type="submit">Save</Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </div>
  );
}

export default NewAdvert;