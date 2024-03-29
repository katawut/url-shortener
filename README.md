# URL Shortener

### Requirement
NodeJS and Mongo DB installed.

This app server run on port 3000.

### Installation

Install the application dependencies packages.

```sh
$ git clone https://github.com/katawut/url-shortener.git
$ cd url-shortener
$ npm install
```

Edit config.js for setup this app in your environment.
```sh
$ server/config/config.js
```

Run this script for seeding global counter ID for using in this app.
```sh
$ node scripts/seedDB.js
```

Start the app server (server run on port 3000).
```sh
$ npm start
```

## Security issues
- Validate and sanitize user request data (used: [express-validator] module).
- Secure HTTP Headers (used: [helmet] module).
  - Set Content Security Policy rules
  - Prevent clickjacking
  - XSS Filter
  - Prevent MIME Type sniffing
  - Disable Powered-By
- Basic prevent DDOS attack or forever loop or too many requests from user (used: [ddos] module).

## Scalability issues
- Used incremental IDs as unique ID for quick insert and lookup in database.
- Used Model-View-Controller concept in application for manageable code.

## References
reference source code: https://coligo.io/create-url-shortener-with-node-express-mongo/

[ddos]: <https://www.npmjs.com/package/ddos>
[express-validator]: <https://github.com/ctavan/express-validator>
[helmet]: <https://www.npmjs.com/package/helmet>