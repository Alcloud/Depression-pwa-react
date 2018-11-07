const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    surname: String,
    age: Number,
    gender: String,
    email: String,
    phase: String,
    date: String
});

module.exports = mongoose.model('Author', authorSchema);
