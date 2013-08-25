/**
 * User: katat
 * Date: 8/17/13
 * Time: 10:28 PM
 */
var assert = require("assert");
var should = require('should');
var request = require('supertest');
process.env.NODE_ENV = 'test';
var app = require('../app/server/index');

describe('API tests', function(){
    before(function(done){
        request(app)
            .get('/rest/setup')
            .end(function(err, res){
                done();
            });
    });
    after(function(done){
        var UserModel = require('../app/server/models/user');
        UserModel.remove(function(){
            done();
        })
    })
    describe('Login', function(){
        it('should return apikey when login succeed', function(done){
            request(app)
                .post('/rest/login')
                .send({username: 'admin', password: 'admin'})
                .end(function(err, res){
                    res.body.should.have.property('apikey');
                    done()
                })
        })
        it('should return error when login failed', function(done){
            request(app)
                .post('/rest/login')
                .send({username: 'admin', password: ''})
                .end(function(err, res){
                    res.body.should.have.property('error');
                    done()
                })
        })
    });
    describe('Page rest api', function(){
        after(function(done){
            var PageModel = require('../app/server/models/page');
            PageModel.remove(function(){
                done();
            })
        });


        describe('create page', function(){
            var error,result;
            before(function(done){
                request(app)
                    .get('/rest/pages/new_page_test')
                    .set('apikey', '123')
                    .end(function(err, res){
                        error = err, result = res;
                        done();
                    });
            })

            it('should create the page with the url', function(done){
                should.not.exist(error);
                result.body.should.have.property('url').equal('new_page_test');
                done();
            })

            it('should fail to create a page with invalid apikey', function(done){
                request(app)
                    .get('/rest/pages/fail-test')
                    .end(function(err, res){
                        res.status.should.equal(404);
                        done();
                    })
            })

            describe('modify page', function(){
                it('should modify the page body', function(done){
                    request(app)
                        .put('/rest/pages/'+result.body.url)
                        .set('apikey', '123')
                        .send({content:'test body'})
                        .end(function(err, res){
                            res.body.should.have.property('content').equal('test body')
                            request(app)
                                .get('/rest/pages/'+result.body.url)
                                .end(function(err, res){
                                    res.body.should.have.property('content').equal('test body');
                                    done();
                                });
                        });
                })
            })

            describe('delete page', function(){
                it('should remove the page', function(done){
                    request(app)
                        .del('/rest/pages/'+result.body.url)
                        .end(function(err, res){
                            should.not.exist(err);
                            done();
                        })
                })
            })

            describe('change page url', function(){

            })
        })
    });

    describe('Header rest api', function(){
        var header;
        before(function(done){
            request(app)
                .get('/rest/header')
                .end(function(err, res){
                    header = res.body;
                    done();
                })
        })
        after(function(done){
            var HeaderModel = require('../app/server/models/header');
            HeaderModel.remove(function(){
                done();
            })
        });
        describe('create header', function(){
            it('should create a header', function(done){
                header.should.have.property('menus');
                done();
            })
        })

        describe('modify header', function(){
            it('should modify the header', function(done){
                header.menus.push({name:'new', link:'link3'});
                request(app)
                    .put('/rest/header')
                    .set('apikey', '123')
                    .send(header)
                    .end(function(err, res){
                        res.body.should.have.property('menus');
                        res.body.menus.length.should.equal(3);
                        done();
                    })
            })
            it('should fail to modify the header with invalid apikey', function(done){
                header.menus.push({name:'new', link:'link3'});
                request(app)
                    .put('/rest/header')
                    .send(header)
                    .end(function(err, res){
                        res.status.should.equal(401);
                        done();
                    })
            })
        })

        describe('delete menu', function(){

        })
    })

    describe('Able to add rows, columns to the body field, with adjustable width and height', function(){

    })

    describe('Customizable views', function(){

    })

    describe('Real Time Comments and Feedback', function(){

    });

    describe('Offline edit, and sync once got online', function(){

    })

    describe('Return whole html bound with backbone.js, dramatically faster page loading and better SEO', function(){

    })
})
