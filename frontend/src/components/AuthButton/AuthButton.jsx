import React from 'react';
import styles from './AuthButton.module.css';

export default ((text, logo) => {
    return (
        <button className={styles.button}>
            <span>
                <img src={logo} alt="" />
            </span>
            <span className={styles.text}>
                {text}
            </span>
        </button>
    );
});