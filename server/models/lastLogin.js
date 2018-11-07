const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lastLoginSchema = new Schema({
    date: String,
    authorId: String
});

module.exports = mongoose.model('LastLogin', lastLoginSchema);