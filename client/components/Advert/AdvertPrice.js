import React from 'react'
import {formatMoney} from 'helpers'
import styles from 'styles/AdvertPrice.module.css'

const AdvertPrice = ({freeHoldPrice, leaseHoldPrice, annualRent}) => {
  return (
    <div className={styles.container}>
      {freeHoldPrice &&
        <div className={styles.info}>
          <span className={styles.header}>Freehold Price:</span>
          <span className={styles.description}>{formatMoney(freeHoldPrice, '£')}</span>
        </div>
      }
      {leaseHoldPrice &&
        <div className={styles.info}>
          <span className={styles.header}>Leasehold Price:</span>
          <span className={styles.description}>{formatMoney(leaseHoldPrice, '£')}</span>
        </div>
      }
      {annualRent &&
      <div className={styles.info}>
        <span className={styles.header}>Annual Rent:</span>
        <span className={styles.description}>{formatMoney(annualRent, '£')}</span>
      </div>
      }
      <div className={styles.info}>
        <span className={styles.header}>Annual Turnover:</span>
        <span className={styles.description}>Available upon request</span>
      </div>
      <div className={styles.info}>
        <span className={styles.header}>Annual Net Profit:</span>
        <span className={styles.description}>Available upon request</span>
      </div>
    </div>
  )
}

export default AdvertPrice;
