import React, { useState } from 'react';

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

    return (<form onSubmit={handleSubmitForm}>
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
    </form>);
});