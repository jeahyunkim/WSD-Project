var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    'title' : String,
    'startDate' : Date,
    'endDate' : Date,
    'location' : String,
    'detailLocation' : String,
    'description' : String,
    'recommend' : Number,
    'imageUrl' : String,
    'author' : String,
    'writeDate' : String,
    'public' : Boolean
});

module.exports = mongoose.model('schedule',schema);
