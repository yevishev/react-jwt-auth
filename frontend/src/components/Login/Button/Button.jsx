import React from 'react';

import styles from './Button.module.css';

export default (({logo, text}) => {
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