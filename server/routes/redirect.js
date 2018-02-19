const express = require('express');
const router = express.Router({mergeParams: true});

const config = require('../config/config');
const base58 = require('../utils/base58');
const Url = require('../models/url');

/* Get short URL and redirect to original link */
router.get('/', (req, res, next) => {

    var shortUrl = req.params.short_url;

    // decode short url strings to unique ID for find original URL in database
    var id = base58.decode(shortUrl);

    // check if url already exists in database
    Url.findOne({_id: id}, function (err, doc){
      if (doc) {
        // found an entry in the DB, encoded html entities and redirect the user to their destination
        return res.redirect(doc.long_url);
      } else {
        // if not found, redirect to homepage
        return res.redirect(config.webhost);
      }
    });

});

module.exports = router;