const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({message: 'Hello, World!'});
});

app.listen(8081, () => {
    console.log('App listening port :8081');
});