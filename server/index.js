const express = require('express')
const path = require('path');

const fs = require('fs');

const app = express();

const filePath = path.join(__dirname, 'static');

app.use(express.static(filePath));

app.get('*', function (req, res) {
    res.sendfile('index.html', { root: __dirname + "/static/" });
});

app.listen(3001, () => console.log('App listening on port 3000!'))