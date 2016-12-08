/**
 * Created by lrmuc on 2016-12-05.
 */

var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    user_id : String,
    detail_id : String,
    day : String,
    content : String
});

module.exports = mongoose.model('comment',commentSchema);
