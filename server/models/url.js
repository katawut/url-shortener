const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// -- counters collection --
// Keeps track of the last _id that inserted into urls collection
var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

var counter = mongoose.model('counter', CounterSchema);

// -- urls collection --
// For store full URLs
var urlSchema = new Schema({
    _id: {type: Number},
    long_url: String,
    created_at: Date
});

// The pre('save', callback) middleware executes the callback function
// every time before an entry is saved to the urls collection. We use it because we need to update
// global counter to use as uniqued id in urls collection
urlSchema.pre('save', function(next){
    var doc = this;
    // find the url_count and increment it by 1
    counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1} }, function(error, counter) {
        if (error)
            return next(error);
            
        doc._id = counter.seq; // set the _id of the urls collection to the incremented value of the counter
        doc.created_at = new Date();
        next();
    });
});

var Url = mongoose.model('Url', urlSchema);

module.exports = Url;