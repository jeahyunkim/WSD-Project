var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var detailSchema = new Schema({
    scheduleID: String,
    title: String,
    contents: String,
    detailDate: Date,
    commentID: [String],
    pictureName: [String]
});

module.exports = mongoose.model('detail',detailSchema);
