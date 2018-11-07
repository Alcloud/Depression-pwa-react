const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kieslerSchema = new Schema({
    circlename: String,
    story: String,
    date: String,
    authorId: String
});

module.exports = mongoose.model('Kiesler', kieslerSchema);
