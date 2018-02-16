const express = require('express');
const router = express.Router({mergeParams: true});

const config = require('../config/config');
const base58 = require('../utils/base58');
const Url = require('../models/url');

/* Get short URL and redirect to original link */
router.get('/', function(req, res, next) {

    var shortUrl = req.params.short_url;
    var id = base58.decode(shortUrl);

    // check if url already exists in database
    Url.findOne({_id: id}, function (err, doc){
      if (doc) {
        // found an entry in the DB, redirect the user to their destination
        res.redirect(doc.long_url);
      } else {
        // nothing found, take 'em home
        res.redirect(config.webhost);
      }
    });

});

module.exports = router;