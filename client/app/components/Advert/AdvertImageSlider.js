import React from "react"
import Slider from "react-slick"
import Image from "react-bootstrap/Image"
import styles from "styles/AdvertImageSlider.module.css"

const BASE_IMG_URL = "http://127.0.0.1:5000/uploads/";

const AdvertImageSlider = ({media}) => {
  const settings = {
    customPaging: function(i) {
      return (
        <a>
          <Image className={styles.sliderThumbnailImage} src={BASE_IMG_URL + media[i].small} rounded />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Slider {...settings} className={styles.slider}>
      {media?.map(image => <Image key={image.large} src={BASE_IMG_URL + image.large} rounded />)}
    </Slider>
  );
}

export default AdvertImageSlider;
