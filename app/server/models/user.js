/**
 * User: katat
 * Date: 8/24/13
 * Time: 6:15 PM
 */
var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    apikey: String,
    lastVisit: Date
})

var UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;