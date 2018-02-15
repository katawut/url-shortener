const express = require('express');
const router = express.Router();

const config = require('../config/config');
const base58 = require('../utils/base58');
const Url = require('../models/url');

router.post('/', function(req, res, next) {
    var longUrl = req.body.url;
    var shortUrl = '';

    // check if url already exists in database
    Url.findOne({long_url: longUrl}, (err, doc) => {

        if (doc){

            // base58 encode the unique _id of that document and construct the short URL
            shortUrl = config.webhost + base58.encode(doc._id);

            // since the document exists, return it without creating a new entry
            res.json({'shortUrl': shortUrl});

        } else {

            // If long URL was not found in the long_url field in urls collection then create a new entry:
            var newUrl = Url({
                long_url: longUrl
            });

            newUrl.save(function(err) {
                if (err){
                console.log(err);
                }

                // construct the short URL and return to user
                shortUrl = config.webhost + base58.encode(newUrl._id);

                res.json({'shortUrl': shortUrl});
        });

        }

    });

});

module.exports = router;