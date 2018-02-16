const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const redirect = require('./server/routes/redirect');
const shorten = require('./server/routes/shorten');
const base58 = require('./server/utils/base58');
const config = require('./server/config/config');

const app = express();

mongoose.connect(`mongodb://${config.db.host}/${config.db.name}`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'server/public')));


// --- Application route ---

// homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'server/views/index.html'));
})

// api for generate the shorten url
app.use('/api/shorten', shorten);

// get the shorten url from user and redirect to original link
app.use('/:short_url', redirect);

app.listen(3000, () => {
    console.log('server run on port 3000');
})