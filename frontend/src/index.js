import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import axios from 'axios';

import Login from './components/Login/Login';
import Home from './components/Home/Home';

const container = document.getElementById('app');
const root = createRoot(container);

axios.defaults.baseURL = 'http://localhost:8081';

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>
);