import React, { useState, useEffect } from 'react';

import Button from './Button/Button';
import Input from './Input/Input';

function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

export default (({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(null);
    const [step, setStep] = useState('email');

    const emailValid = React.useMemo(() => isValidEmail(email), [email]);


    useEffect(() => {
        setError(null);
    }, [password, step, email]);

    useEffect(() => {
        setStep('email');
    }, [email]);

    useEffect(() => {
        if (step === 'email') {
            setPassword('');
        }
    }, [step]);

    const proceed = (e) => {
        e.preventDefault();

        if (step === 'email') {
            setError(!emailValid ? 'Email is invalid' : null);

            if (emailValid) {
                setStep('password');
            }
        }

        if (step === 'password') {
            if (password) {
                onSubmit(email, password);
            } else {
                setError('Enter password');
            }
        }
    };

    return (
        <form onSubmit={proceed}>
            <Input
                value={email}
                onChange={setEmail}
                error={error}
                type="text"
                placeholder="Email"
            />

            {error && (<p style={{ color: 'red' }}>{error}</p>)}

            {step === 'password' && (
                <Input
                    value={password}
                    onChange={setPassword}
                    type="password"
                    placeholder="Password"
                />
            )}

            <Button text="Continue" type="submit" />
        </form>
    );
});