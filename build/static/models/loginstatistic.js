const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginStatisticSchema = new Schema({
    day: Number,
    date: String,
    logintime: String,
    duration: String,
    authorId: String
});

module.exports = mongoose.model('LoginStatistic', loginStatisticSchema);
