const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    id: Number || null,
    token: String,
    username: String,
    password: String,
    role: String
});

module.exports = mongoose.model('user', UserSchema);