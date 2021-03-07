import React, {useState, } from 'react'
import Slider from 'react-slick'
import {useRouter} from 'next/router'
import {useDispatch} from 'react-redux'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import {searchBySectorLocation} from '../redux/actions/advert'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from 'styles/Slider.module.css'

const Overlay = () => {
  const [sector, setSector] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    if(sector){
      dispatch(searchBySectorLocation({sector: sector, location: location}));
      router.push('/search');
    }
  }

  return (
    <Form className={styles.overlay} onSubmit={handleSubmit}>
      <h1>UK's Largest Business For Sale Marketplace</h1>
      <Row>
        <Col lg={11} md={12}>
          <Row>
            <Col lg={6}>
              <Form.Group controlId="formSector">
                <Form.Control type="text" placeholder="Enter Sector, eg: 'Cafe'" onChange={e => setSector(e.target.value.trim())} />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group controlId="formLocation">
                <Form.Control type="text" placeholder="Enter Location, eg: 'London'" onChange={e => setLocation(e.target.value.trim())} />
              </Form.Group>
            </Col>
          </Row>
        </Col>
        <Col lg={1} md={12}>
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

const slideImages = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png"];

const Carousel = () => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
  };
  return (
    <>
      <Row className={[styles.m0p0, styles.relative]}>
        <Slider {...settings}>
          {slideImages.map(item =>(
            <Col className={styles.m0p0} key={item}>
              <Image src={'/' + item} className={styles.slide} />
            </Col>
          ))}
        </Slider>
        <Overlay />
      </Row>
      <style jsx>{`
          .slick-slide img {
            width: 100% !important;
          }
        `}</style>
    </>
  );
}

export default Carousel;