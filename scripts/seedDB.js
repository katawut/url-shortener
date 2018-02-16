/**
 * SeedDB
 * This script is for seed first entry to counters collection for use as a unique key 
 * for original URL in urls collection
 */

const MongoClient = require('mongodb').MongoClient;
const config = require('../server/config/config');

// init your first sequence number
const seedNum = 10000;

var url = `mongodb://${config.db.host}/${config.db.name}`;

MongoClient.connect(url, (err, db) => {
    if (err) {
        console.log(err.message);
        return;
    }
    var dbo = db.db(config.db.name);
    dbo.createCollection('counters', (err, res) => {
        if (err) {
            console.log(err.message);
            db.close();
            return;
        }
        var seedData = { _id: "url_count", seq: seedNum };
        dbo.collection('counters').insertOne(seedData, (err, res) => {
            if (err) {
                console.log(err.message);
                db.close();
                return;
            }
            console.log('Seed data completed');
            db.close();
        })
    })

});