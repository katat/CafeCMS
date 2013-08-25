/**
 * User: katat
 * Date: 8/17/13
 * Time: 10:45 PM
 */
var mongoose = require('mongoose');
var pageSchema = mongoose.Schema({
    url: String,
    title: String,
    content: String
})

var PageModel = mongoose.model('Page', pageSchema);

module.exports = PageModel;