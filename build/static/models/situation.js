const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const situationSchema = new Schema({
    title: String,
    description: String,
    date: String,
    authorId: String
});

module.exports = mongoose.model('Situation', situationSchema);
