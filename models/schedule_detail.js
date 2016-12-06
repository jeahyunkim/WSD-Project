var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var detailSchema = new Schema({
    scheduleID: String,
    title: String,
    contents: String,
    detailDate: Date,
    recommend: { type: Number, default: 0 },
    commentID: [String],
    pictureName: [String]
});

module.exports = mongoose.model('detail',detailSchema);
