const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
    date: String,
    authorId: String
});

module.exports = mongoose.model('Registration', registrationSchema);