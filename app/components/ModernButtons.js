import React from 'react';
import styles from './ModernButtons.module.css';
function ModernButtons() {
    return (
        <div className={styles.modernButtons}>
            <button className={`${styles.btn} ${styles['btn-primary']}`}>Primary</button>
            <button className={`${styles.btn} ${styles['btn-secondary']}`}>Secondary</button>
            <button className={`${styles.btn} ${styles['btn-outline']}`}>Outline</button>
            <button className={`${styles.btn} ${styles['btn-icon']}`}>Icon</button>
        </div>
    );
}
export default ModernButtons;