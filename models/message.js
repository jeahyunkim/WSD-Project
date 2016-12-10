/**
 * Created by jinho on 2016-12-08.
 */
var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    location: String,
    userId : String,
    message : String,
    time : Date
});

module.exports = mongoose.model('message',messageSchema);