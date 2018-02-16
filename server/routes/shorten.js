const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator/check');

const config = require('../config/config');
const base58 = require('../utils/base58');
const Url = require('../models/url');


// Use express-validator module for validate and sanitize user request data
router.post('/', [
    body('url')
    .isLength({min: 1}).withMessage('Please input your URL')
    .trim()
    .escape()
], (req, res, next) => {

    // if validation fail return error message to user
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({error: true, result: errors.mapped().url.msg });
    }
    
    var longUrl = req.body.url;
    var shortUrl = '';

    // check if url already exists in database
    Url.findOne({long_url: longUrl}, (err, doc) => {

        if (doc){

            // base58 encode the unique _id of that document and construct the short URL
            shortUrl = config.webhost + base58.encode(doc._id);

            // since the document exists, return it without creating a new entry
            return res.json({result: shortUrl});

        } else {

            // If long URL was not found in the long_url field in urls collection then create a new entry:
            var newUrl = Url({
                long_url: longUrl
            });

            newUrl.save(function(err) {
                if (err){
                    console.log(err);
                    return res.json({error: true, result: 'Create short URL failed.' });
                }

                // construct the short URL and return to user
                shortUrl = config.webhost + base58.encode(newUrl._id);

                return res.json({result: shortUrl});
        });

        }

    });

});

module.exports = router;