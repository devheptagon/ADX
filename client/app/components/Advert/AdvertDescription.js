import React from 'react'
import styles from 'styles/AdvertDescription.module.css'

const AdvertDescription = ({description}) => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <span className={styles.header}>DESCRIPTION:</span>
        <span className={styles.description} dangerouslySetInnerHTML={{ __html: description }}>
        </span>
      </div>
    </div>
  )
}

export default AdvertDescription;
