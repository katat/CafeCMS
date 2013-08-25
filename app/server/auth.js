/**
 * User: katat
 * Date: 8/24/13
 * Time: 6:41 PM
 */
var UserModel = require('./models/user');

var authenticate = function(apikey, callback){
    UserModel.findOne({apikey: apikey}, function(err, user){
        if(user == null)
            callback(false);
        else{
            callback(true);
            user.lastVisit = new Date();
            user.save();
        }
    })
}

module.exports = authenticate;