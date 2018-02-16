const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// module for security
const helmet = require('helmet');
const Ddos = require('ddos');

// application module
const redirect = require('./server/routes/redirect');
const shorten = require('./server/routes/shorten');
const config = require('./server/config/config');

var ddos = new Ddos;
const app = express();

mongoose.connect(`mongodb://${config.db.host}/${config.db.name}`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'server/public')));

// --- Security setup ---

//Set up Content-Security-Policy rule for style and script sources
app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com'],
      scriptSrc: ["'self'", 'code.jquery.com', 'maxcdn.bootstrapcdn.com' ]
    }
  }))
// XSS Filter
app.use(helmet.xssFilter()) 
// Prevent iframe clickjacking
app.use(helmet.frameguard({ action: 'sameorigin' }));
// Disable Powered-By
app.use(helmet.hidePoweredBy())
// Prevent browser for trying guess the MIME Type
app.use(helmet.noSniff())
// Basic prevent DDOS attack or unfinished loop requests from user
app.use(ddos.express);

// --- Application route ---

// home and Form page
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