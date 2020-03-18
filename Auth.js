const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthSchema = new Schema({

    id: Number || null,
    token: String, //???
    username: String,
    password: String
});

module.exports = mongoose.model('auth', AuthSchema);;