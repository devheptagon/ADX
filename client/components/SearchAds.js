import React from 'react'
import {useDispatch} from 'react-redux'
import Link from 'next/link'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import {selectAdvert} from 'redux/actions/advert'
import {dayDifference, formatMoney} from 'helpers'
import styles from 'styles/SearchAds.module.css'

const CardImageOverlay = ({overlayText}) => {
  return (
    <div className={styles.cardImageOverlay}>
      <p>
        {overlayText}
      </p>
    </div>
  );
}

const SearchAdvertImage = ({image, index, length}) => {
  const BASE_IMAGE_URL = 'http://127.0.0.1:5000/uploads/';
  if (index === 2) {
    return (
      <div className={styles.cardImageContainer}>
        <Card.Img className={styles.cardImage} src={BASE_IMAGE_URL + image} />
        {length > 3 && 
          <CardImageOverlay overlayText={`+ ${length - 2}`} />
        }
      </div>
    );
  } else if (index < 2) {
    return (
      <div className={styles.cardImageContainer}>
        <Card.Img className={styles.cardImage} src={BASE_IMAGE_URL + image} />
      </div>
    );
  } else {
    return null;
  }
}

const SearchAds = props => {
  const dispatch = useDispatch();
  const {advertID, title, location, description, media, freeHoldPrice, leaseHoldPrice, annualTurnover, createdTime} = props;

  const descriptionFormatter = () => {
    const index1 = description.indexOf("<p>") + 3;
    const index2 = description.indexOf("</p>");
    return description.substring(index1, index2);
  }

  const addedOnTimeFormatter = () =>
    createdTime.slice(0, 10).replaceAll("-", "/");

  const onDetailClickHandler = () => 
    dispatch(selectAdvert(advertID));

  return (
    <Card className={styles.card}>
      <Card.Header variant="top">
        <Link href="/advert">
          <h5>{title.toUpperCase()}</h5>
        </Link>
        <h6>{location.county}, {location.city}, {location.region}</h6>
        {dayDifference(createdTime) < 8 &&
          <h4 className="fixed-right-top"><Badge variant="danger" className={styles.badge}>New</Badge></h4>
        }
      </Card.Header>
      <Card.Body className={styles.cardBody}>
        <div className={styles.cardDesc}>
          <Card.Text dangerouslySetInnerHTML={{ __html: descriptionFormatter()}}>
          </Card.Text>
          <div className={styles.cardImages}>
            {media.map((image, index, array) =>
              <SearchAdvertImage key={image.small} image={image.large} index={index} length={array.length} />
            )}
          </div>
        </div>
        <ul>
          {leaseHoldPrice && <li><strong>Leasehold:</strong> <span> {formatMoney(leaseHoldPrice, '£')}</span></li>}
          {freeHoldPrice && <li><strong>Feasehold:</strong> <span> {formatMoney(freeHoldPrice, '£')}</span></li>}
          {annualTurnover && <li><strong>Turnover:</strong> <span> {formatMoney(annualTurnover, '£')}</span></li>}
          <li><strong>Added On:</strong> <span> {addedOnTimeFormatter()}</span></li>
        </ul>
      </Card.Body>
      <Card.Footer className={styles.cardFooter}>
        <Link href="#" passHref><a className={styles.cardLink}>Contact Seller</a></Link>
        <Link href="#" passHref><a className={styles.cardLink}>Request Full Detail</a></Link>
        <Link href="#" passHref><a className={styles.cardLink}>Save</a></Link>
        <Link href="/advert" passHref><a className={styles.cardLink} onClick={onDetailClickHandler}>View Full Details</a></Link>
      </Card.Footer>
    </Card>
  )
}

export default SearchAds;
