import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthPage from './components/authPage';

const app = document.getElementById('app');

ReactDOM.render((
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<AuthPage />} />
        </Routes>    
    </BrowserRouter>
), app);