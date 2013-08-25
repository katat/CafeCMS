/**
 * User: katat
 * Date: 8/17/13
 * Time: 10:29 PM
 */
var express = require("express");
var mongoose = require("mongoose");
var passport = require('passport')
var LocalAPIKeyStrategy = require('./lib/passport-localapikey').Strategy;

var engines = require('consolidate');
var path = require('path');
var app = express();
var port = 3700;

app.configure('test', function(){
    mongoose.connect('mongodb://localhost/cafecms-test');
})

if(process.env.NODE_ENV == null)
    mongoose.connect('mongodb://localhost/cafecms');

app.use(express.static(__dirname + '/../../public'));
app.use(express.static(__dirname + '/../client'));
app.use(express.bodyParser());
app.use(passport.initialize());
passport.use(new LocalAPIKeyStrategy(
    function(apikey, done) {
        var UserModel = require('./models/user');
        UserModel.findOne({ apikey: apikey }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            return done(null, user);
        });
    }
));

app.set("views", __dirname + "/../client/templates");
app.set('view engine', 'handlebars');
app.set("view options", { layout: false });
app.engine('.html', engines.handlebars);

var PageController = require('./controllers/page.controller.js');
var HeaderController = require('./controllers/header.controller.js');
(new PageController).setup(app);
(new HeaderController).setup(app);
app.get('/*', function(req, res){
    res.render('index.html');
})

passport.initialize();
app.listen(port);
console.log("Listening on port " + port);

module.exports = app;