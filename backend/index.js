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

app.post('/session', async (req, res) => {
    const email = req.body.email;
    const salt = getSalt();

    try {
        const passwordHash = await getPasswordHash(req.body.password, salt, 10000);

        db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
            if (err) {
                return res.sendStatus(500);
            } 
            
            if (row) {
                db.get('SELECT * FROM users WHERE email = ? and password_hash = ?', [email, passwordHash], (err, row) => {
                    if (err) {
                        return res.sendStatus(500);
                    } 

                    if (row) {
                        db.get('SELECT * FROM users WHERE email = ? and password_hash = ?', [email, passwordHash], (err, row) => {
                            if (err) {
                                return res.sendStatus(500);
                            } 

                            if (row) {
                                const token = createJWT({
                                    email: row.email
                                });

                                const expirationDate = new Date();
                                expirationDate.setDate(expirationDate.getDate() + 7);
                                res.status(200);
                                res.cookie('token', token, { expires: expirationDate, httpOnly: true });
                                return res.send();
                            } else {
                                return res.sendStatus(500);
                            }
                        });
                    }

                    return res.sendStatus(400);
                });
            } else {
                db.run('INSERT INTO users (email, password_hash) VALUES (?, ?)', [email, passwordHash], (err) => {
                    if (err) {
                        return res.sendStatus(500);
                    }

                    const token = createJWT({
                        email: email
                    });

                    const expirationDate = new Date();
                    expirationDate.setDate(expirationDate.getDate() + 7);
                    res.status(200);
                    res.cookie('token', token, { expires: expirationDate, httpOnly: true });

                    return res.send();
                });
            }
        });
    } catch (error) {
        console.error("error is \n\n\n\n" , error);
        return res.sendStatus(500);
    }
});

app.get('/session', async (req, res) => {
    const cookie = req.cookies;
    try {
        const data = await readJWT(cookie.token);
        data.res = true;
        res.write(JSON.stringify(data));
    } catch (e) {
        res.write(JSON.stringify({ res: false }));
    }
    res.send();
});

app.delete('/session', async (req, res) => {
    try {
        res.clearCookie('token');
    } catch (e) {
        console.log("err is ", e);
        res.status(400);
    }
    res.send();
});

app.listen(8081, () => {
    console.log('App listening port :8081');
});