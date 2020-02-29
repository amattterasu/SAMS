const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    id: Number,
    token: String,
    counter: Number
});

const Token = mongoose.model('token', TokenSchema);

module.exports = Token;