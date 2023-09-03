import React, { useEffect, useState } from 'react';

import mainLogo from '../static/img/random-logo-png-transparent.png';
import logoGit from '../static/img/git.svg';
import logoGoogle from '../static/img/ggl.svg';

export default (() => {
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [email, setEmail] = useState('');

    const handelEmailInput = (e) => {
        setEmail(e.target.value);
    }

    useEffect(() => {
        console.log(email);
    }, [email]);

    const handleContinueClick = () => {
        setShowPasswordInput(true);
    };

    return (
        <div className="container">
            <div className="block">
                <div className="logo-block" >
                    <img src={mainLogo} className="logo-block__img" alt="" />
                </div>
                <div className="welcome-text-block" >
                    <p className="wtb__header">Welcome</p>
                    <p className="wtb__text">Log in to RanCo to continue to RanCo.</p>
                </div>
                <div className="input-block">
                    <input
                        onInput={handelEmailInput}
                        type="email"
                        className="eib__input"
                        placeholder="Email"
                    />
                </div>
                {showPasswordInput && (
                    <div className="input-block">
                        <input type="password" className="eib__input" placeholder="Password" />
                    </div>
                )}
                <div className="button-continue-block">
                    <button
                        onClick={handleContinueClick}
                        type="button"
                        className="btb__button">
                        Continue
                    </button>
                </div>
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