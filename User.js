const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    //id: Number,
    //token: String,
    username: String,
    password: String
    //role: String || null
});

module.exports = mongoose.model('user', UserSchema);