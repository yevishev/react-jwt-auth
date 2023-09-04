import React from 'react';
import styles from './Input.module.css';

export default ((props) => {
    return (
        <div className={styles.block}>
            <input
                value={props.value}
                onChange={props.onChange}
                type={props.type}
                className={`${styles.input} ${props.emailError ? styles.invalid : ""}`}
                placeholder={props.placeholder} />
        </div>
    );
});