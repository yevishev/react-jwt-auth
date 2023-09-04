import React from 'react';
import Form from './Form/Form';
import AuthButton from './AuthButton/authButton';
import Header from './Header/Header';

import styles from './AuthPage.module.css';

import logoGit from '../static/img/git.svg';
import logoGoogle from '../static/img/ggl.svg';

export default (() => {

    return (
        <div className={styles.container}>
            <div className={styles.block}>
                <Header />
                <Form />
                <p>or</p>
                <div className={styles.buttons}>
                    <AuthButton text="Continue with GitHub" logo={logoGit} />
                    <AuthButton text="Continue with Google" logo={logoGoogle} />
                </div>
            </div>
        </div>
    )
});