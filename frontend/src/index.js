import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {createRoot} from 'react-dom/client';

import AuthPage from './components/AuthPage';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<AuthPage />} />
        </Routes>    
    </BrowserRouter>
);