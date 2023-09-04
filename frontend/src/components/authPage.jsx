import React, { useEffect, useState } from 'react';

import mainLogo from '../static/img/random-logo-png-transparent.png';
import logoGit from '../static/img/git.svg';
import logoGoogle from '../static/img/ggl.svg';

export default (() => {
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(null);
    const [borderColor, setBorderColor] = useState('1px solid rgb(226, 226, 226)');

    const handelEmailChange = e => {
        setEmailError(null);
        setEmail(e.target.value);
        setBorderColor('1px solid rgb(226, 226, 226)');
        setShowPasswordInput(false);
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value);
        console.log(password);
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (!isValidEmail(email)) {
            setEmailError('Email is invalid');
            setBorderColor('1px solid rgb(254, 71, 71)');
            return;
        }

        setEmailError(null);
        setShowPasswordInput(true);
    };

    return (
        <div className="container">
            <div className="block">
                <form onSubmit={handleSubmitForm}>
                    <div className="logo-block" >
                        <img src={mainLogo} className="logo-block__img" alt="" />
                    </div>
                    <div className="welcome-text-block" >
                        <p className="wtb__header">Welcome</p>
                        <p className="wtb__text">Log in to RanCo to continue to RanCo.</p>
                    </div>
                    <div className="input-block">
                        <input
                            onChange={handelEmailChange}
                            type="text"
                            className="eib__input"
                            placeholder="Email"
                            style={{ border: borderColor }}
                        />
                    </div>
                    {emailError && <p style={{ color: 'red' }}>Email is invalid</p>}
                    {showPasswordInput && (
                        <div className="input-block">
                            <input
                                onChange={handlePasswordChange}
                                type="password"
                                className="eib__input"
                                placeholder="Password" />
                        </div>
                    )}
                    <div className="button-continue-block">
                        <button
                            type="submit"
                            className="btb__button">
                            Continue
                        </button>
                    </div>
                </form>
                <div className="text-or-block">
                    <p>or</p>
                </div>
                <div className="buttons-auth-block">
                    <button className="buttons-auth-block__btn">
                        <span>
                            <img src={logoGit} alt="" />
                        </span>
                        <span className="bab__text">
                            Continue with GitHub
                        </span>
                    </button>
                    <button className="buttons-auth-block__btn">
                        <span>
                            <img src={logoGoogle} alt="" />
                        </span>
                        <span className="bab__text">
                            Continue with Google
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
});