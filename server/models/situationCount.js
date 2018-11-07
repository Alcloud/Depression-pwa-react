const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const situationCountSchema = new Schema({
    count: Number,
    date: String,
    authorId: String
});

module.exports = mongoose.model('SituationCount', situationCountSchema);