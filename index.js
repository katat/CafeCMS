/**
 * User: katat
 * Date: 8/17/13
 * Time: 10:29 PM
 */
var express = require("express");
var mongoose = require("mongoose");
var app = express();
var port = 3700;


mongoose.connect('mongodb://localhost/cafecms');
app.use(express.bodyParser());

app.get("/", function(req, res){
    res.send("It works!");
});

app.get('/page/:urlName', function(req, res){
    var url = req.params.urlName;

    var PageModel = require('./models/page');

    PageModel.findOne({url: url}, function(e, page){
        if(page != null){
            res.send({err:'already exist'});
            return;
        }

        var pageModel = new PageModel({
            url: url,
            body: req.body.body
        });

        pageModel.save(function(err){
            res.send(pageModel);
        });
    })
});

app.listen(port);
console.log("Listening on port " + port);

module.exports = app;