import React from 'react'
import styles from 'styles/AdvertDetails.module.css'

const AdvertDetails = ({location, sectors}) => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <span className={styles.header}>Listing Details</span>
        <span className={styles.description}>
          <span className={styles.descriptionHeader}>Location:</span>
          <span className={styles.descriptionText}>{location?.county}, {location?.city}, {location?.region}</span>
          <span className={styles.descriptionHeader}>Sector:</span>
          <span className={styles.descriptionText}>{sectors}</span>
        </span>
      </div>
    </div>
  )
}

export default AdvertDetails;
