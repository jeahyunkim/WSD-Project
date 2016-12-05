/**
 * Created by lrmuc on 2016-12-05.
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    id : String,
    password : String,
    userName : String
})

module.exports = mongoose.model('user',userSchema);