/**
 * User: katat
 * Date: 8/17/13
 * Time: 10:28 PM
 */
var assert = require("assert");
var should = require('should');
var request = require('supertest');
var app = require('../index');

describe('API tests', function(){
    describe('Page rest api', function(){
        describe('create page', function(){
            after(function(done){
                var PageModel = require('../models/page');
                PageModel.remove(function(){
                    done();
                })
            });

            it('should create the page with the url', function(done){
                request(app)
                    .get('/page/new_page_test')
//                    .send({body:'test body'})
                    .end(function(err, res){
                        should.not.exist(err);
                        res.body.should.have.property('url').equal('new_page_test');
//                        res.body.should.have.property('body').equal('test body');
                        done();
                    });
            })

            describe('change page url', function(){

            })
        })

        describe('modify page', function(){

        })

        describe('delete page', function(){

        })
    });

    describe('Header rest api', function(){
        describe('create menu', function(){

        })

        describe('modify menu', function(){

        })

        describe('delete menu', function(){

        })
    })
})
