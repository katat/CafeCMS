/**
 * User: katat
 * Date: 8/22/13
 * Time: 9:40 PM
 */
var mongoose = require('mongoose');
var headerSchema = mongoose.Schema({
    menus: []
})

var HeaderModel = mongoose.model('Header', headerSchema);

module.exports = HeaderModel;