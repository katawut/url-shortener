var config = {};

// the URL shortening host - shortened URLs will be this + base58 ID
// i.e.: http://localhost:3000/3Ys
config.webhost = 'http://localhost:3000/';

// MongoDB host and database name
config.db = {};
config.db.host = 'localhost';
config.db.name = 'url_shortener';

module.exports = config;