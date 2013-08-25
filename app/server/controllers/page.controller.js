/**
 * User: katat
 * Date: 8/18/13
 * Time: 8:19 AM
 */

var controller = function () {
    this.setup = function(app){
        var PageModel = require('../models/page');
        var UserModel = require('../models/user');
        var passport = require('passport');

        app.get('/rest/pages/:urlName', function (req, res) {
            var url = req.params.urlName;

            PageModel.findOne({url:url}, function (e, page) {
                if (page != null) {
                    res.send(page);
                    return;
                }

                require('../auth')(req.get('apikey'), function(success){
                    if(success){
                        var pageModel = new PageModel({
                            url:url,
                            body:req.body.content
                        });

                        pageModel.save(function (err) {
                            res.send(pageModel);
                        });
                    }else{
                        res.send(404);
                    }
                })
            })
        });

        app.post('/rest/pages/:urlName', function(req, res){
            PageModel.findOne({url: req.params.urlName}, function(e, page){
                if (page == null) {
                    res.send({err:'could not find the page'});
                    return;
                }
                var pageModel = new PageModel(req.body);
                pageModel.save(function (err) {
                    res.send(pageModel);
                })
            })
        })

        app.put('/rest/pages/:urlName', passport.authenticate('localapikey', {session:false}), function (req, res) {
            var url = req.params.urlName;

            PageModel.findOne({url: req.params.urlName}, function(e, page){
                if (page == null) {
                    res.send({err:'could not find the page'});
                    return;
                }

                page.title = req.body.title;
                page.content = req.body.content;
                page.save(function (err) {
                    res.send(page);
                })
            })
        })

        app.del('/rest/pages/:urlName', function (req, res) {
            var url = req.params.urlName;

            PageModel.findOne({url:url}, function (e, page) {
                if (page == null) {
                    res.send({err:'could not find the page'});
                    return;
                }

                page.remove(function (err) {
                    res.send(err);
                });
            })

        })
    }
}

module.exports = controller;