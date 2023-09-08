import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import Form from './Form/Form';
import Button from './Button/Button';
import Header from './Header/Header';

import api from '../../libs/api';

import styles from './Login.module.css';

import logoGit from '../../static/img/git.svg';
import logoGoogle from '../../static/img/ggl.svg';
import Spinner from '../Spinner/Spinner';

export default (() => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        api.session.get().then(() => {
            navigate('/');
        }).catch(() => {
            //info for log
        }).then(() => {
            setIsLoading(false);
        });
    }, []);
    
    const login = (email, password) => {
        setIsLoading(true);
        api.session.post(email, password).then(() => {
            navigate('/');
        }).catch(() => {
            setLoginError("Incorrect login or password");
        }).then(() => {
            setIsLoading(false);
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.block}>
                <Header />
                <Form onSubmit={login} loginError={loginError} setLoginError={setLoginError} />
                <p>or</p>
                <div className={styles.buttons}>
                    <Button text="Continue with GitHub" logo={logoGit} />
                    <Button text="Continue with Google" logo={logoGoogle} />
                </div>
                {isLoading && <Spinner />}
            </div>
        </div>
    )
});