const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const redirect = require('./server/routes/redirect');
const shorten = require('./server/routes/shorten');
const base58 = require('./server/utils/base58');
const config = require('./server/config/config');

const app = express();

mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'server/public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'server/views/index.html'));
})

app.use('/api/shorten', shorten);
app.use('/:encoded_id', redirect);

app.listen(3000, () => {
    console.log('server run on port 3000');
})