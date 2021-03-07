import React from 'react'
import styles from 'styles/AdvertStatusInfo.module.css'

const AdvertStatusInfo = ({status, advertID}) => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <span className={styles.header}>STATUS</span>
        <span className={styles.description}>{status}</span>
      </div>
      <div className={styles.info}>
        <span className={styles.header}>ADVERT ID</span>
        <span className={styles.description}>{advertID}</span>
      </div>
      {/* <div className={styles.info}>
        <span className={styles.header}>REFERENCE</span>
        <span className={styles.description}>E7701RB / Rightbiz</span>
      </div> */}
      <div className={styles.info}>
        <span className={styles.header}>CALL AGENT:</span>
        <span className={styles.description}>Upgrade to view number »</span>
      </div>
    </div>
  )
}

export default AdvertStatusInfo;
