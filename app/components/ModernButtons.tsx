import React from 'react';
import styles from './ModernButtons.module.css'; // Changed back to .css extension

// ModernButtons component
// This component renders a set of modern-styled buttons
const ModernButtons: React.FC = () => {
  return (
    <div className={styles.modernButtons}>
      <button className={`${styles.btn} ${styles['btn-primary']}`}>
        Get Started
        <span className={styles['btn-icon']}>→</span>
      </button>
      <button className={`${styles.btn} ${styles['btn-secondary']}`}>
        Learn More
        <span className={styles['btn-icon']}>ℹ</span>
      </button>
      <button className={`${styles.btn} ${styles['btn-outline']}`}>
        Contact Us
        <span className={styles['btn-icon']}>✉</span>
      </button>
    </div>
  );
};

export default ModernButtons;