# URL Shortener

### Requirement
NodeJS and Mongo DB installed

This app run on port 3000

### Installation

Install the dependencies and devDependencies and start the server.

```sh
$ git clone https://github.com/katawut/url-shortener.git
$ cd url-shortener
$ npm install
```

Edit config.js for setup this app in your environment
```sh
$ server/config/config.js
```

Seed first data to database
```sh
$ node scripts/seedDB.js
```

Start the app server (server run on port 3000)
```sh
$ node app.js
```

## Security issues
- Validate and sanitize user request data (used: [express-validator] module)
- Secure HTTP Headers (used: [helmet] module)
  - Set Content Security Policy rules
  - Prevent clickjacking
  - XSS Filter
  - Prevent MIME Type sniffing
  - Disable Powered-By
- Basic prevent DDOS attack or unfinished loop or too many requests from user (used: [ddos] module)

## Scalability issues
- 

[ddos]: <https://www.npmjs.com/package/ddos>
[express-validator]: <https://github.com/ctavan/express-validator>
[helmet]: <https://www.npmjs.com/package/helmet>