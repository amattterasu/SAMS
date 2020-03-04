const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    id: Number,
    token: String,
    counter: Number
});

module.exports = mongoose.model('token', TokenSchema);;