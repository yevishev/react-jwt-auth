import React from 'react';

import styles from './Spinner.module.css';

export default (() => {
    return (
        <div className={styles.spinnerOverlay}>
            <div className={styles.spinner}></div>
        </div>
    );
});