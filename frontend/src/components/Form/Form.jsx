import React, { useState } from 'react';
import Button from './Button/Button';
import Input from './Input/Input';

export default (() => {
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(null);

    const handelEmailChange = (e) => {
        setEmailError(null);
        setEmail(e.target.value);
        setShowPasswordInput(false);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        console.log(password);
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (!isValidEmail(email)) {
            setEmailError('Email is invalid');
            return;
        }

        setEmailError(null);
        setShowPasswordInput(true);
    };

    return (
        <form onSubmit={handleSubmitForm}>
            <Input
                value={email}
                onChange={handelEmailChange}
                emailError={emailError}
                type="text"
                placeholder="Email"
            />
            {emailError && <p style={{ color: 'red' }}>Email is invalid</p>}
            {showPasswordInput &&
                <Input
                    value={password}
                    onChange={handlePasswordChange}
                    type="password"
                    placeholder="Password"
                />}
            <Button text="Continue" type="submit" />
        </form>
    );
});