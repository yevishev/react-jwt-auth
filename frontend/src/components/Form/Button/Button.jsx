import React from 'react';
import styles from './Button.module.css';

export default ((props) => {
    return (
        <button
            type={props.type}
            className={styles.button}>
            {props.text}
        </button>
    );
});