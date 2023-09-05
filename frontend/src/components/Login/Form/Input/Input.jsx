import React from 'react';

import styles from './Input.module.css';

export default (({value, type,onChange, error, placeholder}) => {
    return (
        <div className={styles.block}>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                type={type}
                className={`${styles.input} ${error ? styles.invalid : ""}`}
                placeholder={placeholder}
                autoFocus
                 />
        </div>
    );
});