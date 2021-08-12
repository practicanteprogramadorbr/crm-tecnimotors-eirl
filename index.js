const path = require('path');
const express = require('express');

const app = express();

const APP_PATH = "./dist/crm-tecnimotors-eirl";

app.use(express.static(path.join(__dirname, APP_PATH)));

SERVER_PORT = process.env.PORT || 8000;

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, APP_PATH + '/index.html'));
});

app.listen(SERVER_PORT, () => {
    console.log('Server listen on port');
});