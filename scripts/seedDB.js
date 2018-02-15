const MongoClient = require('mongodb').MongoClient;
const config = require('../server/config/config');

var url = `mongodb://${config.db.host}/${config.db.name}`;

MongoClient.connect(url, (err, db) => {
    if (err) {
        console.log(err);
    }
    var dbo = db.db(config.db.name);
    dbo.createCollection('counters', (err, res) => {
        if (err) {
            console.log(err);
            db.close();
        }
        var seedData = { _id: "url_count", seq: 10000 };
        dbo.collection('counters').insertOne(seedData, (err, res) => {
            if (err) {
                console.log(err);
                db.close(); 
            }
            console.log('Seed data completed');
            db.close();
        })
    })
});