# URL Shortener

### Installation

- Install the dependencies and devDependencies and start the server.

```sh
$ git clone https://github.com/katawut/url-shortener.git
$ cd url-shortener
$ npm install
```

- Edit config.js for setup this app in your environment
```sh
$ server/config/config.js
```

- Seed first data to database
```sh
$ node scripts/seedDB.js
```

- Start the app server
```sh
$ node app.js
```