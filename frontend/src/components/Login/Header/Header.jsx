import React from "react";
import styles from './Header.module.css';

import mainLogo from '../../../static/img/random-logo-png-transparent.png';

export default (() => {
    return (
        <>
            <img src={mainLogo} className={styles.logo} alt="" />
            <div className={styles.block} >
                <p className={styles.header}>Welcome</p>
                <p className={styles.text}>Log in to RanCo to continue to RanCo.</p>
            </div>
        </>
    );
});