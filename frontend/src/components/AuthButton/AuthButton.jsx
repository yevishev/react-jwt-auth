import React from 'react';
import styles from './AuthButton.module.css';

export default ((props) => {
    return (
        <button className={styles.button}>
            <span>
                <img src={props.logo} alt="" />
            </span>
            <span className={styles.text}>
                {props.text}
            </span>
        </button>
    );
});