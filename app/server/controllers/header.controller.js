/**
 * User: katat
 * Date: 8/22/13
 * Time: 9:39 PM
 */
var controller = function(){
    this.setup = function(app){
        var HeaderModel = require('../models/header');
        var UserModel = require('../models/user');
        var passport = require('passport');

        app.get('/rest/header', function(req, res){
            HeaderModel.findOne({}, function(err, header){
                if(header == null){
                    var headerModel = new HeaderModel(
                        {
                            menus:
                                [
                                    {name:'menu1', link:'link1'},
                                    {name:'menu2', link:'link2'}
                                ]
                        });
                    headerModel.save(function(err){
                        res.send(headerModel);
                    });
                    return;
                }
                res.send(header);
            })
        })

        app.put('/rest/header',
            passport.authenticate('localapikey', {session:false}),
            function(req, res){
            HeaderModel.findOne({}, function(err, header){
                header.menus = req.body.menus;
                header.save(function(err){
                    res.send(header);
                })
            })
        })

        app.post('/rest/login', function(req, res){
            var configs = require('../configs');
            UserModel.findOne({username: req.body.username, password: req.body.password},
                              function(err, user){
                                  if(user == null)
                                    res.send({error:'login error'});
                                  else{
                                    user.apikey = '123';
                                    user.save();
                                    res.send({apikey:'123'});
                                  }
                              });
        })

        app.get('/rest/setup', function(req, res){
            var configs = require('../configs');
            var userModel = new UserModel({username : configs.username, password : configs.password});
            userModel.save(function(err){
                res.send(userModel);
            })
        })
    }
}

module.exports = controller;