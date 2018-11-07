const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statisticSchema = new Schema({
    count: Number
});

module.exports = mongoose.model('Statistic', statisticSchema);
