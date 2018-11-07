const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const depressiondegreeSchema = new Schema({
    degree: Number,
    date: String,
    authorId: String
});

module.exports = mongoose.model('Depressiondegree', depressiondegreeSchema);
