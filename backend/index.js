import express from 'express';
import { createJWT, readJWT, getSalt, getPasswordHash } from './auth.js';
import cookieParser from 'cookie-parser';
import sqlite3 from 'sqlite3';

const app = express();
const db = new sqlite3.Database('users.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`
    );
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1234');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, cookie');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(express.json());
app.use(cookieParser());

const dbRun = (query, args) => {
    return new Promise((resolve, reject) => {
        db.get(query, args, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

app.post('/session', async (req, res) => {
    const email = req.body.email;
    const salt = getSalt();
    const passwordHash = await getPasswordHash(req.body.password, salt, 10000);

    const row = await dbRun('SELECT * FROM users WHERE email = ? and password_hash = ?', [email, passwordHash]);

    if (!row) {
        try {
            await dbRun('INSERT INTO users (email, password_hash) VALUES (?, ?)', [email, passwordHash]);
        } catch(err) {
            console.error('Error in /session route:', err.toString());
            res.status(403).json({ error: 'Invalid email or password' });
            return;
        }
    
    };

    const token = createJWT({
        email
    });

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    res.cookie('token', token, { expires: expirationDate, httpOnly: true });
    res.status(200).json();
});

app.get('/session', (req, res) => {
    const cookies = req.cookies
    readJWT(cookies.token)
        .then(() => {
            res.status(200).json();
        })
        .catch(error => {
            console.error('Error in /session route:', error);
            res.status(403).json({ error: 'User is unauthorized' });
        });
});

app.delete('/session', async (req, res) => {
    res.clearCookie('token');
    return res.status(200).json();
});


// app.use((err, req, res, next) => {
//     if (!!err.statusCode) {
//         res.status(err.statusCode).json(err.body || null);
//     } else {
//         res.status(500).send(err.toString());
//     }
// });

app.listen(8081, () => {
    console.log('App listening port :8081');
});