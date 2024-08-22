const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get("/paintingData", async (req, res) => {
    let paintingData = fs.readFileSync('./paintingData.json');
    res.json(JSON.parse(paintingData));
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})