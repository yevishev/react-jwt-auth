import React from 'react';

import styles from './Button.module.css';

export default (({type, text}) => {
    return (
        <button
            type={type}
            className={styles.button}>
            {text}
        </button>
    );
});